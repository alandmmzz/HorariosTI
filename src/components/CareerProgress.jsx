import { useEffect, useState, useCallback } from 'react'
import { useAuth } from '../lib/AuthContext'
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient'
import { CURRICULUM, TOTAL_SUBJECTS } from '../lib/curriculum'

const LOCAL_KEY = 'horarios-ti-completed-subjects'

function loadLocal() {
  try {
    return new Set(JSON.parse(localStorage.getItem(LOCAL_KEY)) ?? [])
  } catch {
    return new Set()
  }
}

function saveLocal(set) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify([...set]))
}

export default function CareerProgress() {
  const { user } = useAuth() ?? {}
  const [completed, setCompleted] = useState(new Set())
  const [loading, setLoading] = useState(true)

  const fetchCompleted = useCallback(async () => {
    setLoading(true)
    if (isSupabaseConfigured && user) {
      const { data, error } = await supabase
        .from('completed_subjects')
        .select('subject_key')
        .eq('user_id', user.id)
      if (!error) setCompleted(new Set(data.map((r) => r.subject_key)))
    } else {
      setCompleted(loadLocal())
    }
    setLoading(false)
  }, [user])

  useEffect(() => {
    fetchCompleted()
  }, [fetchCompleted])

  async function toggleSubject(key) {
    const isCompleted = completed.has(key)

    if (isSupabaseConfigured && user) {
      if (isCompleted) {
        await supabase.from('completed_subjects').delete().eq('user_id', user.id).eq('subject_key', key)
      } else {
        await supabase.from('completed_subjects').insert({ user_id: user.id, subject_key: key })
      }
      await fetchCompleted()
    } else {
      const next = new Set(completed)
      isCompleted ? next.delete(key) : next.add(key)
      setCompleted(next)
      saveLocal(next)
    }
  }

  const percent = Math.round((completed.size / TOTAL_SUBJECTS) * 100)

  return (
    <div className="space-y-5">
      <div className="pixel-panel bg-white px-5 py-4">
        <div className="flex items-baseline justify-between mb-2">
          <h2 className="font-[var(--font-display)] font-semibold text-sm tracking-wide text-[var(--color-ink)]">
            AVANCE DE LA CARRERA
          </h2>
          <span className="font-[var(--font-mono)] text-xs text-[var(--color-ink-soft)]">
            {completed.size} / {TOTAL_SUBJECTS} materias
          </span>
        </div>
        <div className="h-4 w-full bg-[var(--color-cream-soft)] border border-[var(--color-line)] overflow-hidden">
          <div
            className="h-full bg-[var(--color-deporte)] transition-all"
            style={{ width: `${percent}%` }}
          />
        </div>
        <p className="font-[var(--font-mono)] text-xs text-[var(--color-ink-soft)] mt-1">{percent}%</p>
        {!user && (
          <p className="text-xs text-[var(--color-ink-soft)] mt-2">
            Estás viendo esto sin conectar tu cuenta: se guarda solo en este navegador.
          </p>
        )}
      </div>

      {loading ? (
        <p className="text-sm text-[var(--color-ink-soft)]">Cargando avance…</p>
      ) : (
        CURRICULUM.map((sem) => {
          const semCompleted = sem.subjects.filter((s) => completed.has(s.key)).length
          return (
            <div key={sem.semester} className="pixel-panel bg-white px-5 py-4">
              <div className="flex items-baseline justify-between mb-3">
                <h3 className="font-[var(--font-display)] font-semibold text-sm text-[var(--color-ink)]">
                  {sem.semester}.º SEMESTRE {sem.optional && <span className="text-[var(--color-ink-soft)] text-xs">(optativas)</span>}
                </h3>
                <span className="font-[var(--font-mono)] text-xs text-[var(--color-ink-soft)]">
                  {semCompleted}/{sem.subjects.length}
                </span>
              </div>
              <ul className="space-y-1.5">
                {sem.subjects.map((subject) => {
                  const checked = completed.has(subject.key)
                  return (
                    <li key={subject.key} className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => toggleSubject(subject.key)}
                        className="w-5 h-5 shrink-0 border-2 border-[var(--color-ink)] flex items-center justify-center"
                        style={{ background: checked ? 'var(--color-deporte)' : 'white' }}
                        aria-pressed={checked}
                        aria-label={`Marcar ${subject.name} como completada`}
                      >
                        {checked && <span className="text-white text-xs leading-none">✓</span>}
                      </button>
                      <a
                        href={subject.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm hover:underline"
                        style={{
                          color: checked ? 'var(--color-ink-soft)' : 'var(--color-ink)',
                          textDecoration: checked ? 'line-through' : 'none',
                        }}
                      >
                        {subject.name}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })
      )}
    </div>
  )
}
