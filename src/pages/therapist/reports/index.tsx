import {GetServerSideProps} from 'next';
import AppLayout from '@/components/organisms/Layout/AppLayout';
import {Card, PageHeading, Seo} from '@/components/atoms';
import {Routes} from '@/settings/routes';
import {getAuthCredentials, hasAccess} from '@/utils/auth';
import {ALLOWED_ROLES} from '@/utils/constants';

export default function TherapistReports() {
  return (
    <>
      <Seo title="Reportes" description="Reportes clínicos" url={Routes.therapistReports.list} noIndex />
      <Card className="bg-white dark:bg-dark-1000">
        <PageHeading title="Reportes (próximamente)" />
        <p className="text-sm text-gray-600 mt-2">Aquí podrás generar y descargar reportes clínicos basados en respuestas de formularios.</p>
      </Card>
    </>
  );
}

TherapistReports.Layout = AppLayout;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const {token, permissions} = getAuthCredentials(ctx);
  if (!token || !hasAccess(ALLOWED_ROLES, permissions)) {
    return { redirect: { destination: Routes.login, permanent: false } };
  }
  return { props: { userPermissions: permissions } };
};
