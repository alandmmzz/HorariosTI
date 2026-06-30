export const COLOR_PALETTE = {
  clase: { label: 'Mostaza', color: 'var(--color-clase)', soft: 'var(--color-clase-soft)' },
  lab: { label: 'Coral', color: 'var(--color-lab)', soft: 'var(--color-lab-soft)' },
  blanda: { label: 'Lavanda', color: 'var(--color-blanda)', soft: 'var(--color-blanda-soft)' },
  trabajo: { label: 'Celeste', color: 'var(--color-trabajo)', soft: 'var(--color-trabajo-soft)' },
  deporte: { label: 'Menta', color: 'var(--color-deporte)', soft: 'var(--color-deporte-soft)' },
  rose: { label: 'Rosa', color: '#E0789F', soft: '#F8DCE6' },
  slate: { label: 'Pizarra', color: '#7E8AA3', soft: '#E3E6ED' },
  mustard: { label: 'Ocre', color: '#C99A2E', soft: '#F1E4C2' },
}

export const COLOR_ORDER = Object.keys(COLOR_PALETTE)

export function getColor(key) {
  return COLOR_PALETTE[key] ?? COLOR_PALETTE.clase
}
