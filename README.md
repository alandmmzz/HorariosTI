# Horarios TI

App para registrar semanalmente los horarios de clase del Tecnólogo en Informática (con sede en el Buceo), pensada para sumar más adelante login con Google/GitHub y soporte multiusuario.

## Funcionalidad actual

- Grilla semanal (lunes a viernes, con opción de mostrar fin de semana).
- Cada actividad guarda: nombre, tipo, día, horario, salón y profesor.
- Tipos de actividad: clase, laboratorio/práctica, habilidades blandas/idioma, trabajo, deporte/personal.
- Barra de "carga semanal" con el total de horas por categoría.
- Si Supabase no está configurado, los datos se guardan en el navegador (localStorage) para poder probar la app sin backend.

## Stack

- React + Vite
- Tailwind CSS v4
- Supabase (base de datos + futura autenticación)

## Setup local

```bash
npm install
cp .env.example .env
# completar VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY en .env
npm run dev
```

## Configurar Supabase

1. Crear un proyecto en https://supabase.com
2. Ir a **SQL Editor** y correr el contenido de `supabase/schema.sql`
3. Ir a **Project Settings > API** y copiar la `Project URL` y la `anon public key` al archivo `.env`

## Próximos pasos (multiusuario)

1. Activar proveedores de Google y GitHub en Supabase (**Authentication > Providers**)
2. Agregar pantalla de login con `supabase.auth.signInWithOAuth({ provider: 'google' })`
3. Hacer `user_id` obligatorio en la tabla `events` y filtrar las consultas por `auth.uid()`
4. Reemplazar la policy abierta del schema por policies basadas en `auth.uid() = user_id`
