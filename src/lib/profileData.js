import { useEffect, useState, useCallback } from 'react'
import { useAuth } from './AuthContext'
import { supabase, isSupabaseConfigured } from './supabaseClient'

const LOCAL_KEY = 'horarios-ti-profile-widgets'

const DEFAULT_DATA = {
  about: ['Estudiante de Tecnólogo en Informática', 'Del Buceo'],
  goals: [
    { id: 'g1', label: 'Avanzar con la carrera', done: false },
    { id: 'g2', label: 'Cuidar mi salud mental', done: false },
    { id: 'g3', label: 'Disfrutar los pequeños momentos', done: false },
  ],
  goalsDate: '',
  song: { title: '', artist: '' },
  notes: '',
  quote: '',
}

function loadLocal() {
  try {
    return { ...DEFAULT_DATA, ...JSON.parse(localStorage.getItem(LOCAL_KEY)) }
  } catch {
    return DEFAULT_DATA
  }
}

function todayKey() {
  return new Date().toISOString().slice(0, 10)
}

export function useProfileData() {
  const { user } = useAuth() ?? {}
  const cloudReady = isSupabaseConfigured && Boolean(user)
  const [data, setData] = useState(DEFAULT_DATA)
  const [loading, setLoading] = useState(true)

  const fetchData = useCallback(async () => {
    setLoading(true)
    let next = DEFAULT_DATA
    if (cloudReady) {
      const { data: row } = await supabase
        .from('profile_widgets')
        .select('data')
        .eq('user_id', user.id)
        .maybeSingle()
      next = row?.data ? { ...DEFAULT_DATA, ...row.data } : DEFAULT_DATA
    } else {
      next = loadLocal()
    }
    // Reinicia las metas diarias si cambió el día.
    if (next.goalsDate !== todayKey()) {
      next = { ...next, goalsDate: todayKey(), goals: next.goals.map((g) => ({ ...g, done: false })) }
    }
    setData(next)
    setLoading(false)
  }, [cloudReady, user])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  async function save(next) {
    setData(next)
    if (cloudReady) {
      await supabase.from('profile_widgets').upsert({ user_id: user.id, data: next })
    } else {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(next))
    }
  }

  return { data, loading, save }
}
