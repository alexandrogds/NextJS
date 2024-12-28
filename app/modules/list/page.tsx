'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';

interface Module {
  id: string;
  name: string;
  status: string;
}

const mockModules: Module[] = [
  { id: '1', name: 'Gestão de Usuários', status: 'active' },
  { id: '2', name: 'Relatórios', status: 'active' },
  { id: '3', name: 'Configurações', status: 'maintenance' },
];

export default function ModulesList() {
  const params = useParams();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredModules = mockModules.filter(module =>
    module.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <header className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Módulos do Sistema</h1>
      </header>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Módulos</h2>
          <input
            type="text"
            placeholder="Buscar módulos..."
            className="border rounded-md px-3 py-1"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="divide-y">
          {filteredModules.map((module) => (
            <a
              key={module.id}
              href={`/systems/${params.system}/modules/${module.id}`}
              className="block py-3 flex justify-between items-center hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium">{module.name}</span>
              <span
                className={`px-2 py-1 rounded-full text-sm ${
                  module.status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {module.status}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
