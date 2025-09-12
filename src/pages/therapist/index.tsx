import {GetServerSideProps} from "next";

import {Seo,Card,PageHeading} from "@/components/atoms";
import AppLayout from "@/components/organisms/Layout/AppLayout";
import {getAuthCredentials,hasAccess} from "@/utils/auth";
import {ALLOWED_ROLES} from "@/utils/constants";
import {Routes} from "@/settings/routes";
import {
	UserGroupIcon,
	CheckCircleIcon,
	ClockIcon,
	CalendarDaysIcon
} from '@heroicons/react/24/solid';
import StatCard from "@/components/atoms/StatCard";
import {FormInvitation,FormResponses} from "@/types";
import PendingInvitationsTable from "@/components/organisms/PendingInvitationsTable";
import QuickActions from "@/components/molecules/QuickActions";
import {LatestResponsesTable} from "@/components/organisms/LatestResponsesTable";

export const mockFormResponses: FormResponses[] = [
	{
		id: 'res_1',
		filledAt: '2025-07-25T14:32:00.000Z',
		level: 'MILD',
		client: {
			id: 'cli_1',
			name: 'Laura Méndez',
			email: 'laura.mendez@gmail.com',
			gender: 'FEMALE',
		},
		formTemplate: {
			id: 'form_1',
			title: 'Escala de ansiedad GAD-7',
		},
	},
	{
		id: 'res_2',
		filledAt: '2025-07-24T10:15:00.000Z',
		level: 'SEVERE',
		client: {
			id: 'cli_2',
			name: 'José García',
			email: 'jose.garcia@hotmail.com',
			gender: 'MALE',
		},
		formTemplate: {
			id: 'form_2',
			title: 'Evaluación inicial emocional',
		},
	},
	{
		id: 'res_3',
		filledAt: '2025-07-22T17:45:00.000Z',
		level: 'MINIMAL',
		client: {
			id: 'cli_3',
			name: 'Andrea Ruiz',
			email: 'andrea.ruiz@example.com',
			gender: 'FEMALE',
		},
		formTemplate: {
			id: 'form_3',
			title: 'Inventario de Depresión de Beck',
		},
	},
];


export const mockPendingInvitations: FormInvitation[] = [
	{
		id: 'inv-001',
		token: 'token-abc123',
		therapistId: 'ther-001',
		clientId: 'cli-001',
		formTemplateId: 'form-001',
		isCompleted: false,
		createdAt: '2025-07-20T12:00:00Z',
		expiresAt: '2025-08-01T10:00:00Z',
		client: {
			id: 'cli-001',
			name: 'Carlos López',
			email: 'carlos.lopez@example.com',
		},
		formTemplate: {
			id: 'form-001',
			title: 'Escala de ansiedad GAD-7',
		},
	},
	{
		id: 'inv-002',
		token: 'token-def456',
		therapistId: 'ther-001',
		clientId: 'cli-002',
		formTemplateId: 'form-002',
		isCompleted: false,
		createdAt: '2025-07-21T14:30:00Z',
		expiresAt: null,
		client: {
			id: 'cli-002',
			name: 'Lucía García',
			email: 'lucia.garcia@example.com',
		},
		formTemplate: {
			id: 'form-002',
			title: 'Evaluación emocional inicial',
		},
	},
	{
		id: 'inv-003',
		token: 'token-ghi789',
		therapistId: 'ther-001',
		clientId: 'cli-003',
		formTemplateId: 'form-003',
		isCompleted: false,
		createdAt: '2025-07-19T08:45:00Z',
		expiresAt: '2025-07-30T12:00:00Z',
		client: {
			id: 'cli-003',
			name: 'Martín Herrera',
			email: 'martin.herrera@example.com',
		},
		formTemplate: {
			id: 'form-003',
			title: 'Inventario de depresión de Beck',
		},
	},
];
export default function TherapistDashboard() {
	return (
		<>
			<Seo
				title="Dashboard del Terapeuta – Escala Terapia"
				description="Resumen de actividad, pacientes, formularios y respuestas recientes."
				url="https://escala-terapia.com/therapist"
			/>

			<PageHeading title="Bienvenido de nuevo" subtitle="Aquí tienes un resumen de tu actividad reciente" />

			<div className="space-y-8">
				{/* Estadísticas */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
					<StatCard
						title="Pacientes"
						value={6}
						icon={<UserGroupIcon className="w-5 h-5" />}
						variant="primary"
					/>

					<StatCard
						title="Pendientes"
						value={3}
						icon={<ClockIcon className="w-5 h-5" />}
						variant="secondary"
					/>

					<StatCard
						title="Completados"
						value={12}
						icon={<CheckCircleIcon className="w-5 h-5" />}
						variant="primary"
					/>

					<StatCard
						title="Última respuesta"
						value="25/07/2025"
						icon={<CalendarDaysIcon className="w-5 h-5" />}
						variant="neutral"
					/>
				</div>

				{/* Últimas respuestas */}
				<Card>
					<PageHeading
						title="Últimos formularios completados"
						subtitle="Respuestas recibidas recientemente por tus pacientes"
					/>
					<LatestResponsesTable responses={mockFormResponses} />
				</Card>

				{/* Formularios pendientes */}
				<Card>
					<PageHeading
						title="Formularios pendientes"
						subtitle="Pacientes que aún no han completado el formulario"
					/>
					<PendingInvitationsTable invitations={mockPendingInvitations} />
				</Card>
			</div>


			{/* Atajos */}
			<Card className="mb-8">
				<PageHeading title="Acciones rápidas" />
				<QuickActions />
			</Card>
		</>
	);
}

TherapistDashboard.Layout = AppLayout;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const {token,permissions} = getAuthCredentials(ctx);
	if (!token || !hasAccess(ALLOWED_ROLES,permissions)) {
		return {redirect: {destination: Routes.login,permanent: false}};
	}
	return {props: {userPermissions: permissions}};
};
