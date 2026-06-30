import { useAuth } from '../lib/AuthContext'
import { isSupabaseConfigured } from '../lib/supabaseClient'

export default function Sidebar({ activeTab, onTabChange }) {
  const { user, signInWithGoogle, signOut } = useAuth() ?? {}
  const avatarUrl = user?.user_metadata?.avatar_url
  const name = user?.user_metadata?.full_name || user?.email || 'Invitado'

  return (
    <aside className="w-full md:w-60 shrink-0 flex md:flex-col gap-4 md:gap-6">
      <div className="pixel-panel bg-white p-4 flex md:flex-col items-center gap-3 md:gap-2 text-center flex-1 md:flex-none">
        <div
          className="w-14 h-14 md:w-20 md:h-20 border-2 border-[var(--color-ink)] bg-[var(--color-cream-soft)] overflow-hidden shrink-0 flex items-center justify-center"
          style={{ clipPath: 'polygon(8% 0,92% 0,100% 8%,100% 92%,92% 100%,8% 100%,0 92%,0 8%)' }}
        >
          {avatarUrl ? (
            <img src={avatarUrl} alt={name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          ) : (
            <span className="font-[var(--font-display)] text-xl text-[var(--color-ink-soft)]">?</span>
          )}
        </div>

        <div className="flex-1 md:flex-none min-w-0">
          <p className="font-[var(--font-display)] font-semibold text-sm text-[var(--color-ink)] truncate">
            {name}
          </p>
          {user ? (
            <button
              onClick={signOut}
              className="text-[11px] text-[var(--color-ink-soft)] underline hover:text-[var(--color-lab)]"
            >
              Cerrar sesión
            </button>
          ) : (
            <button
              onClick={signInWithGoogle}
              disabled={!isSupabaseConfigured}
              className="text-[11px] font-medium underline text-[var(--color-trabajo)] hover:text-[var(--color-ink)] disabled:opacity-50 disabled:no-underline"
            >
              Conectar con Google
            </button>
          )}
        </div>
      </div>

      <nav className="pixel-panel bg-white p-2 flex md:flex-col gap-2">
        {[
          { key: 'horario', label: 'Horario' },
          { key: 'carrera', label: 'Carrera' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className="flex-1 md:flex-none text-left px-3 py-2 text-sm font-medium transition-colors"
            style={{
              background: activeTab === tab.key ? 'var(--color-ink)' : 'transparent',
              color: activeTab === tab.key ? 'white' : 'var(--color-ink)',
            }}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </aside>
  )
}
