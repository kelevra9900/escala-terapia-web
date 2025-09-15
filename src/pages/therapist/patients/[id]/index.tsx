import {useMemo} from 'react';
import {useRouter} from 'next/router';
import {GetServerSideProps} from 'next';

import AppLayout from '@/components/organisms/Layout/AppLayout';
import {Avatar,Card,LinkButton,Loader,Seo} from '@/components/atoms';
import PendingInvitationsTable from '@/components/organisms/PendingInvitationsTable';
import {LatestResponsesTable} from '@/components/organisms/LatestResponsesTable';

import {Routes} from '@/settings/routes';
import {getAuthCredentials} from '@/utils/auth';
import {ALLOWED_ROLES} from '@/utils/constants';

import {CalendarIcon,EnvelopeIcon,UserCircleIcon} from '@heroicons/react/24/outline';
import {PlusIcon,PencilSquareIcon} from '@heroicons/react/24/solid';
import {useGetPatient} from '@/data/therapist';
import type {FormInvitation,FormResponses} from '@/types';
import {PatientResponseSuccess} from '@/types/patient';

export default function Patient() {
	const router = useRouter();
	const id = String(router.query.id || 'demo-id');
	const {data,isPending,isError} = useGetPatient(id);

	console.log("Data info ===>",data)

	// Map API data to UI-friendly shapes
	const patient = useMemo(() => {
		if (data && (data as PatientResponseSuccess)) {
			const c = (data as PatientResponseSuccess).client;
			return {
				id: c.id,
				name: c.name,
				email: c.email ?? '',
				birthdate: c.birthdate ?? null,
				gender: c.gender ?? null,
				notes: c.notes ?? null,
			};
		}
		return {id,name: '',email: ''} as any;
	},[data,id]);

	const pendingInvitations = useMemo<FormInvitation[]>(() => {
		if (!data || !(data as any).pendingInvitations) return [];
		const invites = (data as any).pendingInvitations as any[];
		return invites.map((inv) => ({
			id: inv.id,
			token: inv.token,
			therapistId: inv.therapistId ?? '',
			clientId: inv.clientId,
			formTemplateId: inv.formTemplateId,
			isCompleted: inv.isCompleted,
			createdAt: inv.createdAt,
			expiresAt: inv.expiresAt ?? null,
			client: {
				id: inv.clientId,
				name: inv.clientName ?? patient.name,
				email: patient.email ?? null,
			},
			formTemplate: {
				id: inv.formTemplateId,
				title: inv.formTitle,
			},
		}));
	},[data,patient]);

	const latestResponses = useMemo<FormResponses[]>(() => {
		if (!data || !(data as any).latestResponse) return [];
		const lr = (data as any).latestResponse as any;
		return [
			{
				id: lr.id,
				filledAt: lr.filledAt,
				level: (lr.level as FormResponses['level']) ?? 'MINIMAL',
				client: {
					id: lr.client?.id ?? patient.id,
					name: lr.client?.name ?? patient.name,
					email: lr.client?.email ?? patient.email ?? null,
				},
				formTemplate: {
					id: lr.formTemplateId ?? 'form-template',
					title: lr.title,
				},
			},
		];
	},[data,patient]);

	if (isPending) {
		return <Loader />
	}

	if (isError) {
		return <></>
	}

	return (
		<>
			<Seo
				title={`Paciente – ${patient.name || 'Detalle'}`}
				description="Detalle del paciente con formularios e historial."
				url={Routes.therapistClients.details(patient.id)}
				noIndex
			/>

			<div className="flex items-start justify-between border-b border-dashed border-border-base pb-5 md:pb-7">
				<div className="flex items-center gap-3">
					<Avatar
						sizeClass="h-10 w-10"
					/>
					<div className="flex flex-col">
						<h1 className="text-lg font-semibold text-heading">{patient.name}</h1>
						<span className="text-sm text-gray-500">Paciente</span>
					</div>
				</div>
				<div className="flex items-center gap-2">
					<LinkButton
						href={`${Routes.therapistForms.assign}?clientId=${encodeURIComponent(
							patient.id
						)}&clientName=${encodeURIComponent(patient.name)}&clientEmail=${encodeURIComponent(
							patient.email
						)}`}
						variant="outline"
						className="whitespace-nowrap"
					>
						<PlusIcon className="me-2 h-5 w-5" /> Asignar formulario
					</LinkButton>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
				{/* Columna izquierda: info del paciente */}
				<div className="lg:col-span-1 space-y-6">
					<Card className="bg-white dark:bg-dark-1000">
						<div className="flex items-center gap-3">
							<Avatar
								sizeClass="h-12 w-12"
							/>
							<div className="flex flex-col">
								<span className="text-base font-semibold text-heading">{patient.name}</span>
								<span className="text-sm text-gray-500">{patient.email}</span>
							</div>
						</div>

						<div className="mt-5 grid grid-cols-1 gap-3">
							<div className="flex items-center gap-2 text-sm text-gray-700">
								<EnvelopeIcon className="h-4 w-4 text-gray-500" />
								<span>{patient.email}</span>
							</div>
							<div className="flex items-center gap-2 text-sm text-gray-700">
								<CalendarIcon className="h-4 w-4 text-gray-500" />
								<span>{patient.birthdate ? new Date(patient.birthdate).toLocaleDateString() : '—'}</span>
							</div>
							<div className="flex items-center gap-2 text-sm text-gray-700">
								<UserCircleIcon className="h-4 w-4 text-gray-500" />
								<span>{patient.gender ?? '—'}</span>
							</div>
						</div>

						{patient.notes && (
							<div className="mt-6">
								<p className="text-[13px] uppercase tracking-wide text-gray-500 mb-2">Notas</p>
								<p className="text-sm text-gray-800 leading-relaxed">{patient.notes}</p>
							</div>
						)}
					</Card>
				</div>

				{/* Columna derecha: actividad y formularios */}
				<div className="lg:col-span-2 space-y-6">
					<div>
						<div className="flex items-center justify-between mb-3">
							<h2 className="text-base font-semibold text-heading">Invitaciones pendientes</h2>
						</div>
						<PendingInvitationsTable invitations={pendingInvitations} />
					</div>

					<div>
						<div className="flex items-center justify-between mb-3">
							<h2 className="text-base font-semibold text-heading">Últimas respuestas</h2>
						</div>
						<LatestResponsesTable
							responses={latestResponses}
							onViewResponse={(rid) => {
								router.push(Routes.forms.responses(rid))
							}}
							onDownloadResponse={(rid) => console.log('Descargar respuesta',rid)}
							onDeleteResponse={(rid) => console.log('Eliminar respuesta',rid)}
						/>
					</div>
				</div>
			</div>
		</>
	);
}

Patient.authenticate = {
	permissions: ALLOWED_ROLES,
};

Patient.Layout = AppLayout;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const {permissions} = getAuthCredentials(ctx);
	return {
		props: {
			userPermissions: permissions,
		},
	};
};
