-- Ejecutar esto en Supabase: Project > SQL Editor > New query

create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete cascade, -- se usa cuando agreguemos login
  title text not null,
  type text not null check (type in ('clase', 'laboratorio', 'blanda', 'trabajo', 'deporte')),
  day_of_week text not null check (day_of_week in ('mon','tue','wed','thu','fri','sat','sun')),
  start_time time not null,
  end_time time not null,
  location text,
  professor text,
  created_at timestamptz default now()
);

-- Por ahora (sin login) dejamos la tabla abierta de lectura/escritura con la anon key.
-- Cuando sumemos autenticación, vamos a:
--   1. Hacer user_id not null
--   2. Activar RLS y agregar policies por auth.uid() = user_id
alter table events enable row level security;

create policy "Acceso abierto temporal (sin login)"
  on events for all
  using (true)
  with check (true);
