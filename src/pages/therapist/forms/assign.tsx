import {useMemo,useState} from 'react';
import {useRouter} from 'next/router';
import type {GetServerSideProps} from 'next';

import AppLayout from '@/components/organisms/Layout/AppLayout';
import {Card,PageHeading,Seo,Select,StickyFooterPanel,DefaultButton,Avatar} from '@/components/atoms';
import {Routes} from '@/settings/routes';
import {getAuthCredentials,hasAccess} from '@/utils/auth';
import {ALLOWED_ROLES} from '@/utils/constants';
import {showSuccess} from '@/utils/toasts';
import {useAttachForm,useGetAvailableForms} from '@/data/therapist';

type TemplateOption = {value: string; label: string; description?: string};

export default function AssignFormPage() {
  const router = useRouter();
  const clientId = String(router.query.clientId || 'demo-client');
  const clientName = String(router.query.clientName || 'Paciente Demo');
  const clientEmail = String(router.query.clientEmail || 'paciente.demo@example.com');
  const {data,isPending,isError} = useGetAvailableForms({
    page: 1,
    limit: 15,
  })

  const {mutate: attachForm,isPending: attaching} = useAttachForm()

  // Build available forms options from API data
  const templateOptions: TemplateOption[] = useMemo(() => {
    const forms = data?.data ?? [];
    return forms.map((f: any) => ({
      value: f.id,
      label: f.title,
      description: f.description,
    }));
  },[data]);

  const [selectedTemplate,setSelectedTemplate] = useState<TemplateOption | null>(null);
  const [expiresAt,setExpiresAt] = useState<string>('');
  const [message,setMessage] = useState<string>('Hola, por favor completa este formulario antes de nuestra próxima sesión.');

  const handleSubmit = async () => {
    if (!selectedTemplate) return;
    attachForm({
      clientId,
      formId: selectedTemplate.value,
      expiresAt: expiresAt ? new Date(expiresAt).toISOString() : ''
    },{
      onSuccess: () => {
        router.back()
      }
    })
  };

  return (
    <>
      <Seo
        title={`Asignar formulario – ${clientName}`}
        description="Asigna un formulario clínico a un paciente"
        url={Routes.therapistForms.assign}
        noIndex
      />

      <Card className="mb-6 bg-white dark:bg-dark-1000">
        <div className="flex items-center justify-between">
          <PageHeading title={`Asignar formulario`} />
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Paciente */}
        <div className="lg:col-span-1">
          <Card className="bg-white dark:bg-dark-1000">
            <div className="flex items-center gap-3">
              <Avatar
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(clientName)}`}
                sizeClass="h-12 w-12"
              />
              <div className="flex flex-col">
                <span className="text-base font-semibold text-heading">{clientName}</span>
                <span className="text-sm text-gray-500">{clientEmail}</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Formulario */}
        <div className="lg:col-span-2">
          <Card className="bg-white dark:bg-dark-1000">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <Select
                  label="Formulario clínico"
                  placeholder="Selecciona un formulario"
                  options={templateOptions}
                  isLoading={isPending}
                  isDisabled={isPending || isError}
                  noOptionsMessage={() => (isError ? 'Error al cargar formularios' : 'No hay formularios disponibles')}
                  value={selectedTemplate}
                  onChange={(opt) => setSelectedTemplate(opt as TemplateOption)}
                />
                {selectedTemplate?.description && (
                  <p className="text-xs text-gray-500 mt-2">{selectedTemplate.description}</p>
                )}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Expira</label>
                <input
                  type="date"
                  value={expiresAt}
                  onChange={(e) => setExpiresAt(e.target.value)}
                  className="block w-full rounded-2xl border-neutral-200 bg-white px-4 py-3 text-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 dark:border-neutral-700 dark:bg-neutral-900"
                />
                <p className="text-xs text-gray-500 mt-2">Opcional. Si se define, el enlace dejará de estar disponible después de esta fecha.</p>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Mensaje para el paciente</label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="block w-full rounded-2xl border-neutral-200 bg-white text-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 dark:border-neutral-700 dark:bg-neutral-900 px-4 py-3"
                />
              </div>
            </div>

            <StickyFooterPanel>
              <div className="flex justify-end gap-3">
                <DefaultButton
                  variant="outline"
                  onClick={() => router.back()}
                >
                  Cancelar
                </DefaultButton>
                <DefaultButton
                  disabled={!selectedTemplate || attaching}
                  onClick={handleSubmit}
                  loading={attaching}
                >
                  Asignar formulario
                </DefaultButton>
              </div>
            </StickyFooterPanel>
          </Card>
        </div>
      </div>
    </>
  );
}

AssignFormPage.Layout = AppLayout;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const {token,permissions} = getAuthCredentials(ctx);
  if (!token || !hasAccess(ALLOWED_ROLES,permissions)) {
    return {redirect: {destination: Routes.login,permanent: false}};
  }
  return {props: {userPermissions: permissions}};
};
