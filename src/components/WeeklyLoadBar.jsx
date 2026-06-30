import { CATEGORIES, CATEGORY_ORDER } from '../lib/categories'
import { totalHours } from '../lib/time'

export default function WeeklyLoadBar({ events }) {
  const totals = CATEGORY_ORDER.map((key) => ({
    key,
    hours: totalHours(events, (e) => e.type === key),
  }))
  const grandTotal = totals.reduce((s, t) => s + t.hours, 0) || 1

  return (
    <div className="pixel-panel bg-white px-3 py-2 flex items-center gap-3">
      <span className="font-[var(--font-display)] font-semibold text-[11px] tracking-wide text-[var(--color-ink)] shrink-0">
        CARGA
      </span>

      <div className="flex h-2.5 flex-1 min-w-[60px] rounded-full overflow-hidden bg-[var(--color-cream-soft)]">
        {totals.map(({ key, hours }) =>
          hours > 0 ? (
            <div
              key={key}
              style={{ width: `${(hours / grandTotal) * 100}%`, background: CATEGORIES[key].color }}
              title={`${CATEGORIES[key].label}: ${hours.toFixed(1)} hs`}
            />
          ) : null
        )}
      </div>

      <div className="hidden lg:flex flex-wrap gap-x-3 shrink-0">
        {totals.map(({ key, hours }) => (
          <span key={key} className="flex items-center gap-1 text-[11px] text-[var(--color-ink-soft)]">
            <span className="w-2 h-2 inline-block" style={{ background: CATEGORIES[key].color }} />
            {hours.toFixed(1)}h
          </span>
        ))}
      </div>

      <span className="font-[var(--font-mono)] text-[11px] text-[var(--color-ink-soft)] shrink-0">
        {grandTotal.toFixed(1)}h
      </span>
    </div>
  )
}
