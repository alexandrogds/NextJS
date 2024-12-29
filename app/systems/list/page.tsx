'use client';

import Menu from '@components/Menu';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const systems = [
  {
    id: '1',
    name: 'Sistema Nativo 1',
    type: 'CRM',
    installDate: '2021-01-01',
    version: '1.0.0',
    developer: 'Desenvolvedor A',
    description: 'Descrição curta do Sistema Nativo 1',
    features: 'Funcionalidade 1, Funcionalidade 2',
    implementationDate: '2021-02-01',
    supportContact: 'support@example.com'
  },
  {
    id: '2',
    name: 'Add-on 1',
    type: 'Add-on',
    installDate: '2021-03-01',
    version: '1.2.0',
    developer: 'Desenvolvedor B',
    description: 'Descrição curta do Add-on 1',
    features: 'Funcionalidade A, Funcionalidade B',
    implementationDate: '2021-04-01',
    supportContact: 'support@example.com'
  }
];

const SystemsListPage = () => {
  const router = useRouter();
  const [filter, setFilter] = useState('all');

  const filteredSystems = systems.filter((system) => {
    if (filter === 'all') return true;
    if (filter === 'crm') return system.type === 'CRM';
    if (filter === 'addon') return system.type === 'Add-on';
    return true;
  });

  return (
    <>
      <Menu />
      <div className="container mx-auto p-4 pt-16">
        <h1 className="text-3xl font-bold mb-6">Sistemas do CRM</h1>
        <nav className="mb-6">
          <ul className="flex space-x-4">
            <li>
              <button onClick={() => router.push('/dashboard')} className="py-2 px-4 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors">
                Dashboard
              </button>
            </li>
            <li>
              <button className={`py-2 px-4 rounded ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`} onClick={() => setFilter('all')}>
                Todos os Sistemas
              </button>
            </li>
            <li>
              <button className={`py-2 px-4 rounded ${filter === 'crm' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`} onClick={() => setFilter('crm')}>
                Sistemas CRM
              </button>
            </li>
            <li>
              <button className={`py-2 px-4 rounded ${filter === 'addon' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`} onClick={() => setFilter('addon')}>
                Add-ons
              </button>
            </li>
          </ul>
        </nav>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSystems.map((system, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => router.push(`/systems/${system.id}`)}>
              <h2 className="text-2xl font-semibold mb-2">{system.name}</h2>
              <p className="text-gray-600 mb-2">
                <strong>Tipo:</strong> {system.type}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Data de Instalação:</strong> {system.installDate}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Versão:</strong> {system.version}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Desenvolvedor:</strong> {system.developer}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Descrição:</strong> {system.description}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Funcionalidades:</strong> {system.features}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Data de Implementação:</strong> {system.implementationDate}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Contato para Suporte:</strong> {system.supportContact}
              </p>
              <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors">
                Saber Mais
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SystemsListPage;
