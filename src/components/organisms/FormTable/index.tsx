import {Table} from "@/components/atoms/Table";
import Pagination from "@/components/molecules/Pagination";
import {AnxietyLevel,Meta,Reponse} from "@/types";
import {EyeIcon, TrashIcon} from '@heroicons/react/24/outline';
import classNames from 'classnames';


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
	const getBadgeColor = (level?: string | null) => {
		switch (level) {
			case 'SEVERE':
				return 'bg-red-100 text-red-700';
			case 'MODERATE':
				return 'bg-yellow-100 text-yellow-700';
			case 'MILD':
				return 'bg-blue-100 text-blue-700';
			case 'MINIMAL':
				return 'bg-green-100 text-green-700';
			default:
				return 'bg-gray-100 text-gray-600';
		}
	};

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
			render: (level: AnxietyLevel | null) => (
				<span
					className={classNames(
						'px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase',
						getBadgeColor(level)
					)}
				>
					{level ?? 'N/A'}
				</span>
			),
		},
		{
			title: 'Acciones',
			key: 'actions',
			align: 'center' as const,
			width: 160,
			render: (_: string,record: Reponse) => (
				<div className="flex justify-center gap-3">
					<button
						onClick={() => onResponseClick(record.id)}
						className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800"
						aria-label="Ver respuesta"
					>
						<EyeIcon className="w-4 h-4" />
						<span>Ver</span>
					</button>
					<button
						onClick={() => onResponseDelete(record.id)}
						className="inline-flex items-center gap-1 text-red-600 hover:text-red-800"
						aria-label="Eliminar respuesta"
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
							No hay respuestas
						</div>
						<p className="text-[13px] text-gray-500 text-center max-w-xs">
							Cuando tus pacientes completen formularios, los verás aquí.
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
