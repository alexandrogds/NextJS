'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

interface Field {
  name: string;
  type: string;
}

interface Module {
  id?: string;
  name: string;
  description: string;
  fields: Field[];
}

const mockModule: Module = {
  id: '1',
  name: 'Gestão de Usuários',
  description: 'Módulo para gestão de usuários do sistema',
  fields: [{ name: 'Nome', type: 'text' }],
};

export default function ModuleForm() {
  const params = useParams();
  const [formData, setFormData] = useState<Module>({
    name: '',
    description: '',
    fields: [{ name: '', type: 'text' }]
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (params.module) {
      // Fetch module data based on params.id
      setFormData(mockModule); // Replace with actual data fetching logic
    }
  }, [params.module]);

  const addField = () => {
    setFormData(prev => ({
      ...prev,
      fields: [...prev.fields, { name: '', type: 'text' }]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome do módulo é obrigatório';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      // API call would go here
      console.log('Form submitted:', formData);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <header className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Editar Módulo</h1>
      </header>

      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 space-y-6 bg-white rounded-lg shadow-sm">
        <div className="space-y-4">
          <label className="block">
            <span className="text-gray-700">Nome do Módulo</span>
            <input
              type="text"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
          </label>

          <textarea
            placeholder="Descrição do Módulo (opcional)"
            value={formData.description}
            onChange={e => setFormData({ ...formData, description: e.target.value })}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />

          <div className="space-y-2">
            <h4 className="font-medium">Campos</h4>
            {formData.fields.map((field, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Nome do Campo"
                  value={field.name}
                  onChange={e => {
                    const newFields = [...formData.fields];
                    newFields[index].name = e.target.value;
                    setFormData({ ...formData, fields: newFields });
                  }}
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                <select
                  value={field.type}
                  onChange={e => {
                    const newFields = [...formData.fields];
                    newFields[index].type = e.target.value;
                    setFormData({ ...formData, fields: newFields });
                  }}
                  className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                  <option value="text">Texto</option>
                  <option value="number">Número</option>
                  <option value="date">Data</option>
                </select>
              </div>
            ))}
            <button
              type="button"
              onClick={addField}
              className="text-sm text-indigo-600 hover:text-indigo-800"
            >
              + Adicionar Campo
            </button>
          </div>

          <button
            type="submit"
            className="w-full p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Salvar Módulo
          </button>
        </div>
      </form>
    </div>
  );
}
