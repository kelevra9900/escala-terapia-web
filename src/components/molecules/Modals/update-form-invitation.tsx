import {useMemo,useState} from 'react';
import {Avatar,DefaultButton,Checkbox} from '@/components/atoms';
import {useModalAction} from '@/context/ModalContext';
import {useUpdateExpirationForm} from '@/data/forms';
import {FormInvitation} from '@/types';
import {formatDate} from '@/utils/manage-dates';

type Props = {
  data: FormInvitation;
};

const UpdateFormInvitation = ({data}: Props) => {
  const {closeModal} = useModalAction();
  const {mutate,isPending} = useUpdateExpirationForm();

  const initialDate = useMemo(
    () => (data.expiresAt ? new Date(data.expiresAt).toISOString().slice(0,10) : ''),
    [data.expiresAt]
  );
  const [date,setDate] = useState<string>(initialDate);
  const [noExpiration,setNoExpiration] = useState<boolean>(!Boolean(data.expiresAt));

  const handleSave = () => {
    const expiresAt = noExpiration || !date ? '' : new Date(date).toISOString();
    mutate(
      {uid: data.id,expiresAt},
      {
        onSuccess: () => {
          closeModal();
        },
      }
    );
  };

  return (
    <div className="space-y-5">
      <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
        Actualizar expiración del formulario
      </h3>

      <div className="flex items-start gap-3 p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800/50">
        <Avatar src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(data.client.name)}`} />
        <div className="flex flex-col">
          <span className="font-medium text-neutral-900 dark:text-neutral-100">{data.client.name}</span>
          {data.client.email && (
            <span className="text-sm text-neutral-500">{data.client.email}</span>
          )}
          <span className="text-sm text-neutral-600 mt-1">Formulario: <span className="font-medium">{data.formTemplate.title}</span></span>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm text-neutral-600">
          Actual: {data.expiresAt ? formatDate(data.expiresAt) : 'Sin expiración'}
        </p>
        <label className="block text-sm font-medium text-neutral-700">Nueva fecha de expiración</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          disabled={noExpiration}
          className="block w-full rounded-2xl border-neutral-200 bg-white px-4 py-3 text-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 dark:border-neutral-700 dark:bg-neutral-900"
        />
        <div className="pt-1">
          <Checkbox
            name="no-expiration"
            label="Sin expiración"
            checked={noExpiration}
            onChange={(e) => setNoExpiration(e.target.checked)}
          />
        </div>
        <p className="text-xs text-neutral-500">Si marcas "Sin expiración", el enlace no caducará.</p>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <DefaultButton
          variant="outline"
          onClick={closeModal}
          disabled={isPending}
        >
          Cancelar
        </DefaultButton>
        <DefaultButton onClick={handleSave} loading={isPending} disabled={isPending}>
          Guardar cambios
        </DefaultButton>
      </div>
    </div>
  );
};

export default UpdateFormInvitation;
