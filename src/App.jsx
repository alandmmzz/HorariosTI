import { useEffect, useState, useCallback } from 'react'
import { supabase, isSupabaseConfigured } from './lib/supabaseClient'
import { useAuth } from './lib/AuthContext'
import { DAYS } from './lib/categories'
import Sidebar from './components/Sidebar'
import WeekGrid from './components/WeekGrid'
import WeeklyLoadBar from './components/WeeklyLoadBar'
import EventModal from './components/EventModal'
import CareerProgress from './components/CareerProgress'
import BannerSlot from './components/BannerSlot'

const LOCAL_KEY = 'horarios-ti-events'
const DISMISS_KEY = 'horarios-ti-login-hint-dismissed'
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
  const { user, authLoading } = useAuth() ?? {}
  const cloudReady = isSupabaseConfigured && Boolean(user)

  const [activeTab, setActiveTab] = useState('horario')
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [showWeekend, setShowWeekend] = useState(false)
  const [modalState, setModalState] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')
  const [hintDismissed, setHintDismissed] = useState(() => localStorage.getItem(DISMISS_KEY) === '1')

  const visibleDays = showWeekend ? DAYS : WEEKDAYS

  const fetchEvents = useCallback(async () => {
    if (authLoading) return
    setLoading(true)
    if (cloudReady) {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('user_id', user.id)
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
  }, [cloudReady, user, authLoading])

  useEffect(() => {
    fetchEvents()
  }, [fetchEvents])

  function dismissHint() {
    localStorage.setItem(DISMISS_KEY, '1')
    setHintDismissed(true)
  }

  async function handleSave(form) {
    const { days, day_of_week, ...rest } = form

    if (cloudReady) {
      if (form.id) {
        const { error } = await supabase
          .from('events')
          .update({ ...rest, day_of_week: days[0] })
          .eq('id', form.id)
        if (error) return setErrorMsg(error.message)
      } else {
        const rows = days.map((day) => ({ ...rest, day_of_week: day, user_id: user.id }))
        const { error } = await supabase.from('events').insert(rows)
        if (error) return setErrorMsg(error.message)
      }
      await fetchEvents()
    } else {
      let next
      if (form.id) {
        next = events.map((e) => (e.id === form.id ? { ...rest, id: form.id, day_of_week: days[0] } : e))
      } else {
        const newRows = days.map((day) => ({ ...rest, day_of_week: day, id: crypto.randomUUID() }))
        next = [...events, ...newRows]
      }
      setEvents(next)
      saveLocal(next)
    }
    setModalState(null)
  }

  async function handleDelete(id) {
    if (cloudReady) {
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
    <div className="min-h-screen px-3 py-3 md:px-6 md:py-4 max-w-7xl mx-auto">
      <BannerSlot />

      {!isSupabaseConfigured && (
        <div className="mb-3 px-4 py-2 bg-[var(--color-blanda-soft)] border border-[var(--color-blanda)] text-sm">
          Todavía no conectaste Supabase: por ahora tus horarios se guardan solo en este navegador.
          Configurá las variables <code className="font-[var(--font-mono)]">VITE_SUPABASE_URL</code> y{' '}
          <code className="font-[var(--font-mono)]">VITE_SUPABASE_ANON_KEY</code> para guardarlos en la nube.
        </div>
      )}

      {isSupabaseConfigured && !authLoading && !user && !hintDismissed && (
        <div className="mb-3 px-4 py-2 bg-[var(--color-blanda-soft)] border border-[var(--color-blanda)] text-sm flex items-start justify-between gap-3">
          <span>
            Podés usar la app sin conectarte, pero tus datos solo se guardan en este navegador.
            Conectate con Google (panel de la izquierda) para guardarlos en la nube y no perderlos.
          </span>
          <button
            onClick={dismissHint}
            className="shrink-0 text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] text-xs underline"
          >
            Cerrar
          </button>
        </div>
      )}

      {errorMsg && (
        <div className="mb-3 px-4 py-2 bg-[var(--color-lab-soft)] border border-[var(--color-lab)] text-sm">
          {errorMsg}
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-4">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="flex-1 min-w-0">
          {activeTab === 'horario' ? (
            <>
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <div className="flex-1 min-w-0">
                  <WeeklyLoadBar events={events} />
                </div>
                <label className="flex items-center gap-2 text-xs text-[var(--color-ink-soft)] cursor-pointer select-none shrink-0">
                  <input
                    type="checkbox"
                    checked={showWeekend}
                    onChange={(e) => setShowWeekend(e.target.checked)}
                  />
                  Finde
                </label>
                <button
                  onClick={() => setModalState({ initial: null })}
                  className="pixel-panel-head px-4 py-2 text-sm bg-[var(--color-ink)] text-white font-medium shadow-[3px_3px_0_var(--color-clase)] hover:shadow-[1px_1px_0_var(--color-clase)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all shrink-0"
                  style={{ '--notch': '6px' }}
                >
                  + Nueva actividad
                </button>
              </div>

              {loading ? (
                <p className="text-sm text-[var(--color-ink-soft)]">Cargando horarios…</p>
              ) : (
                <WeekGrid
                  events={events}
                  visibleDays={visibleDays}
                  onEventClick={(event) => setModalState({ initial: event })}
                  onSlotClick={(dayKey, hour) => {
                    const start = `${String(hour).padStart(2, '0')}:00`
                    const end = `${String(hour + 1).padStart(2, '0')}:00`
                    setModalState({
                      initial: {
                        days: [dayKey],
                        start_time: start,
                        end_time: end,
                        type: 'clase',
                        icon: 'book-open',
                        color: 'clase',
                        title: '',
                        location: '',
                        professor: '',
                      },
                    })
                  }}
                />
              )}
            </>
          ) : (
            <CareerProgress events={events} />
          )}
        </div>
      </div>

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
