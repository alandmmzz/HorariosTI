export const CATEGORIES = {
  clase: {
    label: 'Clase',
    color: 'var(--color-clase)',
    soft: 'var(--color-clase-soft)',
    defaultIcon: 'book-open',
  },
  laboratorio: {
    label: 'Laboratorio / Práctica',
    color: 'var(--color-lab)',
    soft: 'var(--color-lab-soft)',
    defaultIcon: 'terminal',
  },
  blanda: {
    label: 'Habilidades blandas / Idioma',
    color: 'var(--color-blanda)',
    soft: 'var(--color-blanda-soft)',
    defaultIcon: 'comment-text',
  },
  trabajo: {
    label: 'Trabajo',
    color: 'var(--color-trabajo)',
    soft: 'var(--color-trabajo-soft)',
    defaultIcon: 'briefcase',
  },
  deporte: {
    label: 'Deporte / Personal',
    color: 'var(--color-deporte)',
    soft: 'var(--color-deporte-soft)',
    defaultIcon: 'trophy',
  },
}

export const CATEGORY_ORDER = ['clase', 'laboratorio', 'blanda', 'trabajo', 'deporte']

export const DAYS = [
  { key: 'mon', label: 'Lun' },
  { key: 'tue', label: 'Mar' },
  { key: 'wed', label: 'Mié' },
  { key: 'thu', label: 'Jue' },
  { key: 'fri', label: 'Vie' },
  { key: 'sat', label: 'Sáb' },
  { key: 'sun', label: 'Dom' },
]
