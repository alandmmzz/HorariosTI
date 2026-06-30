import { useState, useEffect } from 'react'
import { Plus } from 'pixelarticons/react/Plus.js'
import { Trash } from 'pixelarticons/react/Trash.js'
import { Music } from 'pixelarticons/react/Music.js'
import { useProfileData } from '../lib/profileData'

function Card({ title, children }) {
  return (
    <div className="pixel-panel bg-white p-3">
      <h3 className="font-[var(--font-display)] font-semibold text-xs tracking-wide text-[var(--color-ink)] mb-2">
        {title.toUpperCase()}
      </h3>
      {children}
    </div>
  )
}

export default function PersonalWidgets() {
  const { data, loading, save } = useProfileData()
  const [newAbout, setNewAbout] = useState('')
  const [newGoal, setNewGoal] = useState('')
  const [draft, setDraft] = useState(data)

  useEffect(() => {
    setDraft(data)
  }, [data])

  if (loading) return null

  function addAbout() {
    if (!newAbout.trim()) return
    save({ ...data, about: [...data.about, newAbout.trim()] })
    setNewAbout('')
  }

  function removeAbout(i) {
    save({ ...data, about: data.about.filter((_, idx) => idx !== i) })
  }

  function addGoal() {
    if (!newGoal.trim()) return
    save({ ...data, goals: [...data.goals, { id: crypto.randomUUID(), label: newGoal.trim(), done: false }] })
    setNewGoal('')
  }

  function toggleGoal(id) {
    save({ ...data, goals: data.goals.map((g) => (g.id === id ? { ...g, done: !g.done } : g)) })
  }

  function removeGoal(id) {
    save({ ...data, goals: data.goals.filter((g) => g.id !== id) })
  }

  return (
    <div className="space-y-3">
      <Card title="Sobre mí">
        <ul className="space-y-1.5 mb-2">
          {data.about.map((line, i) => (
            <li key={i} className="flex items-start gap-1.5 text-sm group">
              <span className="text-[var(--color-clase)] leading-[1.4]">✦</span>
              <span className="flex-1">{line}</span>
              <button
                type="button"
                onClick={() => removeAbout(i)}
                className="opacity-0 group-hover:opacity-100 text-[var(--color-ink-soft)] hover:text-[var(--color-lab)] shrink-0"
                aria-label="Eliminar"
              >
                <Trash width={13} height={13} />
              </button>
            </li>
          ))}
        </ul>
        <div className="flex gap-1.5">
          <input
            value={newAbout}
            onChange={(e) => setNewAbout(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addAbout()}
            placeholder="Agregar algo sobre vos"
            className="flex-1 min-w-0 px-2 py-1 text-xs border border-[var(--color-line)]"
          />
          <button type="button" onClick={addAbout} className="px-2 border-2 border-[var(--color-ink)] shrink-0">
            <Plus width={14} height={14} />
          </button>
        </div>
      </Card>

      <Card title="Metas de hoy">
        <ul className="space-y-1.5 mb-2">
          {data.goals.map((g) => (
            <li key={g.id} className="flex items-center gap-2 text-sm group">
              <button
                type="button"
                onClick={() => toggleGoal(g.id)}
                className="w-4 h-4 shrink-0 border-2 border-[var(--color-ink)] flex items-center justify-center"
                style={{ background: g.done ? 'var(--color-deporte)' : 'white' }}
                aria-pressed={g.done}
              >
                {g.done && <span className="text-white text-[10px] leading-none">✓</span>}
              </button>
              <span
                className="flex-1"
                style={{
                  textDecoration: g.done ? 'line-through' : 'none',
                  color: g.done ? 'var(--color-ink-soft)' : 'var(--color-ink)',
                }}
              >
                {g.label}
              </span>
              <button
                type="button"
                onClick={() => removeGoal(g.id)}
                className="opacity-0 group-hover:opacity-100 text-[var(--color-ink-soft)] hover:text-[var(--color-lab)] shrink-0"
                aria-label="Eliminar"
              >
                <Trash width={13} height={13} />
              </button>
            </li>
          ))}
        </ul>
        <div className="flex gap-1.5">
          <input
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addGoal()}
            placeholder="Agregar una meta"
            className="flex-1 min-w-0 px-2 py-1 text-xs border border-[var(--color-line)]"
          />
          <button type="button" onClick={addGoal} className="px-2 border-2 border-[var(--color-ink)] shrink-0">
            <Plus width={14} height={14} />
          </button>
        </div>
        <p className="text-[10px] text-[var(--color-ink-soft)] mt-1.5">Se reinician cada día.</p>
      </Card>

      <Card title="Canción favorita">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 shrink-0 bg-[var(--color-cream-soft)] border-2 border-[var(--color-ink)] flex items-center justify-center">
            <Music width={16} height={16} className="text-[var(--color-ink-soft)]" />
          </div>
          <div className="flex-1 min-w-0">
            <input
              value={draft.song.title}
              onChange={(e) => setDraft({ ...draft, song: { ...draft.song, title: e.target.value } })}
              onBlur={() => save(draft)}
              placeholder="Título"
              className="w-full px-1 py-0.5 text-sm border-0 border-b border-[var(--color-line)] bg-transparent"
            />
            <input
              value={draft.song.artist}
              onChange={(e) => setDraft({ ...draft, song: { ...draft.song, artist: e.target.value } })}
              onBlur={() => save(draft)}
              placeholder="Artista"
              className="w-full px-1 py-0.5 text-xs text-[var(--color-ink-soft)] border-0 bg-transparent"
            />
          </div>
        </div>
      </Card>

      <Card title="Notas">
        <textarea
          value={draft.notes}
          onChange={(e) => setDraft({ ...draft, notes: e.target.value })}
          onBlur={() => save(draft)}
          placeholder="Lo que se te ocurra…"
          rows={4}
          className="w-full px-2 py-1.5 text-sm border border-[var(--color-line)] resize-none"
        />
      </Card>

      <Card title="Frase">
        <textarea
          value={draft.quote}
          onChange={(e) => setDraft({ ...draft, quote: e.target.value })}
          onBlur={() => save(draft)}
          placeholder="Tu frase del momento"
          rows={2}
          className="w-full px-2 py-1.5 text-sm italic border border-[var(--color-line)] resize-none"
        />
      </Card>
    </div>
  )
}
