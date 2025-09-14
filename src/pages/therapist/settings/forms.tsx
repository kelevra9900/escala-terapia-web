import {GetServerSideProps} from 'next';
import AppLayout from '@/components/organisms/Layout/AppLayout';
import {Card, DefaultButton, Input, PageHeading, Seo, Textarea} from '@/components/atoms';
import {Routes} from '@/settings/routes';
import {getAuthCredentials, hasAccess} from '@/utils/auth';
import {ALLOWED_ROLES} from '@/utils/constants';

export default function TherapistFormsSettings() {
  return (
    <>
      <Seo title="Configuración de formularios" description="Preferencias de formularios" url={Routes.therapistSettings.forms} noIndex />
      <Card className="mb-8 bg-white dark:bg-dark-1000">
        <PageHeading title="Configuración de formularios" />
      </Card>

      <Card className="bg-white dark:bg-dark-1000">
        <div className="grid grid-cols-1 gap-6">
          <Input label="Días por defecto para expiración" type="number" placeholder="7" />
          <Textarea placeholder="Mensaje por defecto para invitaciones" rows={4}>
Hola, te comparto este formulario para completar antes de nuestra sesión.
          </Textarea>
          <div className="flex justify-end">
            <DefaultButton onClick={() => console.log('Guardar configuración')}>Guardar</DefaultButton>
          </div>
        </div>
      </Card>
    </>
  );
}

TherapistFormsSettings.Layout = AppLayout;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const {token, permissions} = getAuthCredentials(ctx);
  if (!token || !hasAccess(ALLOWED_ROLES, permissions)) {
    return { redirect: { destination: Routes.login, permanent: false } };
  }
  return { props: { userPermissions: permissions } };
};

