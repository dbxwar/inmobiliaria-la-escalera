-- Tabla de propiedades
create table propiedades (
  id uuid default gen_random_uuid() primary key,
  titulo text not null,
  descripcion text,
  precio numeric not null,
  tipo text not null check (tipo in ('piso', 'casa', 'local', 'terreno', 'atico', 'chalet')),
  operacion text not null check (operacion in ('venta', 'alquiler')),
  municipio text not null,
  direccion text,
  metros_cuadrados numeric,
  habitaciones integer,
  banos integer,
  planta text,
  caracteristicas text[] default '{}',
  imagenes text[] default '{}',
  estado text not null default 'activo' check (estado in ('activo', 'vendido', 'alquilado', 'reservado')),
  destacado boolean default false,
  slug text unique,
  created_at timestamp with time zone default timezone('utc', now()),
  updated_at timestamp with time zone default timezone('utc', now())
);

-- Actualizar updated_at automáticamente
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$ language plpgsql;

create trigger propiedades_updated_at
  before update on propiedades
  for each row execute function update_updated_at();

-- Políticas de seguridad (RLS)
alter table propiedades enable row level security;

-- Lectura pública solo para propiedades activas
create policy "Propiedades activas visibles públicamente"
  on propiedades for select
  using (estado = 'activo');

-- Solo usuarios autenticados pueden hacer CRUD completo
create policy "Admin puede leer todo"
  on propiedades for select
  to authenticated
  using (true);

create policy "Admin puede insertar"
  on propiedades for insert
  to authenticated
  with check (true);

create policy "Admin puede actualizar"
  on propiedades for update
  to authenticated
  using (true);

create policy "Admin puede eliminar"
  on propiedades for delete
  to authenticated
  using (true);

-- Storage bucket para imágenes
insert into storage.buckets (id, name, public)
values ('propiedades', 'propiedades', true);

-- Política de storage: lectura pública
create policy "Imágenes públicas"
  on storage.objects for select
  using (bucket_id = 'propiedades');

-- Política de storage: solo admin puede subir/borrar
create policy "Admin puede subir imágenes"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'propiedades');

create policy "Admin puede eliminar imágenes"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'propiedades');
