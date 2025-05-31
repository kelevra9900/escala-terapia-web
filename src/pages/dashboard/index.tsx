import {useState,useEffect} from 'react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';

import {Input} from '@/components/atoms';
import {usePaginatedUsers} from '@/data/user';

const menu = [
	{label: 'Usuarios',href: '/dashboard'},
	{label: 'Suscripciones',href: '/admin/subscriptions'},
	{label: 'Formularios',href: '/admin/forms'},
	{label: 'Configuración',href: '/admin/settings'},
];

const AdminDashboard = () => {
	const pathname = usePathname();

	const [page,setPage] = useState(1);
	const [search,setSearch] = useState('');
	const [debouncedSearch,setDebouncedSearch] = useState(search);

	const {data,isLoading} = usePaginatedUsers({
		page,
		limit: 10,
		search: debouncedSearch,
	});


	// ✅ Este useEffect aplica el debounce
	useEffect(() => {
		const timeout = setTimeout(() => {
			setDebouncedSearch(search);
			setPage(1); // Reinicia a la primera página cuando cambia la búsqueda
		},500); // 500ms de espera

		return () => clearTimeout(timeout);
	},[search]);

	console.log('Admin Dashboard Data:',data);


	return (
		<div className="min-h-screen flex flex-col md:flex-row bg-white dark:bg-neutral-900">
			{/* Aside */}
			<aside className="w-full md:w-64 px-4 py-6 md:px-6 md:py-8 border-b md:border-b-0 md:border-r border-neutral-200 dark:border-neutral-700">
				<h2 className="text-lg font-semibold text-neutral-700 dark:text-neutral-200 mb-8">Panel de Admin</h2>
				<nav className="space-y-4">
					{menu.map((item) => {
						const isActive = pathname === item.href;
						return (
							<Link
								key={item.href}
								href={item.href}
								className={`block px-3 py-2 rounded-md text-sm ${isActive
									? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-blue-100'
									: 'text-neutral-700 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-700'
									}`}
							>
								{item.label}
							</Link>
						);
					})}
				</nav>
			</aside>

			{/* Main content */}
			<main className="flex-1 px-4 py-6 md:px-8 md:py-10">
				<div className="overflow-x-auto rounded-lg border border-neutral-200 dark:border-neutral-700">
					<div className="mb-4 flex justify-between items-center px-2">
						<Input
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							placeholder="Buscar por nombre o correo"
							className="mt-2 w-full max-w-sm rounded border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-sm text-neutral-800 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>
					<table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-700">
						<thead className="bg-neutral-100 dark:bg-neutral-800">
							<tr>
								<th className="px-6 py-3 text-left text-xs font-medium text-neutral-600 dark:text-neutral-300 uppercase tracking-wider">Nombre</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-neutral-600 dark:text-neutral-300 uppercase tracking-wider">Correo</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-neutral-600 dark:text-neutral-300 uppercase tracking-wider">Rol</th>
								<th className="px-6 py-3"></th>
							</tr>
						</thead>
						<tbody className="bg-white dark:bg-neutral-900 divide-y divide-neutral-200 dark:divide-neutral-700">
							{isLoading ? (
								<tr>
									<td colSpan={4} className="px-6 py-4 text-center text-neutral-500">
										Cargando usuarios...
									</td>
								</tr>
							) : (
								data?.data?.map((user) => (
									<tr key={user.id}>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-800 dark:text-neutral-100">{user.name}</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600 dark:text-neutral-300">{user.email}</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm">
											<span className="inline-flex items-center rounded-full bg-neutral-200 dark:bg-neutral-700 px-2.5 py-0.5 text-xs font-medium text-neutral-800 dark:text-neutral-200">
												{user.role}
											</span>
										</td>
										<td className="px-6 py-4 text-right text-sm">
											<button className="text-blue-600 hover:underline">Ver</button>
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
					{data && (
						<div className="flex items-center justify-between px-4 py-4">
							<span className="text-sm text-neutral-600 dark:text-neutral-300">
								Página {page} de {data.meta.totalPages}
							</span>
							<div className="flex gap-2">
								<button
									onClick={() => setPage((p) => Math.max(p - 1,1))}
									disabled={page === 1}
									className="px-4 py-2 text-sm border rounded disabled:opacity-50"
								>
									Anterior
								</button>
								<button
									onClick={() => setPage((p) => p + 1)}
									disabled={page >= data.meta.totalPages}
									className="px-4 py-2 text-sm border rounded disabled:opacity-50"
								>
									Siguiente
								</button>
							</div>
						</div>
					)}

				</div>
			</main>
		</div>
	);
};

export default AdminDashboard;
