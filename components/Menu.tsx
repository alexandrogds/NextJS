'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import IconNotification from './IconNotification';
import { IoMdRefresh } from "react-icons/io";

const Menu = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModulesDropdownOpen, setIsModulesDropdownOpen] = useState(false);

  const isActive = (path: string) => {
    return pathname === path ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50';
  };

  const handleReload = () => {
    router.refresh();
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/dashboard" className="text-xl font-bold text-indigo-600">
                Sistema
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link href="/dashboard" className={`inline-flex items-center px-1 pt-1 border-b-2 ${isActive('/dashboard')} text-sm font-medium`}>
                Dashboard
              </Link>
              <div className="relative" onMouseEnter={() => setIsDropdownOpen(true)} onMouseLeave={() => setIsDropdownOpen(false)}>
                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className={`inline-flex items-center px-1 pt-1 border-b-2 ${pathname.includes('/systems') ? 'border-indigo-500' : 'border-transparent'} text-gray-600 hover:bg-gray-50 text-sm font-medium`}>
                  Sistemas
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isDropdownOpen && (
                  <div className="absolute z-10 left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      <Link href="/systems/list" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Listar Sistemas
                      </Link>
                      <Link href="/systems/create" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Novo Sistema
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              <div className="relative" onMouseEnter={() => setIsModulesDropdownOpen(true)} onMouseLeave={() => setIsModulesDropdownOpen(false)}>
                <button onClick={() => setIsModulesDropdownOpen(!isModulesDropdownOpen)} className={`inline-flex items-center px-1 pt-1 border-b-2 ${pathname.includes('/modules') ? 'border-indigo-500' : 'border-transparent'} text-gray-600 hover:bg-gray-50 text-sm font-medium`}>
                  Módulos
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isModulesDropdownOpen && (
                  <div className="absolute z-10 left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      <Link href="/modules/list" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Listar Módulos
                      </Link>
                      <Link href="/modules/create" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Novo Módulo
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <button onClick={handleReload} className="p-2 text-gray-600 hover:text-gray-800 focus:outline-none">
              <IoMdRefresh className="w-6 h-6" />
            </button>
            <IconNotification />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Menu;
export { IconNotification };
