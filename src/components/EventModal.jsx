import { useState, useEffect } from 'react'
import { CATEGORIES, CATEGORY_ORDER, DAYS } from '../lib/categories'

const EMPTY = {
  title: '',
  type: 'clase',
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
    setForm(initial ?? EMPTY)
    setError('')
  }, [initial])

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
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
        className="bg-[var(--color-cream)] border border-[var(--color-line)] rounded-2xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto"
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
          className="w-full mb-3 px-3 py-2 rounded-lg border border-[var(--color-line)] bg-white text-sm focus-visible:outline-2"
        />

        <label className="block text-xs font-medium text-[var(--color-ink-soft)] mb-1">
          Tipo
        </label>
        <div className="grid grid-cols-2 gap-2 mb-3">
          {CATEGORY_ORDER.map((key) => (
            <button
              type="button"
              key={key}
              onClick={() => update('type', key)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs text-left transition-colors"
              style={{
                borderColor: CATEGORIES[key].color,
                background: form.type === key ? CATEGORIES[key].soft : 'white',
              }}
            >
              <span>{CATEGORIES[key].icon}</span>
              <span className="truncate">{CATEGORIES[key].label}</span>
            </button>
          ))}
        </div>

        <label className="block text-xs font-medium text-[var(--color-ink-soft)] mb-1">
          Día
        </label>
        <select
          value={form.day_of_week}
          onChange={(e) => update('day_of_week', e.target.value)}
          className="w-full mb-3 px-3 py-2 rounded-lg border border-[var(--color-line)] bg-white text-sm"
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
              className="w-full px-3 py-2 rounded-lg border border-[var(--color-line)] bg-white text-sm font-[var(--font-mono)]"
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
              className="w-full px-3 py-2 rounded-lg border border-[var(--color-line)] bg-white text-sm font-[var(--font-mono)]"
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
              className="w-full mb-3 px-3 py-2 rounded-lg border border-[var(--color-line)] bg-white text-sm"
            />

            <label className="block text-xs font-medium text-[var(--color-ink-soft)] mb-1">
              Profesor (opcional)
            </label>
            <input
              value={form.professor}
              onChange={(e) => update('professor', e.target.value)}
              placeholder="Ej: Ing. Pérez"
              className="w-full mb-3 px-3 py-2 rounded-lg border border-[var(--color-line)] bg-white text-sm"
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
              className="px-4 py-2 rounded-lg text-sm border border-[var(--color-line)] bg-white"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg text-sm bg-[var(--color-ink)] text-white font-medium"
            >
              Guardar
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
