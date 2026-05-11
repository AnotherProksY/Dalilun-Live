import styles from './LivePlayer.module.scss'

// Replace with actual YouTube live embed URL, e.g.:
// https://www.youtube.com/embed/LIVE_VIDEO_ID?autoplay=1&mute=1
const STREAM_URL = ''

export function LivePlayer() {
  return (
    <div className={styles.root}>
      {STREAM_URL ? (
        <iframe
          className={styles.iframe}
          src={STREAM_URL}
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          allowFullScreen
          title='Dalilun Live'
        />
      ) : (
        <div className={styles.placeholder}>
          <div className={styles.placeholderInner}>
            <svg width='48' height='48' viewBox='0 0 48 48' fill='none' className={styles.playIcon}>
              <circle cx='24' cy='24' r='23' stroke='rgba(255,255,255,0.2)' strokeWidth='2' />
              <path d='M20 16l14 8-14 8V16z' fill='rgba(255,255,255,0.4)' />
            </svg>
            <span className={styles.placeholderText}>Прямой эфир</span>
          </div>
        </div>
      )}
    </div>
  )
}
