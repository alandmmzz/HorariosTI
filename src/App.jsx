import { useEffect, useState, useCallback } from 'react'
import { supabase, isSupabaseConfigured } from './lib/supabaseClient'
import { DAYS } from './lib/categories'
import WeekGrid from './components/WeekGrid'
import WeeklyLoadBar from './components/WeeklyLoadBar'
import EventModal from './components/EventModal'

const LOCAL_KEY = 'horarios-ti-events'
const WEEKDAYS = DAYS.filter((d) => !['sat', 'sun'].includes(d.key))

function loadLocal() {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_KEY)) ?? []
  } catch {
    return []
  }
}

function saveLocal(events) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(events))
}

export default function App() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [showWeekend, setShowWeekend] = useState(false)
  const [modalState, setModalState] = useState(null) // { initial } | null
  const [errorMsg, setErrorMsg] = useState('')

  const visibleDays = showWeekend ? DAYS : WEEKDAYS

  const fetchEvents = useCallback(async () => {
    setLoading(true)
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('start_time', { ascending: true })
      if (error) {
        setErrorMsg('No se pudo conectar con Supabase. Revisá tu configuración.')
        setEvents(loadLocal())
      } else {
        setEvents(data)
      }
    } else {
      setEvents(loadLocal())
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchEvents()
  }, [fetchEvents])

  async function handleSave(form) {
    if (isSupabaseConfigured) {
      if (form.id) {
        const { error } = await supabase.from('events').update(form).eq('id', form.id)
        if (error) return setErrorMsg(error.message)
      } else {
        const { error } = await supabase.from('events').insert(form)
        if (error) return setErrorMsg(error.message)
      }
      await fetchEvents()
    } else {
      let next
      if (form.id) {
        next = events.map((e) => (e.id === form.id ? form : e))
      } else {
        next = [...events, { ...form, id: crypto.randomUUID() }]
      }
      setEvents(next)
      saveLocal(next)
    }
    setModalState(null)
  }

  async function handleDelete(id) {
    if (isSupabaseConfigured) {
      const { error } = await supabase.from('events').delete().eq('id', id)
      if (error) return setErrorMsg(error.message)
      await fetchEvents()
    } else {
      const next = events.filter((e) => e.id !== id)
      setEvents(next)
      saveLocal(next)
    }
    setModalState(null)
  }

  return (
    <div className="min-h-screen px-4 py-6 md:px-8 md:py-8 max-w-6xl mx-auto">
      <header className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <p className="font-[var(--font-mono)] text-xs tracking-widest text-[var(--color-ink-soft)] mb-1">
            TECNÓLOGO EN INFORMÁTICA · BUCEO
          </p>
          <h1 className="font-[var(--font-display)] font-bold text-3xl md:text-4xl text-[var(--color-ink)]">
            Horarios TI
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-xs text-[var(--color-ink-soft)] cursor-pointer select-none">
            <input
              type="checkbox"
              checked={showWeekend}
              onChange={(e) => setShowWeekend(e.target.checked)}
            />
            Mostrar fin de semana
          </label>
          <button
            onClick={() => setModalState({ initial: null })}
            className="pixel-panel-head px-4 py-2 text-sm bg-[var(--color-ink)] text-white font-medium shadow-[3px_3px_0_var(--color-clase)] hover:shadow-[1px_1px_0_var(--color-clase)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            style={{ '--notch': '6px' }}
          >
            + Nueva actividad
          </button>
        </div>
      </header>

      {!isSupabaseConfigured && (
        <div className="mb-5 px-4 py-3 rounded-none bg-[var(--color-blanda-soft)] border border-[var(--color-blanda)] text-sm">
          Todavía no conectaste Supabase: por ahora tus horarios se guardan solo en este navegador.
          Configurá las variables <code className="font-[var(--font-mono)]">VITE_SUPABASE_URL</code> y{' '}
          <code className="font-[var(--font-mono)]">VITE_SUPABASE_ANON_KEY</code> para guardarlos en la nube.
        </div>
      )}

      {errorMsg && (
        <div className="mb-5 px-4 py-3 rounded-none bg-[var(--color-lab-soft)] border border-[var(--color-lab)] text-sm">
          {errorMsg}
        </div>
      )}

      <div className="mb-5">
        <WeeklyLoadBar events={events} />
      </div>

      {loading ? (
        <p className="text-sm text-[var(--color-ink-soft)]">Cargando horarios…</p>
      ) : (
        <WeekGrid
          events={events}
          visibleDays={visibleDays}
          onEventClick={(event) => setModalState({ initial: event })}
          onSlotClick={(dayKey) =>
            setModalState({ initial: { day_of_week: dayKey, start_time: '08:00', end_time: '09:00', type: 'clase', title: '', location: '', professor: '' } })
          }
        />
      )}

      <p className="text-xs text-[var(--color-ink-soft)] mt-4">
        Tip: doble clic en un casillero vacío de la grilla para crear una actividad en ese día.
      </p>

      {modalState && (
        <EventModal
          initial={modalState.initial}
          onClose={() => setModalState(null)}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      )}
    </div>
  )
}
