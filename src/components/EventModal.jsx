import { useState, useEffect } from 'react'
import { CATEGORIES, CATEGORY_ORDER, DAYS } from '../lib/categories'
import { ICONS, ICON_ORDER, getIcon } from '../lib/icons'
import { COLOR_PALETTE, COLOR_ORDER, getColor } from '../lib/colors'

const EMPTY = {
  title: '',
  type: 'clase',
  icon: CATEGORIES.clase.defaultIcon,
  color: CATEGORIES.clase.defaultColor,
  day_of_week: 'mon',
  start_time: '08:00',
  end_time: '09:00',
  location: '',
  professor: '',
}

export default function EventModal({ initial, onClose, onSave, onDelete }) {
  const [form, setForm] = useState(initial ?? EMPTY)
  const [error, setError] = useState('')

  useEffect(() => {
    const next = initial ?? EMPTY
    const fallbackCat = CATEGORIES[next.type] ?? CATEGORIES.clase
    setForm({
      ...next,
      icon: next.icon ?? fallbackCat.defaultIcon,
      color: next.color ?? fallbackCat.defaultColor,
    })
    setError('')
  }, [initial])

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function updateType(key) {
    setForm((f) => ({ ...f, type: key, icon: CATEGORIES[key].defaultIcon, color: CATEGORIES[key].defaultColor }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.title.trim()) {
      setError('Ponele un nombre a la materia o actividad.')
      return
    }
    if (form.end_time <= form.start_time) {
      setError('La hora de fin tiene que ser después de la de inicio.')
      return
    }
    onSave(form)
  }

  const isEditing = Boolean(form.id)

  return (
    <div
      className="fixed inset-0 bg-[var(--color-ink)]/40 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        className="bg-[var(--color-cream)] pixel-panel w-full max-w-md p-6 max-h-[90vh] overflow-y-auto"
      >
        <h2 className="font-[var(--font-display)] font-semibold text-lg mb-4">
          {isEditing ? 'Editar' : 'Nueva'} actividad
        </h2>

        <label className="block text-xs font-medium text-[var(--color-ink-soft)] mb-1">
          Nombre
        </label>
        <input
          autoFocus
          value={form.title}
          onChange={(e) => update('title', e.target.value)}
          placeholder="Ej: Base de Datos 1, Gimnasio, Trabajo"
          className="w-full mb-3 px-3 py-2 rounded-none border border-[var(--color-line)] bg-white text-sm focus-visible:outline-2"
        />

        <label className="block text-xs font-medium text-[var(--color-ink-soft)] mb-1">
          Tipo
        </label>
        <div className="grid grid-cols-2 gap-2 mb-3">
          {CATEGORY_ORDER.map((key) => {
            const CatIcon = getIcon(CATEGORIES[key].defaultIcon)
            return (
              <button
                type="button"
                key={key}
                onClick={() => updateType(key)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-none border text-xs text-left transition-colors"
                style={{
                  borderColor: CATEGORIES[key].color,
                  background: form.type === key ? CATEGORIES[key].soft : 'white',
                }}
              >
                <CatIcon width={14} height={14} className="shrink-0" />
                <span className="truncate">{CATEGORIES[key].label}</span>
              </button>
            )
          })}
        </div>

        <label className="block text-xs font-medium text-[var(--color-ink-soft)] mb-1">
          Icono
        </label>
        <div className="grid grid-cols-8 gap-1.5 mb-4 p-2 bg-white border border-[var(--color-line)]">
          {ICON_ORDER.map((key) => {
            const { Icon, label } = ICONS[key]
            const selected = form.icon === key
            return (
              <button
                type="button"
                key={key}
                title={label}
                onClick={() => update('icon', key)}
                className="aspect-square flex items-center justify-center p-1.5 border-2 transition-colors"
                style={{
                  borderColor: selected ? 'var(--color-ink)' : 'transparent',
                  background: selected ? 'var(--color-clase-soft)' : 'transparent',
                }}
              >
                <Icon width={16} height={16} />
              </button>
            )
          })}
        </div>

        <label className="block text-xs font-medium text-[var(--color-ink-soft)] mb-1">
          Color
        </label>
        <div className="flex flex-wrap gap-2 mb-4">
          {COLOR_ORDER.map((key) => {
            const { color, label } = COLOR_PALETTE[key]
            const selected = form.color === key
            return (
              <button
                type="button"
                key={key}
                title={label}
                onClick={() => update('color', key)}
                className="w-7 h-7 border-2 transition-transform"
                style={{
                  background: color,
                  borderColor: selected ? 'var(--color-ink)' : 'transparent',
                  transform: selected ? 'scale(1.12)' : 'scale(1)',
                }}
              />
            )
          })}
        </div>

        <label className="block text-xs font-medium text-[var(--color-ink-soft)] mb-1">
          Día
        </label>
        <select
          value={form.day_of_week}
          onChange={(e) => update('day_of_week', e.target.value)}
          className="w-full mb-3 px-3 py-2 rounded-none border border-[var(--color-line)] bg-white text-sm"
        >
          {DAYS.map((d) => (
            <option key={d.key} value={d.key}>
              {d.label}
            </option>
          ))}
        </select>

        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label className="block text-xs font-medium text-[var(--color-ink-soft)] mb-1">
              Desde
            </label>
            <input
              type="time"
              value={form.start_time}
              onChange={(e) => update('start_time', e.target.value)}
              className="w-full px-3 py-2 rounded-none border border-[var(--color-line)] bg-white text-sm font-[var(--font-mono)]"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[var(--color-ink-soft)] mb-1">
              Hasta
            </label>
            <input
              type="time"
              value={form.end_time}
              onChange={(e) => update('end_time', e.target.value)}
              className="w-full px-3 py-2 rounded-none border border-[var(--color-line)] bg-white text-sm font-[var(--font-mono)]"
            />
          </div>
        </div>

        {(form.type === 'clase' || form.type === 'laboratorio' || form.type === 'blanda') && (
          <>
            <label className="block text-xs font-medium text-[var(--color-ink-soft)] mb-1">
              Salón (opcional)
            </label>
            <input
              value={form.location}
              onChange={(e) => update('location', e.target.value)}
              placeholder="Ej: Aula 304"
              className="w-full mb-3 px-3 py-2 rounded-none border border-[var(--color-line)] bg-white text-sm"
            />

            <label className="block text-xs font-medium text-[var(--color-ink-soft)] mb-1">
              Profesor (opcional)
            </label>
            <input
              value={form.professor}
              onChange={(e) => update('professor', e.target.value)}
              placeholder="Ej: Ing. Pérez"
              className="w-full mb-3 px-3 py-2 rounded-none border border-[var(--color-line)] bg-white text-sm"
            />
          </>
        )}

        {error && <p className="text-xs text-[var(--color-lab)] mb-3">{error}</p>}

        <div className="flex items-center justify-between gap-2 mt-5">
          <div>
            {isEditing && (
              <button
                type="button"
                onClick={() => onDelete(form.id)}
                className="text-xs text-[var(--color-ink-soft)] hover:text-[var(--color-lab)] underline"
              >
                Eliminar
              </button>
            )}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-none text-sm border border-[var(--color-line)] bg-white"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="pixel-panel-head px-4 py-2 text-sm bg-[var(--color-ink)] text-white font-medium shadow-[3px_3px_0_var(--color-clase)] hover:shadow-[1px_1px_0_var(--color-clase)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
              style={{ '--notch': '6px' }}
            >
              Guardar
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
