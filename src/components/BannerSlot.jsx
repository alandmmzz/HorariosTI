export default function BannerSlot() {
  return (
    <div
      className="pixel-panel mb-5 px-5 py-6 flex items-center justify-center text-center"
      style={{
        background: 'linear-gradient(135deg, var(--color-clase-soft), var(--color-blanda-soft))',
        minHeight: '88px',
      }}
    >
      <p className="text-sm text-[var(--color-ink-soft)]">
        🎓 Acá va a aparecer un banner generado según lo que estés estudiando. (Próximamente)
      </p>
    </div>
  )
}
