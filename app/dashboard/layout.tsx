'use client'
import { PropsWithChildren, useState } from 'react'

const DashboardLayout = ({ children }: PropsWithChildren) => {
  const [isSystemOpen, setIsSystemOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h2 className="text-xl font-bold">Sales CRM</h2>
        </div>
        <nav className="mt-4">
          <a href="/dashboard" className="block p-4 hover:bg-gray-50">
            Dashboard
          </a>
          <a href="/dashboard/team" className="block p-4 hover:bg-gray-50">
            Team Performance
          </a>
          
          {/* Sistema Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setIsSystemOpen(!isSystemOpen)}
              className="w-full text-left p-4 hover:bg-gray-50 flex items-center justify-between"
            >
              Sistema
              <span className={`transform transition-transform ${isSystemOpen ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>
            
            {isSystemOpen && (
              <div className="bg-white ml-4 border-l">
                <a href="/systems/create" className="block p-4 pl-8 hover:bg-gray-50 text-sm">
                  Criar
                </a>
                <a href="/systems/list" className="block p-4 pl-8 hover:bg-gray-50 text-sm">
                  Listar
                </a>
              </div>
            )}
          </div>
        </nav>
      </aside>
      
      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>
    </div>
  )
}

export default DashboardLayout
