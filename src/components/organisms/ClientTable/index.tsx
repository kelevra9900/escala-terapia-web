import {Table} from "@/components/atoms/Table";
import Pagination from "@/components/molecules/Pagination";
import {Client,Meta} from "@/types";
import {EyeIcon,TrashIcon,ClipboardDocumentListIcon} from '@heroicons/react/24/outline';

type Props = {
	clients: Client[];
	meta: Meta;
	onClientClick: (clientId: string) => void;
	onClientDelete: (clientId: string) => void;
	onAssignForm?: (client: Client) => void;
	onPagination: (page: number,pageSize?: number) => void;
}
const ClientTable = ({
	clients = [],
	meta = {totalCount: 0,totalPages: 0,currentPage: 1,pageSize: 10},
	onClientClick = () => { },
	onClientDelete = () => { },
	onAssignForm = () => { },
	onPagination = () => { }
}: Props) => {

	const columns = [
		{
			title: 'Nombre',
			dataIndex: 'name',
			key: 'name',
			width: 180,
			render: (name: string,record: Client) => (
				<div className="flex flex-col whitespace-nowrap font-medium">
					<span>{name}</span>
					<span className="text-[13px] font-normal text-gray-500/80">{record.email}</span>
				</div>
			),
		},
		{
			title: 'Fecha de nacimiento',
			dataIndex: 'birthday',
			key: 'birthday',
			width: 140,
			align: 'center' as const,
			render: (birthday?: string) =>
				birthday ? new Date(birthday).toLocaleDateString() : '—',
		},
		{
			title: 'Género',
			dataIndex: 'gender',
			key: 'gender',
			width: 100,
			align: 'center' as const,
			render: (gender?: string) => gender ?? '—',
		},
		{
			title: 'Registrado',
			dataIndex: 'created_at',
			key: 'created_at',
			width: 140,
			align: 'center' as const,
			render: (created_at: string) =>
				new Date(created_at).toLocaleDateString(),
		},
		{
			title: 'Acciones',
			key: 'actions',
			width: 220,
			align: 'center' as const,
			render: (_: string,record: Client) => (
				<div className="flex justify-center gap-3">
					<button
						onClick={() => onClientClick(record.id)}
						className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800"
						aria-label="Ver paciente"
					>
						<EyeIcon className="w-4 h-4" />
						<span>Ver</span>
					</button>
					<button
						onClick={() => onAssignForm(record)}
						className="inline-flex items-center gap-1 text-emerald-600 hover:text-emerald-800"
						aria-label="Asignar formulario"
					>
						<ClipboardDocumentListIcon className="w-4 h-4" />
						<span>Asignar</span>
					</button>
					<button
						onClick={() => onClientDelete(record.id)}
						className="inline-flex items-center gap-1 text-red-600 hover:text-red-800"
						aria-label="Eliminar paciente"
					>
						<TrashIcon className="w-4 h-4" />
						<span>Eliminar</span>
					</button>
				</div>
			),
		},
	];


	return (
		<div className="mb-6 overflow-hidden rounded shadow bg-white dark:bg-dark-1000 max-w-full">
			<Table
				columns={columns}
				emptyText={() => (
					<div className="flex flex-col items-center py-7">
						<div className="mb-1 pt-6 text-base font-semibold text-heading">
							No hay pacientes
						</div>
						<p className="text-[13px] text-gray-500 text-center max-w-xs">
							Aún no has registrado pacientes. Crea uno nuevo para comenzar a asignar formularios.
						</p>
					</div>
				)}
				data={clients}
				rowKey="id"
				scroll={{x: 1000}}
				className="th"
			/>

			{!!meta?.totalCount && meta.totalCount > 0 && (
				<div className="flex items-center justify-end mt-10 px-4 py-3">
					<Pagination
						total={meta.totalCount}
						current={meta.currentPage}
						pageSize={meta.pageSize}
						onChange={onPagination}
					/>
				</div>
			)}
		</div>
	)
}

export default ClientTable;
