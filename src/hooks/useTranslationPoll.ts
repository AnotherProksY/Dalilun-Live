import { useCallback, useEffect, useRef, useState } from 'react'

const API_BASE = 'https://streaming.itlinuxsolutions.com/api'
const POLL_INTERVAL = 100

interface AudioItem {
  buffer: string // base64
}

interface CurrentAudio {
  el: HTMLAudioElement
  url: string
}

export interface PollState {
  text: string
  elapsed: number | null
  active: boolean
  audioUnlocked: boolean
  unlockAudio: () => void
}

function base64ToBlob(b64: string): Blob {
  const bytes = atob(b64)
  const arr = new Uint8Array(bytes.length)
  for (let i = 0; i < bytes.length; i++) arr[i] = bytes.charCodeAt(i)
  return new Blob([arr], { type: 'audio/mpeg' })
}

export function useTranslationPoll(agentId: string): PollState {
  const [text, setText] = useState('')
  const [elapsed, setElapsed] = useState<number | null>(null)
  const [active, setActive] = useState(false)
  const [audioUnlocked, setAudioUnlocked] = useState(false)

  const agentIdRef = useRef(agentId)
  agentIdRef.current = agentId

  const abortRef = useRef<AbortController | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const queueRef = useRef<AudioItem[]>([])
  const playingRef = useRef(false)
  const lastAudioIdRef = useRef('')
  const currentRef = useRef<CurrentAudio | null>(null)
  const unlockedRef = useRef(false)

  const playNext = useCallback(() => {
    if (playingRef.current || queueRef.current.length === 0) return
    if (!unlockedRef.current) return

    const item = queueRef.current.shift()!
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

  // When agentId changes — flush queue and stop current audio
  useEffect(() => {
    queueRef.current = []
    lastAudioIdRef.current = ''
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
        const data = await res.json()

        if (!stopped) {
          setText(data.text ?? '')
          setElapsed(data.elapsed ?? null)
          setActive(Boolean(data.text))

          const audioId: string | undefined = data.audio?.audioId
          const audioBuffer: string | undefined = data.audio?.audioBuffer
          if (audioId && audioBuffer && audioId !== lastAudioIdRef.current) {
            lastAudioIdRef.current = audioId
            queueRef.current.push({ buffer: audioBuffer })
            playNext()
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

  return { text, elapsed, active, audioUnlocked, unlockAudio }
}
