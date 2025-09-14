import {GetServerSideProps} from 'next';
import AppLayout from '@/components/organisms/Layout/AppLayout';
import {Card, PageHeading, Seo} from '@/components/atoms';
import StatCard from '@/components/atoms/StatCard';
import {Routes} from '@/settings/routes';
import {getAuthCredentials, hasAccess} from '@/utils/auth';
import {ALLOWED_ROLES} from '@/utils/constants';
import {DocumentCheckIcon} from '@heroicons/react/24/outline';

export default function TherapistAnalyticsOverview() {
  return (
    <>
      <Seo title="Analítica" description="Métricas y tendencias" url={Routes.therapistAnalytics.overview} noIndex />
      <Card className="mb-8 bg-white dark:bg-dark-1000">
        <PageHeading title="Analítica" />
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Formularios enviados" value={32} icon={<DocumentCheckIcon className="w-6 h-6" />} />
        <StatCard title="Completados" value={27} icon={<DocumentCheckIcon className="w-6 h-6" />} variant="secondary" />
        <StatCard title="Tasa de completitud" value="84%" icon={<DocumentCheckIcon className="w-6 h-6" />} variant="neutral" />
      </div>
    </>
  );
}

TherapistAnalyticsOverview.Layout = AppLayout;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const {token, permissions} = getAuthCredentials(ctx);
  if (!token || !hasAccess(ALLOWED_ROLES, permissions)) {
    return { redirect: { destination: Routes.login, permanent: false } };
  }
  return { props: { userPermissions: permissions } };
};

