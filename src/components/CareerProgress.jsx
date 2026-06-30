import { useEffect, useState, useCallback } from 'react'
import { Lock } from 'pixelarticons/react/Lock.js'
import { useAuth } from '../lib/AuthContext'
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient'
import {
  AREAS,
  TOTAL_DEGREE_CREDITS,
  isUnlocked,
  missingRequirements,
  creditsCompleted,
  areaCreditsCompleted,
} from '../lib/curriculum'

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

function SubjectRow({ subject, completed, unlocked, onToggle }) {
  const checked = completed.has(subject.key)
  const hint = unlocked ? undefined : `Necesitás: ${missingRequirements(subject, completed).join(', ')}`

  return (
    <li className="flex items-center gap-2">
      <button
        type="button"
        disabled={!unlocked}
        onClick={() => onToggle(subject.key)}
        title={hint}
        className="w-5 h-5 shrink-0 border-2 flex items-center justify-center disabled:cursor-not-allowed"
        style={{
          borderColor: unlocked ? 'var(--color-ink)' : 'var(--color-line)',
          background: checked ? 'var(--color-deporte)' : unlocked ? 'white' : 'var(--color-cream-soft)',
        }}
        aria-pressed={checked}
        aria-label={`Marcar ${subject.name} como completada`}
      >
        {checked && <span className="text-white text-xs leading-none">✓</span>}
        {!unlocked && !checked && <Lock width={11} height={11} className="text-[var(--color-ink-soft)]" />}
      </button>

      <span
        className="text-sm"
        title={hint}
        style={{
          color: !unlocked ? 'var(--color-ink-soft)' : checked ? 'var(--color-ink-soft)' : 'var(--color-ink)',
          textDecoration: checked ? 'line-through' : 'none',
        }}
      >
        {subject.name}
      </span>

      <span className="ml-auto font-[var(--font-mono)] text-[10px] text-[var(--color-ink-soft)] shrink-0">
        {subject.credits} cr
      </span>
    </li>
  )
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

  const totalCredits = creditsCompleted(completed)
  const percent = Math.min(100, Math.round((totalCredits / TOTAL_DEGREE_CREDITS) * 100))

  return (
    <div className="space-y-5">
      <div className="pixel-panel bg-white px-5 py-4">
        <div className="flex items-baseline justify-between mb-2">
          <h2 className="font-[var(--font-display)] font-semibold text-sm tracking-wide text-[var(--color-ink)]">
            AVANCE DE LA CARRERA
          </h2>
          <span className="font-[var(--font-mono)] text-xs text-[var(--color-ink-soft)]">
            {totalCredits} / {TOTAL_DEGREE_CREDITS} créditos
          </span>
        </div>
        <div className="h-4 w-full bg-[var(--color-cream-soft)] border border-[var(--color-line)] overflow-hidden">
          <div className="h-full bg-[var(--color-deporte)] transition-all" style={{ width: `${percent}%` }} />
        </div>
        <p className="font-[var(--font-mono)] text-xs text-[var(--color-ink-soft)] mt-1">{percent}%</p>
        <div className="flex flex-wrap items-center gap-4 mt-2 text-[11px] text-[var(--color-ink-soft)]">
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 inline-block border-2 border-[var(--color-line)] bg-[var(--color-cream-soft)]" />
            Bloqueada
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 inline-block border-2 border-[var(--color-ink)] bg-white" />
            Disponible
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 inline-block border-2 border-[var(--color-ink)] bg-[var(--color-deporte)]" />
            Completada
          </span>
        </div>
        {!user && (
          <p className="text-xs text-[var(--color-ink-soft)] mt-2">
            Estás viendo esto sin conectar tu cuenta: se guarda solo en este navegador.
          </p>
        )}
      </div>

      {loading ? (
        <p className="text-sm text-[var(--color-ink-soft)]">Cargando avance…</p>
      ) : (
        AREAS.map((area) => {
          const areaCredits = areaCreditsCompleted(area, completed)
          return (
            <div key={area.key} className="pixel-panel bg-white px-5 py-4">
              <div className="flex items-baseline justify-between mb-1">
                <h3 className="font-[var(--font-display)] font-semibold text-sm text-[var(--color-ink)]">
                  {area.name.toUpperCase()}
                </h3>
                <span className="font-[var(--font-mono)] text-xs text-[var(--color-ink-soft)]">
                  {areaCredits} / {area.minCredits} cr mín.
                </span>
              </div>
              <div className="h-1.5 w-full bg-[var(--color-cream-soft)] mb-3 overflow-hidden">
                <div
                  className="h-full bg-[var(--color-trabajo)]"
                  style={{ width: `${Math.min(100, (areaCredits / area.minCredits) * 100)}%` }}
                />
              </div>
              <ul className="space-y-1.5">
                {area.subjects.map((subject) => (
                  <SubjectRow
                    key={subject.key}
                    subject={subject}
                    completed={completed}
                    unlocked={isUnlocked(subject, completed)}
                    onToggle={toggleSubject}
                  />
                ))}
              </ul>
            </div>
          )
        })
      )}
    </div>
  )
}
