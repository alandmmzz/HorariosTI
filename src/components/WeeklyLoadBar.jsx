import { CATEGORIES, CATEGORY_ORDER } from '../lib/categories'
import { totalHours } from '../lib/time'

export default function WeeklyLoadBar({ events }) {
  const totals = CATEGORY_ORDER.map((key) => ({
    key,
    hours: totalHours(events, (e) => e.type === key),
  }))
  const grandTotal = totals.reduce((s, t) => s + t.hours, 0) || 1

  return (
    <div className="bg-white border border-[var(--color-line)] rounded-2xl px-5 py-4">
      <div className="flex items-baseline justify-between mb-3">
        <h2 className="font-[var(--font-display)] font-semibold text-sm tracking-wide text-[var(--color-ink)]">
          CARGA DE LA SEMANA
        </h2>
        <span className="font-[var(--font-mono)] text-xs text-[var(--color-ink-soft)]">
          {grandTotal.toFixed(1)} hs totales
        </span>
      </div>

      <div className="flex h-3 w-full rounded-full overflow-hidden bg-[var(--color-cream-soft)]">
        {totals.map(({ key, hours }) =>
          hours > 0 ? (
            <div
              key={key}
              style={{
                width: `${(hours / grandTotal) * 100}%`,
                background: CATEGORIES[key].color,
              }}
              title={`${CATEGORIES[key].label}: ${hours.toFixed(1)} hs`}
            />
          ) : null
        )}
      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-3">
        {totals.map(({ key, hours }) => (
          <div key={key} className="flex items-center gap-1.5 text-xs text-[var(--color-ink-soft)]">
            <span
              className="w-2.5 h-2.5 rounded-sm inline-block"
              style={{ background: CATEGORIES[key].color }}
            />
            <span>{CATEGORIES[key].label}</span>
            <span className="font-[var(--font-mono)] text-[var(--color-ink)]">
              {hours.toFixed(1)}h
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
