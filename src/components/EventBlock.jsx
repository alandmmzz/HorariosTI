import { CATEGORIES } from '../lib/categories'
import { HOUR_HEIGHT, minutesFromGridStart, durationMinutes, formatTimeRange } from '../lib/time'

export default function EventBlock({ event, onClick }) {
  const cat = CATEGORIES[event.type] ?? CATEGORIES.clase
  const top = (minutesFromGridStart(event.start_time) / 60) * HOUR_HEIGHT
  const height = (durationMinutes(event.start_time, event.end_time) / 60) * HOUR_HEIGHT

  return (
    <button
      onClick={() => onClick(event)}
      className="pixel-panel-head absolute left-1 right-1 text-left px-2.5 py-1.5 overflow-hidden border-2 transition-all hover:shadow-[2px_2px_0_var(--color-ink)] focus-visible:shadow-[2px_2px_0_var(--color-ink)]"
      style={{
        '--notch': '5px',
        top: `${top}px`,
        height: `${Math.max(height, 30)}px`,
        background: cat.soft,
        borderColor: cat.color,
      }}
    >
      <p className="font-[var(--font-display)] font-semibold text-[13px] leading-tight text-[var(--color-ink)] truncate">
        {event.title}
      </p>
      <p className="font-[var(--font-mono)] text-[11px] text-[var(--color-ink-soft)] truncate">
        {formatTimeRange(event.start_time, event.end_time)}
      </p>
      {height > 56 && event.location && (
        <p className="text-[11px] text-[var(--color-ink-soft)] truncate mt-0.5">
          📍 {event.location}
        </p>
      )}
      {height > 76 && event.professor && (
        <p className="text-[11px] text-[var(--color-ink-soft)] truncate">
          {cat.icon} {event.professor}
        </p>
      )}
    </button>
  )
}
