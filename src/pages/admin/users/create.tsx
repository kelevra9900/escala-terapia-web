import {
	Card,
	DefaultButton,
	Description,
	Input,
	Select,
	StickyFooterPanel,
} from '@/components/atoms';
import AppLayout from '@/components/organisms/Layout/AppLayout';
import {useForm,Controller,useWatch} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {CreateUserInput,SubscriptionStatus,UserRole} from '@/types';
import {getAuthCredentials} from '@/utils/auth';
import {ONLY_ADMIN_ROLE} from '@/utils/constants';
import {GetServerSideProps} from 'next';
import {UserCreateFormData,userCreateSchema} from '@/validation/user.schema';
import {useCreateUserMutation} from '@/data/user';

export default function CreateUser() {
	const {mutate,isPending} = useCreateUserMutation();
	const {
		register,
		handleSubmit,
		control,
		formState: {errors},
	} = useForm<CreateUserInput>({
		resolver: zodResolver(userCreateSchema),
		defaultValues: {
			role: UserRole.THERAPIST,
			subscriptionStatus: SubscriptionStatus.ACTIVE,
		},
	});

	const subscriptionStatus = useWatch({
		control,
		name: 'subscriptionStatus',
	});

	const subscriptionStatusClass: Record<SubscriptionStatus,string> = {
		ACTIVE: 'border-green-500',
		INACTIVE: 'border-yellow-500',
		CANCELLED: 'border-red-500',
		PAST_DUE: 'border-orange-500',
	};

	const onSubmit = (data: UserCreateFormData) => {
		mutate({
			data,
		});
	};

	return (
		<>
			<div className="flex border-b border-dashed border-border-base pb-5 md:pb-7">
				<h1 className="text-lg font-semibold text-heading">Crear Usuario</h1>
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
						title="Información del Usuario"
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

						<Controller
							control={control}
							name="role"
							render={({field}) => (
								<Select
									label="Rol del Usuario"
									name="role"
									className="w-full"
									onChange={(newValue: unknown) => {
										const option = newValue as {value: UserRole; label: string} | null;
										if (option) field.onChange(option.value);
									}}
									options={[
										{id: 1,value: 'THERAPIST',label: 'Terapeuta'},
										{id: 2,value: 'CLIENT',label: 'Usuario'},
										{id: 3,value: 'ADMIN',label: 'Administrador'},
									]}
									defaultValue={{
										id: 1,
										value: 'THERAPIST',
										label: 'Terapeuta',
									}}
								/>
							)}
						/>

						<Input
							label="Correo Electrónico"
							type="email"
							placeholder="correo@ejemplo.com"
							error={errors.email?.message}
							{...register('email')}
						/>

						<Controller
							control={control}
							name="subscriptionStatus"
							render={({field}) => (
								<Select
									label="Estado de Suscripción"
									name="subscriptionStatus"
									className={`w-full rounded-2xl border ${subscriptionStatusClass[subscriptionStatus]}`}
									onChange={(newValue: unknown) => {
										const option = newValue as {value: SubscriptionStatus; label: string} | null;
										if (option) field.onChange(option.value);
									}}
									options={[
										{id: 1,value: SubscriptionStatus.ACTIVE,label: 'Activo'},
										{id: 2,value: SubscriptionStatus.INACTIVE,label: 'Inactivo'},
										{id: 3,value: SubscriptionStatus.CANCELLED,label: 'Cancelado'},
										{id: 4,value: SubscriptionStatus.PAST_DUE,label: 'Expirado'},
									]}
									defaultValue={{
										id: 1,
										value: SubscriptionStatus.ACTIVE,
										label: 'Activo',
									}}
								/>
							)}
						/>

						<Input
							label="Contraseña"
							type="password"
							placeholder="••••••"
							error={errors.password?.message}
							{...register('password')}
						/>

						<Input
							label="Confirmar Contraseña"
							type="password"
							placeholder="••••••"
							error={errors.confirmPassword?.message}
							{...register('confirmPassword')}
						/>
					</Card>
				</div>

				<StickyFooterPanel className="z-0">
					<div className="text-end">
						<DefaultButton type="submit" size="big" disabled={isPending}>
							{isPending ? 'Creando...' : 'Crear Usuario'}
						</DefaultButton>
					</div>
				</StickyFooterPanel>
			</form>
		</>
	);
}

CreateUser.authenticate = {
	permissions: ONLY_ADMIN_ROLE,
};

CreateUser.Layout = AppLayout;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const {permissions} = getAuthCredentials(ctx);
	return {
		props: {
			userPermissions: permissions,
		},
	};
};
