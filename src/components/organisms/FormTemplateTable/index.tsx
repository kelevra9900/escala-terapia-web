// src/components/organisms/FormTemplateTable.tsx

import {Table} from '@/components/atoms/Table';
import {Badge} from '@/components/atoms';
import {EditIcon} from '@/components/atoms/Icons/edit';
import Pagination from '@/components/molecules/Pagination';
import {simplifyUUID} from '@/utils';
import {formatDate} from '@/utils/manage-dates';
import type {AlignType} from '@/components/atoms/Table';
import type {Meta,FormTemplate} from '@/types';
import {TrashIcon} from '@/components/atoms/Icons/trash';

type Props = {
	formTemplates: FormTemplate[];
	meta: Meta;
	isLoading: boolean;
	onEdit: (formId: string) => void;
	onDelete: (formId: string) => void;
	onPagination: (page: number,pageSize?: number) => void;
};

const FormTemplateTable = ({
	formTemplates = [],
	meta = {totalCount: 0,totalPages: 0,currentPage: 1,pageSize: 10},
	onEdit,
	onDelete,
	onPagination,
}: Props) => {
	const columns = [
		{
			title: 'ID',
			dataIndex: 'id',
			key: 'id',
			align: 'center' as AlignType,
			render: (id: string) => <span className="text-gray-600">{simplifyUUID(id)}</span>,
		},
		{
			title: 'Título',
			dataIndex: 'title',
			key: 'title',
			render: (text: string) => (
				<span className="font-medium text-gray-800 dark:text-white">{text}</span>
			),
		},
		{
			title: 'Descripción',
			dataIndex: 'description',
			key: 'description',
			render: (text: string) => (
				<span className="text-[13px] text-gray-500 dark:text-gray-400 line-clamp-2">
					{text}
				</span>
			),
		},
		{
			title: 'Activo',
			dataIndex: 'isActive',
			key: 'isActive',
			align: 'center' as AlignType,
			render: (isActive: boolean) => (
				<Badge
					color={isActive ? 'bg-lime-100 !text-lime-500' : 'bg-red-100 text-red-500'}
					text={isActive ? 'Activo' : 'Inactivo'}
				/>
			),
		},
		{
			title: 'Creado',
			dataIndex: 'createdAt',
			key: 'createdAt',
			align: 'center' as AlignType,
			render: (text: string) => (
				<span className="text-gray-600 text-[13px]">{formatDate(text)}</span>
			),
		},
		{
			title: 'Acciones',
			dataIndex: 'actions',
			key: 'actions',
			align: 'center' as AlignType,
			render: (_text: string,record: FormTemplate) => (
				<div className="flex items-center space-x-2 justify-center">
					<button
						onClick={() => onEdit(record.id)}
						className="text-accent hover:text-accent focus:outline-none"
						title="Editar"
					>
						<EditIcon width={18} />
					</button>
					<button
						onClick={() => onDelete(record.id)}
						title="Eliminar"
						className="text-red-500 hover:text-red-700 focus:outline-none"
					>
						<TrashIcon width={18} />
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
							No hay formularios
						</div>
						<p className="text-[13px] text-center px-4">
							Aún no se han creado formularios clínicos.
						</p>
					</div>
				)}
				data={formTemplates}
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
	);
};

export default FormTemplateTable;
