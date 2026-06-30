export default function BannerSlot() {
  return (
    <div
      className="pixel-panel mb-3 px-4 py-2 flex items-center justify-center text-center"
      style={{
        background: 'linear-gradient(135deg, var(--color-clase-soft), var(--color-blanda-soft))',
        minHeight: '40px',
      }}
    >
      <p className="text-xs text-[var(--color-ink-soft)]">
        🎓 Banner generado según lo que estés estudiando (próximamente)
      </p>
    </div>
  )
}
