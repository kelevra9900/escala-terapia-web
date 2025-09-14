import {GetServerSideProps} from 'next';
import AppLayout from '@/components/organisms/Layout/AppLayout';
import {Card, DefaultButton, PageHeading, Seo} from '@/components/atoms';
import FormTemplateTable from '@/components/organisms/FormTemplateTable';
import {FormTemplate, Meta} from '@/types';
import {getAuthCredentials, hasAccess} from '@/utils/auth';
import {ALLOWED_ROLES} from '@/utils/constants';
import {Routes} from '@/settings/routes';

export default function TherapistTemplatesList() {
  const templates: FormTemplate[] = [
    {
      id: '11111111-1111-1111-1111-111111111111',
      title: 'GAD-7 – Ansiedad Generalizada',
      description: 'Cuestionario de 7 ítems para evaluar ansiedad.',
      isActive: true,
      createdBy: 'therapist-1',
      createdAt: new Date().toISOString(),
      questions: [],
    },
    {
      id: '22222222-2222-2222-2222-222222222222',
      title: 'PHQ-9 – Depresión',
      description: 'Tamizaje de depresión de 9 ítems.',
      isActive: true,
      createdBy: 'therapist-1',
      createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
      questions: [],
    },
  ];

  const meta: Meta = {
    totalCount: templates.length,
    totalPages: 1,
    currentPage: 1,
    pageSize: templates.length,
  };

  return (
    <>
      <Seo title="Plantillas – Terapia" description="Gestiona plantillas clínicas" url={Routes.therapistTemplates.list} noIndex />

      <Card className="mb-8 bg-white dark:bg-dark-1000 flex items-center justify-between">
        <PageHeading title="Plantillas" />
        <DefaultButton onClick={() => console.log('Crear plantilla')}>Crear plantilla</DefaultButton>
      </Card>

      <FormTemplateTable
        formTemplates={templates}
        meta={meta}
        isLoading={false}
        onEdit={(id) => console.log('Editar', id)}
        onDelete={(id) => console.log('Eliminar', id)}
        onPagination={() => {}}
      />
    </>
  );
}

TherapistTemplatesList.Layout = AppLayout;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const {token, permissions} = getAuthCredentials(ctx);
  if (!token || !hasAccess(ALLOWED_ROLES, permissions)) {
    return { redirect: { destination: Routes.login, permanent: false } };
  }
  return { props: { userPermissions: permissions } };
};
