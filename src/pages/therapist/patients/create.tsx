import {useRouter} from "next/router";

import {
	Card,
	DefaultButton,
	Description,
	Input,
	Select,
	Textarea,
	StickyFooterPanel,
} from '@/components/atoms';
import AppLayout from '@/components/organisms/Layout/AppLayout';
import {Controller,useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {getAuthCredentials} from '@/utils/auth';
import {ALLOWED_ROLES} from '@/utils/constants';
import {GetServerSideProps} from 'next';
import {useGetMeInfo} from '@/data/user';
import {useCreateClientMutation} from '@/data/therapist';
import {clientSchema} from '@/validation/client.schema';
import {z} from 'zod';
import {CreateClientInput} from '@/types';

export default function CreatePatient() {
	const {mutate,isPending} = useCreateClientMutation();
	const {data: meInfo} = useGetMeInfo();
	type FormValues = z.infer<typeof clientSchema>;
	const router = useRouter();

	const {
		register,
		handleSubmit,
		control,
		formState: {errors},
	} = useForm<FormValues>({
		resolver: zodResolver(clientSchema),
	});

	const onSubmit = (data: FormValues) => {
		const payload: CreateClientInput = {
			therapistId: meInfo?.sub ?? '',
			name: data.name,
			email: data.email,
			gender: data.gender,
			notes: data.notes ?? null,
			birthDate: data.birthDate ?? null,
		};
		mutate(payload,{
			onSuccess: () => {
				setTimeout(() => {
					router.back()
				},500);
			}
		});
	};

	return (
		<>
			<div className="flex border-b border-dashed border-border-base pb-5 md:pb-7">
				<h1 className="text-lg font-semibold text-heading">Crear Paciente</h1>
			</div>

			<form onSubmit={handleSubmit(onSubmit)}>
				{/* Avatar */}
				<div className="flex flex-wrap pb-8 my-5 border-b border-dashed border-border-base sm:my-8">
					<Description
						title="Avatar del Usuario"
						details="Puedes subir una imagen de perfil para el usuario."
						className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
					/>
					<Card className="w-full sm:w-8/12 md:w-2/3 border border-border-base p-5 sm:p-8">
						<div className="flex items-center justify-center h-full text-sm text-muted-foreground">
							Aquí puedes agregar un avatar para el usuario.
						</div>
					</Card>
				</div>

				{/* Información */}
				<div className="flex flex-wrap my-5 sm:my-8">
					<Description
						title="Información del Paciente"
						details="Completa los datos del usuario."
						className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
					/>

					<Card className="w-full sm:w-8/12 md:w-2/3">
						<Input
							label="Nombre"
							placeholder="Nombre del usuario"
							error={errors.name?.message}
							{...register('name')}
						/>

						<Input
							label="Correo Electrónico"
							type="email"
							placeholder="correo@ejemplo.com"
							error={errors.email?.message}
							{...register('email')}
						/>

						{/* Date picker */}
						<label className="block mt-1 mb-2 text-sm font-medium text-gray-700">Selecciona la fecha</label>
						<input
							type="date"
							className="block w-full rounded-2xl border-neutral-200 bg-white px-4 py-3 text-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 dark:border-neutral-700 dark:bg-neutral-900"
							{...register('birthDate')}
						/>
						{errors.birthDate?.message && (
							<span className="text-xs text-red-500 mt-1">{errors.birthDate.message}</span>
						)}

						<Controller
							control={control}
							name="gender"
							render={({field}) => (
								<Select
									label="Género"
									name="gender"
									className="w-full"
									onChange={(newValue: unknown) => {
										const option = newValue as {value: 'MALE' | 'FEMALE' | 'OTHER'; label: string} | null;
										if (option) field.onChange(option.value);
									}}
									options={[
										{id: 1,value: 'MALE',label: 'Masculino'},
										{id: 2,value: 'FEMALE',label: 'Femenino'},
										{id: 3,value: 'OTHER',label: 'Otro'},
									]}
								/>
							)}
						/>

						<label className="block mt-4 mb-2 text-sm font-medium text-gray-700">Notas</label>
						<Textarea
							placeholder="Notas adicionales del paciente"
							{...register('notes')}
						/>

					</Card>
				</div>

				<StickyFooterPanel className="z-0">
					<div className="text-end">
						<DefaultButton type="submit" size="big" disabled={isPending}>
							{isPending ? 'Creando...' : 'Crear Paciente'}
						</DefaultButton>
					</div>
				</StickyFooterPanel>
			</form>
		</>
	);
}

CreatePatient.authenticate = {
	permissions: ALLOWED_ROLES,
};

CreatePatient.Layout = AppLayout;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const {permissions} = getAuthCredentials(ctx);
	return {
		props: {
			userPermissions: permissions,
		},
	};
};
