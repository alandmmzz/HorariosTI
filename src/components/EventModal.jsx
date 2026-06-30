import { useState, useEffect } from 'react'
import { CATEGORIES, CATEGORY_ORDER, DAYS } from '../lib/categories'
import { ICONS, ICON_ORDER, getIcon } from '../lib/icons'
import { COLOR_PALETTE, COLOR_ORDER } from '../lib/colors'

const EMPTY = {
  title: '',
  type: 'clase',
  icon: CATEGORIES.clase.defaultIcon,
  color: CATEGORIES.clase.defaultColor,
  days: ['mon'],
  start_time: '08:00',
  end_time: '09:00',
  location: '',
  professor: '',
}

export default function EventModal({ initial, onClose, onSave, onDelete }) {
  const [form, setForm] = useState(EMPTY)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!initial) {
      setForm(EMPTY)
      setError('')
      return
    }
    const fallbackCat = CATEGORIES[initial.type] ?? CATEGORIES.clase
    setForm({
      ...initial,
      icon: initial.icon ?? fallbackCat.defaultIcon,
      color: initial.color ?? fallbackCat.defaultColor,
      days: initial.days ?? [initial.day_of_week],
    })
    setError('')
  }, [initial])

  const isEditing = Boolean(form.id)

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function updateType(key) {
    setForm((f) => ({ ...f, type: key, icon: CATEGORIES[key].defaultIcon, color: CATEGORIES[key].defaultColor }))
  }

  function toggleDay(key) {
    if (isEditing) {
      // Editando una actividad puntual: el día es único.
      setForm((f) => ({ ...f, days: [key] }))
      return
    }
    setForm((f) => {
      const has = f.days.includes(key)
      const days = has ? f.days.filter((d) => d !== key) : [...f.days, key]
      return { ...f, days }
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.title.trim()) {
      setError('Ponele un nombre a la materia o actividad.')
      return
    }
    if (form.days.length === 0) {
      setError('Elegí al menos un día.')
      return
    }
    if (form.end_time <= form.start_time) {
      setError('La hora de fin tiene que ser después de la de inicio.')
      return
    }
    onSave(form)
  }

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
          {isEditing ? 'Día' : 'Días (podés elegir varios para repetirla)'}
        </label>
        <div className="flex flex-wrap gap-1.5 mb-1">
          {DAYS.map((d) => {
            const selected = form.days.includes(d.key)
            return (
              <button
                type="button"
                key={d.key}
                onClick={() => toggleDay(d.key)}
                className="px-2.5 py-1.5 text-xs font-medium border-2 transition-colors"
                style={{
                  borderColor: selected ? 'var(--color-ink)' : 'var(--color-line)',
                  background: selected ? 'var(--color-ink)' : 'white',
                  color: selected ? 'white' : 'var(--color-ink)',
                }}
              >
                {d.label}
              </button>
            )
          })}
        </div>
        {!isEditing && form.days.length > 1 && (
          <p className="text-[11px] text-[var(--color-ink-soft)] mb-3">
            Se va a crear una actividad para cada día elegido ({form.days.length}).
          </p>
        )}
        <div className="mb-3" />

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
