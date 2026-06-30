import { useEffect, useState, useCallback } from 'react'
import { Lock } from 'pixelarticons/react/Lock.js'
import { useAuth } from '../lib/AuthContext'
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient'
import {
  AREAS,
  SEMESTER_VIEW,
  TOTAL_DEGREE_CREDITS,
  isUnlocked,
  missingRequirements,
  creditsCompleted,
  areaCreditsCompleted,
} from '../lib/curriculum'

const LOCAL_KEY = 'horarios-ti-completed-subjects'
const VIEW_KEY = 'horarios-ti-career-view'

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

function SubjectRow({ subject, completed, unlocked, cursando, onToggle }) {
  const checked = completed.has(subject.key)
  const hint = unlocked ? undefined : `Necesitás: ${missingRequirements(subject, completed).join(', ')}`

  let bg = 'white'
  let borderColor = 'var(--color-ink)'
  if (checked) {
    bg = 'var(--color-deporte)'
  } else if (!unlocked) {
    bg = 'var(--color-cream-soft)'
    borderColor = 'var(--color-line)'
  } else if (cursando) {
    bg = 'var(--color-trabajo)'
  }

  return (
    <li className="flex items-center gap-2">
      <button
        type="button"
        disabled={!unlocked}
        onClick={() => onToggle(subject.key)}
        title={hint}
        className="w-5 h-5 shrink-0 border-2 flex items-center justify-center disabled:cursor-not-allowed"
        style={{ borderColor, background: bg }}
        aria-pressed={checked}
        aria-label={`Marcar ${subject.name} como completada`}
      >
        {checked && <span className="text-white text-xs leading-none">✓</span>}
        {!checked && cursando && unlocked && <span className="text-white text-[9px] leading-none">●</span>}
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

      {cursando && !checked && (
        <span className="text-[10px] font-medium text-[var(--color-trabajo)] shrink-0">cursando</span>
      )}

      <span className="ml-auto font-[var(--font-mono)] text-[10px] text-[var(--color-ink-soft)] shrink-0">
        {subject.credits} cr
      </span>
    </li>
  )
}

function GroupCard({ group, completed, cursandoNames, onToggle }) {
  const groupCredits = areaCreditsCompleted(group, completed)
  return (
    <div className="pixel-panel bg-white px-5 py-4">
      <div className="flex items-baseline justify-between mb-1">
        <h3 className="font-[var(--font-display)] font-semibold text-sm text-[var(--color-ink)]">
          {(group.name ?? group.label).toUpperCase()}
        </h3>
        <span className="font-[var(--font-mono)] text-xs text-[var(--color-ink-soft)]">
          {group.minCredits ? `${groupCredits} / ${group.minCredits} cr mín.` : `${groupCredits} cr`}
        </span>
      </div>
      {group.minCredits && (
        <div className="h-1.5 w-full bg-[var(--color-cream-soft)] mb-3 overflow-hidden">
          <div
            className="h-full bg-[var(--color-trabajo)]"
            style={{ width: `${Math.min(100, (groupCredits / group.minCredits) * 100)}%` }}
          />
        </div>
      )}
      {!group.minCredits && <div className="mb-3" />}
      <ul className="space-y-1.5">
        {group.subjects.map((subject) => (
          <SubjectRow
            key={subject.key}
            subject={subject}
            completed={completed}
            unlocked={isUnlocked(subject, completed) || cursandoNames.has(subject.name)}
            cursando={cursandoNames.has(subject.name)}
            onToggle={onToggle}
          />
        ))}
      </ul>
    </div>
  )
}

export default function CareerProgress({ events = [] }) {
  const { user } = useAuth() ?? {}
  const [completed, setCompleted] = useState(new Set())
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState(() => localStorage.getItem(VIEW_KEY) ?? 'area')

  const cursandoNames = new Set(
    events.filter((e) => e.type === 'clase').map((e) => e.title?.trim()).filter(Boolean)
  )

  function changeView(next) {
    setView(next)
    localStorage.setItem(VIEW_KEY, next)
  }

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

  // Actualización optimista: cambia el estado al instante y recién después
  // sincroniza con Supabase en segundo plano, sin volver a mostrar "Cargando…".
  async function toggleSubject(key) {
    const wasCompleted = completed.has(key)
    const next = new Set(completed)
    wasCompleted ? next.delete(key) : next.add(key)
    setCompleted(next)

    if (isSupabaseConfigured && user) {
      const { error } = wasCompleted
        ? await supabase.from('completed_subjects').delete().eq('user_id', user.id).eq('subject_key', key)
        : await supabase.from('completed_subjects').insert({ user_id: user.id, subject_key: key })
      if (error) {
        // Si falló en el servidor, revertimos el cambio optimista.
        setCompleted(completed)
      }
    } else {
      saveLocal(next)
    }
  }

  const totalCredits = creditsCompleted(completed)
  const percent = Math.min(100, Math.round((totalCredits / TOTAL_DEGREE_CREDITS) * 100))
  const groups = view === 'area' ? AREAS : SEMESTER_VIEW

  return (
    <div className="space-y-5">
      <div className="pixel-panel bg-white px-5 py-4">
        <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
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
            <span className="w-3 h-3 inline-block border-2 border-[var(--color-ink)] bg-[var(--color-trabajo)]" />
            Cursando
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 inline-block border-2 border-[var(--color-ink)] bg-[var(--color-deporte)]" />
            Completada
          </span>
        </div>

        <div className="flex gap-2 mt-3">
          {[
            { key: 'area', label: 'Por área' },
            { key: 'semestre', label: 'Por semestre' },
          ].map((opt) => (
            <button
              key={opt.key}
              type="button"
              onClick={() => changeView(opt.key)}
              className="px-3 py-1.5 text-xs font-medium border-2 transition-colors"
              style={{
                borderColor: view === opt.key ? 'var(--color-ink)' : 'var(--color-line)',
                background: view === opt.key ? 'var(--color-ink)' : 'white',
                color: view === opt.key ? 'white' : 'var(--color-ink)',
              }}
            >
              {opt.label}
            </button>
          ))}
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
        groups.map((group) => (
          <GroupCard key={group.key} group={group} completed={completed} cursandoNames={cursandoNames} onToggle={toggleSubject} />
        ))
      )}
    </div>
  )
}
