import { Menu, IconNotification } from '@components/Menu'

export default function FormLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
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
				  <Link
					href="/dashboard"
					className={`inline-flex items-center px-1 pt-1 border-b-2 
					  ${isActive('/dashboard') ? 'border-indigo-500' : 'border-transparent'}
					  ${isActive('/dashboard')} text-sm font-medium`}
				  >
					Dashboard
				  </Link>
				  
				  <Link
					href="/systems/list"
					className={`inline-flex items-center px-1 pt-1 border-b-2 
					  ${isActive('/systems/list') ? 'border-indigo-500' : 'border-transparent'}
					  ${isActive('/systems/list')} text-sm font-medium`}
				  >
					Listar Sistemas
				  </Link>
				</div>
			  </div>
			  <IconNotification />
			</div>
		  </div>
		</nav>
        <div className="min-h-screen bg-gray-50 pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </div>
    </>
  )
}
