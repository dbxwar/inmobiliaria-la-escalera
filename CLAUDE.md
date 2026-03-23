# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

No test framework is configured.

## Environment

Requires `.env.local` with:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Architecture

This is a **Next.js 16 App Router** real estate portal (Valencia, Spain) with two main areas:

### Public Frontend
- `/` — Homepage with hero, featured properties, CTA
- `/propiedades` — Property listing with filters (operation: venta/alquiler, type: piso/casa/chalet/ático/local/terreno)
- `/propiedad/[id]` — Property detail page with gallery, mortgage calculator, similar properties

### Protected Admin (`/admin`)
- Auth enforced by `middleware.ts` via Supabase session cookies
- `/admin` — Properties table with CRUD actions
- `/admin/nueva` — Create property form
- `/admin/editar/[id]` — Edit property form
- `/admin/login` — Login form

### Data Layer

All database operations are **Next.js Server Actions** in `lib/actions.ts` — there is no REST API (except `/api/logout`). Every mutating action calls `revalidatePath()` for cache invalidation.

Key server actions:
- `getPropiedades()`, `getPropiedadesFiltradas()`, `getPropiedadesDestacadas()`, `getPropiedadBySlug()`, `getPropiedadesSimilares()`
- `crearPropiedad(formData)` — auto-generates slug
- `actualizarPropiedad(id, formData)`
- `deletePropiedad(id)`
- `loginAdmin(formData)`

Two Supabase clients exist: `lib/supabase.ts` (browser) and `lib/supabase-server.ts` (server/SSR). Always use the server client in Server Actions and Server Components.

### Database

Schema is in `supabase-schema.sql`. Main table: `propiedades` (UUID PK, slug-based public URLs). RLS policies: public reads only `estado = 'activo'`; authenticated users have full access. Images stored in Supabase Storage bucket `propiedades`.

### Key Type

`Propiedad` type is defined in `lib/supabase.ts` and matches the `propiedades` table columns.

## Design System

- Colors: Navy `#1B2B4B`, Gold `#C9A84C`, Cream `#F5F0E8`
- Components: Shadcn/ui (new-york style) in `components/ui/` — 59 pre-built components
- Tailwind CSS 4 with PostCSS

## Notes

- `next.config.mjs` has `typescript.ignoreBuildErrors: true` and `images.unoptimized: true`
- Path alias `@/*` maps to the project root
- `components/admin/property-form.tsx` is the most complex component (~20KB) handling all property fields including image upload via react-dropzone
