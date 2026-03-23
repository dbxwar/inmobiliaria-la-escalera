import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Propiedad = {
  id: string
  titulo: string
  descripcion: string
  precio: number
  tipo: 'piso' | 'casa' | 'local' | 'terreno' | 'atico' | 'chalet'
  operacion: 'venta' | 'alquiler'
  municipio: string
  direccion: string
  metros_cuadrados: number
  habitaciones: number
  banos: number
  planta?: string
  caracteristicas: string[]
  imagenes: string[]
  estado: 'activo' | 'vendido' | 'alquilado' | 'reservado'
  destacado: boolean
  slug: string
  created_at: string
  updated_at: string
  // Campos estructurados adicionales
  certificado_energetico?: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'En trámite' | 'Exento'
  garaje?: 'Incluido' | 'Opcional' | 'No incluye'
  antiguedad?: number
  terraza_m2?: number
  jardin_m2?: number
  trastero?: boolean
  ascensor?: boolean
  piscina?: boolean
  orientacion?: 'Norte' | 'Sur' | 'Este' | 'Oeste' | 'Noreste' | 'Noroeste' | 'Sureste' | 'Suroeste'
}
