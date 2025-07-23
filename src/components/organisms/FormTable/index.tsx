import {Table} from "@/components/atoms/Table";
import Pagination from "@/components/molecules/Pagination";
import {AnxietyLevel,Meta,Reponse} from "@/types";


type Props = {
	data: Reponse[];
	meta: Meta;
	onResponseClick: (responseId: string) => void;
	onResponseDelete: (responseId: string) => void;
	onPagination: (page: number,pageSize?: number) => void;
}

const FormTable = ({
	data = [],
	meta = {totalCount: 0,totalPages: 0,currentPage: 1,pageSize: 10},
	onResponseClick = () => { },
	onResponseDelete = () => { },
	onPagination = () => { }
}: Props) => {
	console.log('FormTable data:',data);
	const columns = [
		{
			title: 'Cliente',
			dataIndex: 'clientName',
			key: 'client',
			width: 200,
			render: (name: string,record: Reponse) => (
				<div className="flex flex-col whitespace-nowrap font-medium">
					<span>{name}</span>
					<span className="text-[13px] text-gray-500">{record.clientEmail}</span>
				</div>
			),
		},
		{
			title: 'Formulario',
			dataIndex: 'formTemplateTitle',
			key: 'formTemplateTitle',
			width: 200,
			render: (title: string) => <span className="text-gray-700">{title}</span>,
		},
		{
			title: 'Fecha de respuesta',
			dataIndex: 'filledAt',
			key: 'filledAt',
			width: 150,
			align: 'center' as const,
			render: (date: string) =>
				new Date(date).toLocaleDateString(),
		},
		{
			title: 'Puntaje',
			dataIndex: 'score',
			key: 'score',
			width: 100,
			align: 'center' as const,
			render: (score: number | null) => score != null ? score : '—',
		},
		{
			title: 'Nivel',
			dataIndex: 'level',
			key: 'level',
			width: 120,
			align: 'center' as const,
			render: (level: AnxietyLevel | null) =>
				level ? level.charAt(0) + level.slice(1).toLowerCase() : '—',
		},
		{
			title: 'Acciones',
			key: 'actions',
			align: 'center' as const,
			width: 160,
			render: (_: string,record: Reponse) => (
				<div className="flex justify-center space-x-2">
					<button
						onClick={() => onResponseClick(record.id)}
						className="text-blue-500 hover:text-blue-700"
					>
						Ver
					</button>
					<button
						onClick={() => onResponseDelete(record.id)}
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
				data={data}
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


export default FormTable;