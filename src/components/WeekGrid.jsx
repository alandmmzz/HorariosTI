import { DAYS } from '../lib/categories'
import { GRID_START_HOUR, GRID_END_HOUR, HOUR_HEIGHT, formatHourLabel } from '../lib/time'
import EventBlock from './EventBlock'

export default function WeekGrid({ events, visibleDays, onEventClick, onSlotClick }) {
  const hours = []
  for (let h = GRID_START_HOUR; h <= GRID_END_HOUR; h++) hours.push(h)

  return (
    <div className="pixel-panel bg-white overflow-hidden flex flex-col" style={{ maxHeight: 'calc(100vh - 220px)' }}>
      <div
        className="grid sticky top-0 z-10"
        style={{ gridTemplateColumns: `72px repeat(${visibleDays.length}, 1fr)` }}
      >
        <div className="bg-[var(--color-ink)]" />
        {visibleDays.map((day) => (
          <div
            key={day.key}
            className="bg-[var(--color-ink)] text-white font-[var(--font-display)] font-semibold text-xs tracking-widest text-center py-3"
          >
            {day.label.toUpperCase()}
          </div>
        ))}
      </div>

      <div className="overflow-y-auto">
        <div
          className="grid"
          style={{ gridTemplateColumns: `72px repeat(${visibleDays.length}, 1fr)` }}
        >
          <div className="relative" style={{ height: hours.length * HOUR_HEIGHT }}>
            {hours.map((h, i) => (
              <div
                key={h}
                className={`absolute left-0 right-0 pr-2 text-right text-[11px] font-[var(--font-mono)] text-[var(--color-ink-soft)] ${
                  i === 0 ? 'pt-1' : '-translate-y-1/2'
                }`}
                style={{ top: (h - GRID_START_HOUR) * HOUR_HEIGHT }}
              >
                {formatHourLabel(h)}
              </div>
            ))}
          </div>

          {visibleDays.map((day) => (
            <div
              key={day.key}
              className="relative border-l border-[var(--color-line)]"
              style={{ height: hours.length * HOUR_HEIGHT }}
            >
              {hours.map((h) => (
                <button
                  key={h}
                  type="button"
                  title="Agregar actividad"
                  onClick={() => onSlotClick(day.key, h)}
                  className="absolute left-0 right-0 border-t border-[var(--color-cream-soft)] cursor-pointer hover:bg-[var(--color-cream-soft)] transition-colors"
                  style={{ top: (h - GRID_START_HOUR) * HOUR_HEIGHT, height: HOUR_HEIGHT }}
                />
              ))}
              {events
                .filter((e) => e.day_of_week === day.key)
                .map((e) => (
                  <EventBlock key={e.id} event={e} onClick={onEventClick} />
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
