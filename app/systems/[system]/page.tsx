'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface SystemData {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive' | 'maintenance';
  metrics: {
    users: number;
    requests: number;
    uptime: number;
  };
  modules: {
    id: string;
    name: string;
    status: string;
  }[];
}

const mockData: SystemData = {
  id: '1',
  name: 'Sistema de Produção',
  description: 'Sistema principal de gerenciamento de produção',
  status: 'active',
  metrics: {
    users: 1234,
    requests: 45678,
    uptime: 99.9,
  },
  modules: [
    { id: '1', name: 'Gestão de Usuários', status: 'active' },
    { id: '2', name: 'Relatórios', status: 'active' },
    { id: '3', name: 'Configurações', status: 'maintenance' },
  ],
};

export default function SystemDashboard() {
  const params = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const chartData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [
      {
        label: 'Requisições',
        data: [65, 59, 80, 81, 56, 55],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const filteredModules = mockData.modules.filter(module =>
    module.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <header className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{mockData.name}</h1>
            <p className="text-gray-600 mt-1">{mockData.description}</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => window.location.href = `/systems/form?page=${params.id}`}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Editar Sistema
            </button>
            <div
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button className="border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                Modulos
                {dropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg"
                  
                >
                  <a
                    href={`/systems/${params.system}/modules`}
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Listar
                  </a>
                  <a
                    href={`/systems/${params.system}/modules/new`}
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Criar
                  </a>
                </div>
              )}
              </button>
             
            </div>
            <button className="border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors">
              Configurações
            </button>
          </div>
        </div>
      </header>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Metrics Cards */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Métricas</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Usuários Ativos</span>
              <span className="font-semibold">{mockData.metrics.users}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Requisições</span>
              <span className="font-semibold">{mockData.metrics.requests}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Uptime</span>
              <span className="font-semibold">{mockData.metrics.uptime}%</span>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6 md:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Desempenho</h2>
          <div className="h-64">
            <Line data={chartData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>

        {/* Modules List */}
        <div className="bg-white rounded-lg shadow-sm p-6 md:col-span-3">
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
              <div
                key={module.id}
                className="py-3 flex justify-between items-center"
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
