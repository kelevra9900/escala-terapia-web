import {GetServerSideProps} from 'next';
import {useRouter} from 'next/router';

import AppLayout from '@/components/organisms/Layout/AppLayout';
import {Avatar,Card,DefaultButton,Loader,PageHeading,Seo} from '@/components/atoms';
import FormResponseList from '@/components/molecules/FormResponseList';

import {ALLOWED_ROLES} from '@/utils/constants';
import {getAuthCredentials} from '@/utils/auth';
import {Routes} from '@/settings/routes';
import {useGetResponsesByIdForm} from '@/data/forms';
export default function FormResponseDetail() {
  const router = useRouter();
  const id = String(router.query.id || '');
  const {data,isPending} = useGetResponsesByIdForm(id);


  // Mock de respuesta de formulario (alineado a tus modelos)
  if (isPending) {
    return <Loader />
  }

  return (
    <>
      <Seo
        title={`Respuesta – ${''}`}
        description={`Detalle de la respuesta del formulario ${''}`}
        url={Routes.therapistForms.responses(id)}
        noIndex
      />

      <Card className="mb-6 bg-white dark:bg-dark-1000">
        <div className="flex items-center justify-between">
          <PageHeading title={data?.clientName ?? ''} />
          <div className="flex items-center gap-3">
            <DefaultButton
              variant="outline"
              onClick={() => window.print()}
            >
              Descargar PDF
            </DefaultButton>
            <DefaultButton
              onClick={() => navigator?.share ? navigator.share({title: 'Respuesta de formulario'}) : undefined}
            >
              Compartir
            </DefaultButton>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Paciente */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="bg-white dark:bg-dark-1000">
            <div className="flex items-center gap-3">
              <Avatar
                sizeClass="h-12 w-12"
              />
              <div className="flex flex-col">
                <span className="text-base font-semibold text-heading">{data?.clientName}</span>
                <span className="text-sm text-gray-500">{data?.clientEmail}</span>

              </div>
            </div>
          </Card>

          <Card className="bg-white dark:bg-dark-1000">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Fecha de respuesta</span>
                <span className="text-sm font-medium text-gray-900">{data?.filledAt}</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Respuestas */}
        <div className="lg:col-span-2">
          <Card className="bg-white dark:bg-dark-1000">
            <FormResponseList
              responses={data?.responses ?? []}
              level={data?.level}
              score={data?.score}
            />
          </Card>
        </div>
      </div>
    </>
  );
}

FormResponseDetail.authenticate = {
  permissions: ALLOWED_ROLES,
};

FormResponseDetail.Layout = AppLayout;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const {permissions} = getAuthCredentials(ctx);
  return {
    props: {
      userPermissions: permissions,
    },
  };
};
