import { CATEGORIES } from '../lib/categories'
import { getIcon, MapPin } from '../lib/icons'
import { getColor } from '../lib/colors'
import { HOUR_HEIGHT, minutesFromGridStart, durationMinutes, formatTimeRange } from '../lib/time'

export default function EventBlock({ event, onClick }) {
  const cat = CATEGORIES[event.type] ?? CATEGORIES.clase
  const swatch = getColor(event.color ?? cat.defaultColor)
  const Icon = getIcon(event.icon ?? cat.defaultIcon)
  const top = (minutesFromGridStart(event.start_time) / 60) * HOUR_HEIGHT
  const height = (durationMinutes(event.start_time, event.end_time) / 60) * HOUR_HEIGHT

  return (
    <button
      onClick={() => onClick(event)}
      className="pixel-panel-head group absolute left-1 right-1 text-left px-2.5 py-1.5 overflow-hidden border-2 cursor-pointer transition-all hover:brightness-95 hover:shadow-[2px_2px_0_var(--color-ink)] hover:-translate-y-px focus-visible:shadow-[2px_2px_0_var(--color-ink)]"
      style={{
        '--notch': '5px',
        top: `${top}px`,
        height: `${Math.max(height, 30)}px`,
        background: swatch.soft,
        borderColor: swatch.color,
      }}
    >
      <div className="flex items-center gap-1.5">
        <Icon width={13} height={13} className="shrink-0 text-[var(--color-ink)]" />
        <p className="font-[var(--font-display)] font-semibold text-[13px] leading-tight text-[var(--color-ink)] truncate">
          {event.title}
        </p>
      </div>
      <p className="font-[var(--font-mono)] text-[11px] text-[var(--color-ink-soft)] truncate">
        {formatTimeRange(event.start_time, event.end_time)}
      </p>
      {height > 56 && event.location && (
        <p className="flex items-center gap-1 text-[11px] text-[var(--color-ink-soft)] truncate mt-0.5">
          <MapPin width={11} height={11} className="shrink-0" />
          {event.location}
        </p>
      )}
      {height > 76 && event.professor && (
        <p className="text-[11px] text-[var(--color-ink-soft)] truncate">
          {event.professor}
        </p>
      )}
    </button>
  )
}
