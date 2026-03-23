'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from './supabase-server'
import { Propiedad } from './supabase'

function generateSlug(titulo: string, municipio: string): string {
  const base = `${titulo} ${municipio}`
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
  return `${base}-${Date.now()}`
}

export async function getPropiedades() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('propiedades')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data as Propiedad[]
}

export async function getPropiedadesFiltradas(operacion?: string, tipo?: string) {
  const supabase = await createClient()
  let query = supabase
    .from('propiedades')
    .select('*')
    .eq('estado', 'activo')
    .order('created_at', { ascending: false })

  if (operacion) query = query.eq('operacion', operacion)
  if (tipo) query = query.eq('tipo', tipo)

  const { data, error } = await query
  if (error) throw error
  return data as Propiedad[]
}

export async function getPropiedadesDestacadas() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('propiedades')
    .select('*')
    .eq('estado', 'activo')
    .eq('destacado', true)
    .order('created_at', { ascending: false })
    .limit(4)
  if (error) throw error
  return data as Propiedad[]
}

export async function getPropiedadBySlug(slug: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('propiedades')
    .select('*')
    .eq('slug', slug)
    .single()
  if (error) return null
  return data as Propiedad
}

export async function getPropiedadesSimilares(tipo: string, municipio: string, excludeSlug: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('propiedades')
    .select('*')
    .eq('estado', 'activo')
    .or(`tipo.eq.${tipo},municipio.eq.${municipio}`)
    .neq('slug', excludeSlug)
    .limit(3)
  if (error) return []
  return data as Propiedad[]
}

export async function crearPropiedad(formData: FormData) {
  const supabase = await createClient()

  const titulo = formData.get('titulo') as string
  const municipio = formData.get('municipio') as string
  const caracteristicas = formData.getAll('caracteristicas') as string[]

  const antiguedadRaw = formData.get('antiguedad') as string
  const terraza_m2Raw = formData.get('terraza_m2') as string
  const jardin_m2Raw = formData.get('jardin_m2') as string

  const propiedad = {
    titulo,
    descripcion: formData.get('descripcion') as string,
    precio: Number(formData.get('precio')),
    tipo: formData.get('tipo') as string,
    operacion: formData.get('operacion') as string,
    municipio,
    direccion: formData.get('direccion') as string,
    metros_cuadrados: Number(formData.get('metros_cuadrados')),
    habitaciones: Number(formData.get('habitaciones')),
    banos: Number(formData.get('banos')),
    planta: formData.get('planta') as string,
    caracteristicas,
    imagenes: JSON.parse(formData.get('imagenes') as string || '[]'),
    estado: formData.get('estado') as string || 'activo',
    destacado: formData.get('destacado') === 'true',
    slug: generateSlug(titulo, municipio),
    certificado_energetico: (formData.get('certificado_energetico') as string) || null,
    garaje: (formData.get('garaje') as string) || null,
    antiguedad: antiguedadRaw ? Number(antiguedadRaw) : null,
    terraza_m2: terraza_m2Raw ? Number(terraza_m2Raw) : null,
    jardin_m2: jardin_m2Raw ? Number(jardin_m2Raw) : null,
    trastero: formData.get('trastero') === 'true',
    ascensor: formData.get('ascensor') === 'true',
    piscina: formData.get('piscina') === 'true',
    orientacion: (formData.get('orientacion') as string) || null,
  }

  const { error } = await supabase.from('propiedades').insert(propiedad)
  if (error) throw error

  revalidatePath('/admin')
  revalidatePath('/')
  redirect('/admin')
}

export async function actualizarPropiedad(id: string, formData: FormData) {
  const supabase = await createClient()

  const titulo = formData.get('titulo') as string
  const municipio = formData.get('municipio') as string
  const caracteristicas = formData.getAll('caracteristicas') as string[]

  const antiguedadRaw = formData.get('antiguedad') as string
  const terraza_m2Raw = formData.get('terraza_m2') as string
  const jardin_m2Raw = formData.get('jardin_m2') as string

  const propiedad = {
    titulo,
    descripcion: formData.get('descripcion') as string,
    precio: Number(formData.get('precio')),
    tipo: formData.get('tipo') as string,
    operacion: formData.get('operacion') as string,
    municipio,
    direccion: formData.get('direccion') as string,
    metros_cuadrados: Number(formData.get('metros_cuadrados')),
    habitaciones: Number(formData.get('habitaciones')),
    banos: Number(formData.get('banos')),
    planta: formData.get('planta') as string,
    caracteristicas,
    imagenes: JSON.parse(formData.get('imagenes') as string || '[]'),
    estado: formData.get('estado') as string,
    destacado: formData.get('destacado') === 'true',
    certificado_energetico: (formData.get('certificado_energetico') as string) || null,
    garaje: (formData.get('garaje') as string) || null,
    antiguedad: antiguedadRaw ? Number(antiguedadRaw) : null,
    terraza_m2: terraza_m2Raw ? Number(terraza_m2Raw) : null,
    jardin_m2: jardin_m2Raw ? Number(jardin_m2Raw) : null,
    trastero: formData.get('trastero') === 'true',
    ascensor: formData.get('ascensor') === 'true',
    piscina: formData.get('piscina') === 'true',
    orientacion: (formData.get('orientacion') as string) || null,
  }

  const { error } = await supabase.from('propiedades').update(propiedad).eq('id', id)
  if (error) throw error

  revalidatePath('/admin')
  revalidatePath('/')
  redirect('/admin')
}

export async function eliminarPropiedad(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('propiedades').delete().eq('id', id)
  if (error) throw error
  revalidatePath('/admin')
  revalidatePath('/')
}

export async function loginAdmin(formData: FormData) {
  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  })
  if (error) redirect('/admin/login?error=1')
  redirect('/admin')
}

export async function logoutAdmin() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/admin/login')
}

export async function uploadImagen(file: File): Promise<string> {
  const supabase = await createClient()
  const ext = file.name.split('.').pop()
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

  const { error } = await supabase.storage
    .from('propiedades')
    .upload(filename, file)

  if (error) throw error

  const { data } = supabase.storage.from('propiedades').getPublicUrl(filename)
  return data.publicUrl
}
