import { useCallback, useEffect, useRef, useState } from 'react'

const API_BASE = 'https://streaming.itlinuxsolutions.com/api'
const POLL_INTERVAL = 100

interface QueueItem {
  text: string   // audio.text from API — subtitle for this chunk
  buffer: string // base64 MP3
}

interface CurrentAudio {
  el: HTMLAudioElement
  url: string
}

export interface PollState {
  /** Updates only when a new audio chunk starts playing (audioText in original) */
  text: string
  active: boolean
  audioUnlocked: boolean
  unlockAudio: () => void
}

function base64ToBlob(b64: string): Blob {
  const binary = atob(b64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
  return new Blob([bytes], { type: 'audio/mpeg' })
}

export function useTranslationPoll(agentId: string): PollState {
  // audioText: only changes at the moment audio.play() is called
  const [text, setText] = useState('')
  const [audioUnlocked, setAudioUnlocked] = useState(false)

  const agentIdRef = useRef(agentId)
  agentIdRef.current = agentId

  const abortRef = useRef<AbortController | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const queueRef = useRef<QueueItem[]>([])
  const playingRef = useRef(false)
  const lastAudioIdRef = useRef('')
  const currentRef = useRef<CurrentAudio | null>(null)
  const unlockedRef = useRef(false)

  const playNext = useCallback(() => {
    if (playingRef.current || queueRef.current.length === 0) return
    if (!unlockedRef.current) return

    const item = queueRef.current.shift()!
    if (!item.buffer) {
      playNext()
      return
    }

    // Update subtitle exactly here — same moment as original #playNext()
    setText(item.text)

    playingRef.current = true

    const blob = base64ToBlob(item.buffer)
    const url = URL.createObjectURL(blob)
    const el = new Audio(url)
    currentRef.current = { el, url }

    const done = () => {
      URL.revokeObjectURL(url)
      currentRef.current = null
      playingRef.current = false
      playNext()
    }

    el.onended = done
    el.onerror = done
    el.play().catch(done)
  }, [])

  // When agentId changes — flush queue, stop playback, clear subtitle
  useEffect(() => {
    queueRef.current = []
    lastAudioIdRef.current = ''
    setText('')
    if (currentRef.current) {
      currentRef.current.el.pause()
      URL.revokeObjectURL(currentRef.current.url)
      currentRef.current = null
      playingRef.current = false
    }
  }, [agentId])

  useEffect(() => {
    let stopped = false

    const poll = async () => {
      if (stopped) return

      abortRef.current = new AbortController()

      try {
        const res = await fetch(
          `${API_BASE}/pull?agentId=${encodeURIComponent(agentIdRef.current)}`,
          { signal: abortRef.current.signal },
        )
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data: {
          text: string
          elapsed: number
          audio: {
            elapsed: number
            text: string
            audioId: string
            audioBuffer: string
          }
        } = await res.json()

        if (!stopped) {
          // Skip audio tracking entirely when not unlocked —
          // ensures the first chunk after unlock is always treated as "new".
          const { audioId, audioBuffer, text: audioText } = data.audio
          if (audioId && audioBuffer && unlockedRef.current) {
            if (audioId !== lastAudioIdRef.current) {
              lastAudioIdRef.current = audioId
              queueRef.current.push({ text: audioText, buffer: audioBuffer })
              playNext()
            }
          }
        }
      } catch {
        // ignore abort / network errors
      }

      if (!stopped) {
        timerRef.current = setTimeout(poll, POLL_INTERVAL)
      }
    }

    poll()

    return () => {
      stopped = true
      abortRef.current?.abort()
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [playNext])

  const unlockAudio = useCallback(() => {
    unlockedRef.current = true
    setAudioUnlocked(true)
    playNext()
  }, [playNext])

  return { text, active: Boolean(text), audioUnlocked, unlockAudio }
}
