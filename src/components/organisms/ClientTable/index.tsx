import {Table} from "@/components/atoms/Table";
import Pagination from "@/components/molecules/Pagination";
import {Client,Meta} from "@/types";

type Props = {
	clients: Client[];
	meta: Meta;
	onClientClick: (clientId: string) => void;
	onClientDelete: (clientId: string) => void;
	onPagination: (page: number,pageSize?: number) => void;
}
const ClientTable = ({
	clients = [],
	meta = {totalCount: 0,totalPages: 0,currentPage: 1,pageSize: 10},
	onClientClick = () => { },
	onClientDelete = () => { },
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
			dataIndex: 'birthdate',
			key: 'birthdate',
			width: 140,
			align: 'center' as const,
			render: (birthdate?: string) =>
				birthdate ? new Date(birthdate).toLocaleDateString() : '—',
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
			dataIndex: 'createdAt',
			key: 'createdAt',
			width: 140,
			align: 'center' as const,
			render: (createdAt: string) =>
				new Date(createdAt).toLocaleDateString(),
		},
		{
			title: 'Acciones',
			key: 'actions',
			width: 160,
			align: 'center' as const,
			render: (_: string,record: Client) => (
				<div className="flex justify-center space-x-2">
					<button
						onClick={() => onClientClick(record.id)}
						className="text-blue-500 hover:text-blue-700"
					>
						Ver
					</button>
					<button
						onClick={() => onClientDelete(record.id)}
						className="text-red-500 hover:text-red-700"
					>
						Eliminar
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
						{/* <NoDataFound className="w-52" /> */}
						<div className="mb-1 pt-6 text-base font-semibold text-heading">
							No Data Found
						</div>
						<p className="text-[13px]">
							There are no users to display. Please add some users to see them here.
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