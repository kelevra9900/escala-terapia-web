import {GetServerSideProps} from 'next';
import AppLayout from '@/components/organisms/Layout/AppLayout';
import {Card, DefaultButton, PageHeading, Seo} from '@/components/atoms';
import PendingInvitationsTable from '@/components/organisms/PendingInvitationsTable';
import {FormInvitation} from '@/types';
import {getAuthCredentials, hasAccess} from '@/utils/auth';
import {ALLOWED_ROLES} from '@/utils/constants';
import {Routes} from '@/settings/routes';

export default function TherapistInvitationsList() {
  const invitations: FormInvitation[] = [
    {
      id: 'inv-1',
      token: 'tok_123',
      therapistId: 't-1',
      clientId: 'c-1',
      formTemplateId: 'ft-1',
      isCompleted: false,
      createdAt: new Date().toISOString(),
      expiresAt: null,
      client: { id: 'c-1', name: 'Roger Torres', email: 'roger.torres@example.com' },
      formTemplate: { id: 'ft-1', title: 'GAD-7 – Ansiedad Generalizada' },
    },
    {
      id: 'inv-2',
      token: 'tok_456',
      therapistId: 't-1',
      clientId: 'c-2',
      formTemplateId: 'ft-2',
      isCompleted: false,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 86400000 * 7).toISOString(),
      client: { id: 'c-2', name: 'Ana López', email: 'ana.lopez@example.com' },
      formTemplate: { id: 'ft-2', title: 'PHQ-9 – Depresión' },
    },
  ];

  return (
    <>
      <Seo title="Invitaciones – Terapia" description="Invitaciones a formularios" url={Routes.therapistInvitations.list} noIndex />

      <Card className="mb-8 bg-white dark:bg-dark-1000 flex items-center justify-between">
        <PageHeading title="Invitaciones" />
        <DefaultButton onClick={() => console.log('Nueva invitación')}>Nueva invitación</DefaultButton>
      </Card>

      <PendingInvitationsTable invitations={invitations} />
    </>
  );
}

TherapistInvitationsList.Layout = AppLayout;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const {token, permissions} = getAuthCredentials(ctx);
  if (!token || !hasAccess(ALLOWED_ROLES, permissions)) {
    return { redirect: { destination: Routes.login, permanent: false } };
  }
  return { props: { userPermissions: permissions } };
};

