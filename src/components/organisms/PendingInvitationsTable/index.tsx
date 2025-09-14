import {Avatar} from '@/components/atoms';
import {useEffect,useState} from 'react';

import {AlignType,Table} from '@/components/atoms/Table';
import type {FormInvitation} from '@/types';
import {formatDate} from '@/utils/manage-dates';
import {useModalAction} from '@/context/ModalContext';
import {useRouter} from 'next/router';
import {showSuccess} from '@/utils/toasts';

type Props = {
	invitations: FormInvitation[];
};

const PendingInvitationsTable = ({invitations = []}: Props) => {
	const [rows,setRows] = useState<FormInvitation[]>(invitations);
	const {openModal} = useModalAction();
	const router = useRouter();

	useEffect(() => {
		setRows(invitations);
	},[invitations]);

	const handleChangeExpire = (record: FormInvitation) => {
		openModal('UPDATE_FORM_INVITATION',record);
	};
	const columns = [
		{
			title: 'Paciente',
			dataIndex: ['client','name'],
			key: 'clientName',
			align: 'left' as AlignType,
			width: 250,
			render: (_: any,record: FormInvitation) => (
				<div className="flex items-center space-x-2">
					<Avatar src={`https://api.dicebear.com/7.x/initials/svg?seed=${record.client.name}`} />
					<div className="flex flex-col whitespace-nowrap font-medium ms-2">
						{record.client.name}
						<span className="text-[13px] font-normal text-gray-500/80">
							{record.client.email}
						</span>
					</div>
				</div>
			),
		},
		{
			title: 'Formulario',
			dataIndex: ['formTemplate','title'],
			key: 'formTitle',
			align: 'left' as AlignType,
			width: 300,
			render: (title: string) => (
				<span className="text-gray-800 font-medium">{title}</span>
			),
		},
		{
			title: 'Expira',
			dataIndex: 'expiresAt',
			key: 'expiresAt',
			align: 'center' as AlignType,
			width: 150,
			render: (value: string | null) => (
				<span className="text-gray-700 text-[13px]">
					{value ? formatDate(value) : 'Sin expiración'}
				</span>
			),
		},
		{
			title: 'Acciones',
			key: 'actions',
			width: 220,
			align: 'center' as const,
			render: (_: string,record: FormInvitation) => (
				<div className="flex justify-center gap-3">
					<button
						onClick={() => {
							navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/form-invitations/${record.token}`)
							showSuccess('Invitación copiada al portapapeles!')
						}}
						className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 cursor-pointer"
						aria-label="Ver paciente"
					>
						<span>Copiar</span>
					</button>
					<button
						onClick={() => handleChangeExpire(record)}
						className="inline-flex items-center gap-1 text-gray-600 hover:text-gray-800 cursor-pointer"
						aria-label="Cambiar fecha de expiración"
					>
						<span>Expiración</span>
					</button>
				</div>
			),
		},
	];

	return (
		<div className="mb-6 overflow-hidden rounded shadow bg-white dark:bg-dark-1000 max-w-full">
			<Table
				columns={columns}
				data={rows}
				rowKey="id"
				scroll={{x: 800}}
				className="th"
				emptyText={() => (
					<div className="flex flex-col items-center py-7">
						<div className="mb-1 pt-6 text-base font-semibold text-heading">
							No hay invitaciones pendientes
						</div>
						<p className="text-[13px] text-gray-500 text-center max-w-xs">
							Cuando invites a un paciente a completar un formulario, lo verás aquí.
						</p>
					</div>
				)}
			/>
		</div>
	);
};

export default PendingInvitationsTable;
