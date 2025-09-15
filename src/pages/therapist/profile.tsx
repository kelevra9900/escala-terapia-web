import {GetServerSideProps} from 'next';
import {useState} from 'react';

import AppLayout from '@/components/organisms/Layout/AppLayout';
import {Avatar,Card,DefaultButton,Input,PageHeading,Seo,Select,Textarea,StickyFooterPanel,Checkbox,Loader,TextLabel} from '@/components/atoms';
import {Routes} from '@/settings/routes';
import {getAuthCredentials,hasAccess} from '@/utils/auth';
import {ALLOWED_ROLES} from '@/utils/constants';
import {showSuccess,showError} from '@/utils/toasts';
import {useGetMeInfo} from '@/data/user';
import {useChangePasswordMutation} from '@/data/therapist';

type Option = {value: string; label: string};

export default function TherapistProfile() {
  const {data: me,isPending} = useGetMeInfo()
  const {mutate: updatePassword,isPending: loading} = useChangePasswordMutation()

  // Mocked user profile data
  const [name,setName] = useState('Dra. Ana Psicóloga');
  const [email,setEmail] = useState('ana.terapeuta@example.com');
  const [about,setAbout] = useState('Terapeuta cognitivo-conductual con 8+ años de experiencia en ansiedad y depresión.');
  const [plan,setPlan] = useState<Option>({value: 'PRO',label: 'Profesional'});
  // Seguridad
  const [currentPassword,setCurrentPassword] = useState('');
  const [newPassword,setNewPassword] = useState('');
  const [confirmPassword,setConfirmPassword] = useState('');
  // Notificaciones
  const [notifEmail,setNotifEmail] = useState(true);
  const [notifWhatsapp,setNotifWhatsapp] = useState(false);
  const [notifReminders,setNotifReminders] = useState(true);
  const handleSave = () => {
    // Mock save
    showSuccess('Perfil actualizado (mock)');
  };

  if (isPending) {
    return <Loader />
  }

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      showError('Completa todos los campos de contraseña');
      return;
    }
    if (newPassword !== confirmPassword) {
      showError('Las contraseñas no coinciden');
      return;
    }
    if (newPassword.length < 8) {
      showError('La nueva contraseña debe tener al menos 8 caracteres');
      return;
    }
    // Ejecutar mutación con los campos correctos y limpiar al éxito
    updatePassword(
      {
        actualPassword: currentPassword,
        newPassword,
        confirmPassword,
      },
      {
        onSuccess: () => {
          setCurrentPassword('');
          setNewPassword('');
          setConfirmPassword('');
        },
      }
    );
  };

  const handleSaveNotifications = () => {
    showSuccess('Preferencias de notificaciones guardadas (mock)');
  };

  return (
    <>
      <Seo
        title="Mi perfil – Terapeuta"
        description="Gestiona tu información de perfil"
        url={Routes.therapistProfile}
        noIndex
      />

      <Card className="mb-8 bg-white dark:bg-dark-1000 flex items-center justify-between">
        <PageHeading title="Mi perfil" />
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Resumen */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="bg-white dark:bg-dark-1000">
            <div className="flex items-center gap-3">
              <Avatar
                sizeClass="h-14 w-14"
              />
              <div className="flex flex-col">
                <span className="text-base font-semibold text-heading">{me?.name}</span>
                <span className="text-sm text-gray-500">{me?.email}</span>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-xs uppercase text-gray-500 mb-1">Suscripción</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{plan.label}</span>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase ${me?.subscriptionStatus === 'ACTIVE'
                  ? 'bg-green-100 text-green-700'
                  : me?.subscriptionStatus === 'INACTIVE'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-gray-100 text-gray-600'
                  }`}>
                  {me?.subscriptionStatus}
                </span>
              </div>
            </div>
          </Card>

          <Card className="bg-white dark:bg-dark-1000">
            <p className="text-sm text-gray-700">
              Mantén tu información actualizada para facilitar la comunicación con tus pacientes y configurar recordatorios.
            </p>
          </Card>
        </div>

        {/* Formulario de edición */}
        <div className="lg:col-span-2">
          <Card className="bg-white dark:bg-dark-1000">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Input label="Nombre completo" value={me?.name} onChange={(e) => setName(e.target.value)} />
              <Input label="Email" type="email" value={me?.email} onChange={(e) => setEmail(e.target.value)} />
              <div>
                <div>
                  <TextLabel>
                    Mi subscripción: {me?.subscriptionStatus}
                  </TextLabel>
                </div>
              </div>
              <div className="md:col-span-2">
                <Textarea
                  placeholder="Sobre ti (especialidades, enfoques, experiencia)"
                  rows={5}
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
              </div>
            </div>

            <StickyFooterPanel>
              <div className="flex justify-end gap-3">
                <DefaultButton variant="outline" onClick={() => window.history.back()}>
                  Cancelar
                </DefaultButton>
                <DefaultButton onClick={handleSave}>Guardar cambios</DefaultButton>
              </div>
            </StickyFooterPanel>
          </Card>

          {/* Seguridad */}
          <Card className="mt-6 bg-white dark:bg-dark-1000">
            <PageHeading title="Seguridad" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-4">
              <Input
                label="Contraseña actual"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <Input
                label="Nueva contraseña"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <Input
                label="Confirmar nueva contraseña"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-end mt-4">
              <DefaultButton
                loading={isPending || loading}
                onClick={handleChangePassword}
                disabled={isPending || loading}
              >
                Actualizar contraseña
              </DefaultButton>
            </div>
          </Card>

          {/* Notificaciones */}
          <Card className="mt-6 bg-white dark:bg-dark-1000">
            <PageHeading title="Notificaciones" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
              <Checkbox
                name="notifEmail"
                label="Recibir notificaciones por correo electrónico"
                checked={notifEmail}
                onChange={(e) => setNotifEmail(e.currentTarget.checked)}
              />
              <Checkbox
                name="notifWhatsapp"
                label="Recibir notificaciones por WhatsApp"
                checked={notifWhatsapp}
                onChange={(e) => setNotifWhatsapp(e.currentTarget.checked)}
              />
              <Checkbox
                name="notifReminders"
                label="Recordatorios antes de las sesiones"
                checked={notifReminders}
                onChange={(e) => setNotifReminders(e.currentTarget.checked)}
              />
            </div>
            <div className="flex justify-end mt-4">
              <DefaultButton onClick={handleSaveNotifications}>Guardar preferencias</DefaultButton>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}

TherapistProfile.Layout = AppLayout;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const {token,permissions} = getAuthCredentials(ctx);
  if (!token || !hasAccess(ALLOWED_ROLES,permissions)) {
    return {redirect: {destination: Routes.login,permanent: false}};
  }
  return {props: {userPermissions: permissions}};
};
