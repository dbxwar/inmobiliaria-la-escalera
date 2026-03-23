import { loginAdmin } from '@/lib/actions'

export default function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  return (
    <div className="min-h-screen bg-[#F5F0E8] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-[#1B2B4B] text-2xl font-semibold">La Escalera</h1>
          <p className="text-[#6B7280] text-sm mt-1">Panel de administración</p>
        </div>

        <form action={loginAdmin} className="bg-white p-8 shadow-sm space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#1B2B4B] mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full border border-[#DDD8CE] px-3 py-2 text-sm focus:outline-none focus:border-[#1B2B4B] transition-colors"
              placeholder="admin@ejemplo.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#1B2B4B] mb-1">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full border border-[#DDD8CE] px-3 py-2 text-sm focus:outline-none focus:border-[#1B2B4B] transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#1B2B4B] text-white py-2.5 text-sm font-medium hover:bg-[#1B2B4B]/90 transition-colors"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  )
}
