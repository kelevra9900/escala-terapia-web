import {GetServerSideProps} from 'next';
import {useState} from 'react';
import AppLayout from '@/components/organisms/Layout/AppLayout';
import {Card, DefaultButton, PageHeading, Seo, Select, StickyFooterPanel} from '@/components/atoms';
import {Routes} from '@/settings/routes';
import {getAuthCredentials, hasAccess} from '@/utils/auth';
import {ALLOWED_ROLES} from '@/utils/constants';
import {showSuccess} from '@/utils/toasts';

export default function BulkAssignForms() {
  const [selectedClients, setSelectedClients] = useState<any[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [expiresAt, setExpiresAt] = useState('');

  const clientOptions = [
    { value: 'c-1', label: 'Roger Torres' },
    { value: 'c-2', label: 'Ana López' },
    { value: 'c-3', label: 'María Pérez' },
  ];
  const templateOptions = [
    { value: 'gad7', label: 'GAD-7 – Ansiedad' },
    { value: 'phq9', label: 'PHQ-9 – Depresión' },
  ];

  const handleSubmit = () => {
    if (!selectedTemplate || selectedClients.length === 0) return;
    showSuccess('Invitaciones creadas (mock)');
  };

  return (
    <>
      <Seo title="Asignación masiva" description="Asigna un formulario a múltiples pacientes" url={Routes.therapistForms.bulkAssign} noIndex />

      <Card className="mb-8 bg-white dark:bg-dark-1000">
        <PageHeading title="Asignación masiva" />
      </Card>

      <Card className="bg-white dark:bg-dark-1000">
        <div className="grid grid-cols-1 gap-6">
          <div>
            <Select
              label="Pacientes"
              placeholder="Selecciona pacientes"
              options={clientOptions}
              isMulti
              value={selectedClients}
              onChange={(opts) => setSelectedClients(opts as any[])}
            />
          </div>
          <div>
            <Select
              label="Formulario clínico"
              placeholder="Selecciona un formulario"
              options={templateOptions}
              value={selectedTemplate}
              onChange={(opt) => setSelectedTemplate(opt)}
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Expira</label>
            <input
              type="date"
              value={expiresAt}
              onChange={(e) => setExpiresAt(e.target.value)}
              className="block w-full rounded-2xl border-neutral-200 bg-white px-4 py-3 text-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 dark:border-neutral-700 dark:bg-neutral-900"
            />
          </div>
        </div>

        <StickyFooterPanel>
          <div className="flex justify-end gap-3">
            <DefaultButton variant="outline" onClick={() => {}}>Cancelar</DefaultButton>
            <DefaultButton disabled={!selectedTemplate || selectedClients.length === 0} onClick={handleSubmit}>
              Asignar
            </DefaultButton>
          </div>
        </StickyFooterPanel>
      </Card>
    </>
  );
}

BulkAssignForms.Layout = AppLayout;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const {token, permissions} = getAuthCredentials(ctx);
  if (!token || !hasAccess(ALLOWED_ROLES, permissions)) {
    return { redirect: { destination: Routes.login, permanent: false } };
  }
  return { props: { userPermissions: permissions } };
};

