'use client'

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h2 className="text-2xl font-bold text-slate-800 mb-4">
        Algo deu errado!
      </h2>
      <p className="text-slate-600 mb-6">
        {error.message || 'Ocorreu um erro inesperado.'}
      </p>
      <button
        onClick={() => reset()}
        className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
      >
        Tentar novamente
      </button>
      {error.digest && (
        <p className="mt-4 text-sm text-slate-400">
          Código do erro: {error.digest}
        </p>
      )}
    </div>
  )
}
