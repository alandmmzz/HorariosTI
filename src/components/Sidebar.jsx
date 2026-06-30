import { AvatarCirclePlus } from 'pixelarticons/react/AvatarCirclePlus.js'
import { useAuth } from '../lib/AuthContext'
import { isSupabaseConfigured } from '../lib/supabaseClient'
import PersonalWidgets from './PersonalWidgets'

export default function Sidebar({ activeTab, onTabChange }) {
  const { user, signInWithGoogle, signOut } = useAuth() ?? {}
  const avatarUrl = user?.user_metadata?.avatar_url
  const name = user?.user_metadata?.full_name || user?.email || 'Invitado'

  return (
    <aside className="w-full md:w-72 shrink-0 space-y-3">
      <div className="pixel-panel bg-white p-5 flex flex-col items-center gap-2 text-center">
        <div className="relative">
          <div
            className="w-24 h-24 border-2 border-[var(--color-ink)] bg-[var(--color-cream-soft)] overflow-hidden flex items-center justify-center"
            style={{ clipPath: 'polygon(8% 0,92% 0,100% 8%,100% 92%,92% 100%,8% 100%,0 92%,0 8%)' }}
          >
            {avatarUrl ? (
              <img src={avatarUrl} alt={name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            ) : (
              <span className="font-[var(--font-display)] text-3xl text-[var(--color-ink-soft)]">?</span>
            )}
          </div>
          <button
            type="button"
            title="Cambiar foto (próximamente)"
            disabled
            className="absolute -bottom-1 -right-1 w-7 h-7 bg-[var(--color-ink)] text-white border-2 border-white flex items-center justify-center opacity-70 cursor-not-allowed"
          >
            <AvatarCirclePlus width={14} height={14} />
          </button>
        </div>

        <p className="font-[var(--font-display)] font-semibold text-base text-[var(--color-ink)] truncate max-w-full mt-1">
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

      <nav className="pixel-panel bg-white p-2 flex gap-2">
        {[
          { key: 'horario', label: 'Horario' },
          { key: 'carrera', label: 'Carrera' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className="flex-1 text-center px-3 py-2 text-sm font-medium transition-colors"
            style={{
              background: activeTab === tab.key ? 'var(--color-ink)' : 'transparent',
              color: activeTab === tab.key ? 'white' : 'var(--color-ink)',
            }}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <PersonalWidgets />
    </aside>
  )
}
