'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

interface Field {
  name: string;
  type: string;
}

interface Module {
  name: string;
  description: string;
  fields: Field[];
}

interface SystemForm {
  id?: string;
  name: string;
  modules: Module[];
}

const mockData: SystemForm = {
  id: '1',
  name: 'Sistema de Produção',
  modules: [
    { name: 'Gestão de Usuários', description: '', fields: [{ name: 'Nome', type: 'text' }] },
    { name: 'Relatórios', description: '', fields: [{ name: 'Data', type: 'date' }] },
  ],
};

export default function SystemFormPage() {
  const searchParams = useSearchParams();
  const systemId = searchParams.get('page');
  const [formData, setFormData] = useState<SystemForm>({
    name: '',
    modules: [{ name: '', description: '', fields: [{ name: '', type: 'text' }] }]
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (systemId) {
      // Fetch system data based on systemId
      setFormData(mockData); // Replace with actual data fetching logic
    }
  }, [systemId]);

  const addModule = () => {
    setFormData(prev => ({
      ...prev,
      modules: [...prev.modules, { name: '', description: '', fields: [{ name: '', type: 'text' }] }]
    }));
  };

  const removeModule = (moduleIndex: number) => {
    setFormData(prev => ({
      ...prev,
      modules: prev.modules.filter((_, index) => index !== moduleIndex)
    }));
  };

  const addField = (moduleIndex: number) => {
    setFormData(prev => ({
      ...prev,
      modules: prev.modules.map((module, index) => {
        if (index === moduleIndex) {
          return {
            ...module,
            fields: [...module.fields, { name: '', type: 'text' }]
          };
        }
        return module;
      })
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome do sistema é obrigatório';
    }

    formData.modules.forEach((module, index) => {
      if (!module.name.trim()) {
        newErrors[`module${index}`] = 'Nome do módulo é obrigatório';
      }
    });

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
    <>
      <div className="pt-16">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 space-y-6">
          <div className="space-y-4">
            <label className="block">
              <span className="text-gray-700">Nome do Sistema</span>
              <input
                type="text"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
            </label>

            {formData.modules.map((module, moduleIndex) => (
              <div key={moduleIndex} className="border p-4 rounded-lg space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Módulo {moduleIndex + 1}</h3>
                  <button
                    type="button"
                    onClick={() => removeModule(moduleIndex)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remover Módulo
                  </button>
                </div>

                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Nome do Módulo"
                    value={module.name}
                    onChange={e => {
                      const newModules = [...formData.modules];
                      newModules[moduleIndex].name = e.target.value;
                      setFormData({ ...formData, modules: newModules });
                    }}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  {errors[`module${moduleIndex}`] && (
                    <span className="text-red-500 text-sm">{errors[`module${moduleIndex}`]}</span>
                  )}

                  <textarea
                    placeholder="Descrição do Módulo (opcional)"
                    value={module.description}
                    onChange={e => {
                      const newModules = [...formData.modules];
                      newModules[moduleIndex].description = e.target.value;
                      setFormData({ ...formData, modules: newModules });
                    }}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />

                  <div className="space-y-2">
                    <h4 className="font-medium">Campos</h4>
                    {module.fields.map((field, fieldIndex) => (
                      <div key={fieldIndex} className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Nome do Campo"
                          value={field.name}
                          onChange={e => {
                            const newModules = [...formData.modules];
                            newModules[moduleIndex].fields[fieldIndex].name = e.target.value;
                            setFormData({ ...formData, modules: newModules });
                          }}
                          className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                        <select
                          value={field.type}
                          onChange={e => {
                            const newModules = [...formData.modules];
                            newModules[moduleIndex].fields[fieldIndex].type = e.target.value;
                            setFormData({ ...formData, modules: newModules });
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
                      onClick={() => addField(moduleIndex)}
                      className="text-sm text-indigo-600 hover:text-indigo-800"
                    >
                      + Adicionar Campo
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addModule}
              className="w-full p-2 bg-indigo-100 text-indigo-600 rounded-md hover:bg-indigo-200"
            >
              + Adicionar Módulo
            </button>

            <button
              type="submit"
              className="w-full p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Salvar Sistema
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
