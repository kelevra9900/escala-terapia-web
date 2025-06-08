import {GetServerSideProps} from "next";
import {useRouter} from "next/router";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useEffect} from "react";

import {
	Card,
	Description,
	Input,
	Select,
	StickyFooterPanel,
	DefaultButton,
} from "@/components/atoms";
import AppLayout from "@/components/organisms/Layout/AppLayout";
import {
	useGetUserById,
	useUpdateUserMutation,
} from "@/data/user";

import {getAuthCredentials} from "@/utils/auth";
import {ONLY_ADMIN_ROLE} from "@/utils/constants";
import {
	userSchema,
	UserFormData,
} from "@/validation/user.schema";
import {SubscriptionStatus,UserRole} from "@/types";

const subscriptionStatusClass: Record<SubscriptionStatus,string> = {
	ACTIVE: "border-green-500",
	INACTIVE: "border-gray-400",
	CANCELLED: "border-red-500",
	PAST_DUE: "border-yellow-500",
};

export default function UserActionPage() {
	const {mutate,isPending,isError} = useUpdateUserMutation();
	const {query} = useRouter();
	const userId = query.id as string;
	const {data,isLoading} = useGetUserById(userId);

	const {
		register,
		handleSubmit,
		formState: {errors},
		setValue,
		reset,
		watch,
	} = useForm<UserFormData>({
		resolver: zodResolver(userSchema),
		defaultValues: {
			name: data?.name || "",
			role: data?.role as UserRole || UserRole.THERAPIST,
			email: data?.email || "",
			subscriptionStatus: data?.subscriptionStatus as SubscriptionStatus || SubscriptionStatus.INACTIVE,
		},
	});

	const subscriptionStatus = watch("subscriptionStatus");

	useEffect(() => {
		if (data) {
			reset({
				name: data.name,
				role: data.role as UserRole,
				email: data.email,
				password: "",
				confirmPassword: "",
				subscriptionStatus: data.subscriptionStatus as SubscriptionStatus || SubscriptionStatus.INACTIVE,
			});
		}
	},[data,reset]);

	if (!userId) {
		return <div className="text-red-500">ID de usuario no proporcionado.</div>;
	}

	if (isError) {
		return (
			<div className="text-red-500">
				Error al actualizar el usuario. Por favor, inténtalo de nuevo.
			</div>
		);
	}

	const onSubmit = (formData: UserFormData) => {
		mutate({
			id: userId,
			data: {
				name: formData.name,
				role: formData.role as UserRole,
				email: formData.email,
				subscriptionStatus: formData.subscriptionStatus as SubscriptionStatus,
			},
		});
		return {
			success: "Usuario actualizado exitosamente",
		};
	};

	return (
		<>
			<div className="flex border-b border-dashed border-border-base pb-5 md:pb-7">
				<h1 className="text-lg font-semibold text-heading">
					Detalles del Usuario
				</h1>
			</div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="flex flex-wrap pb-8 my-5 border-b border-dashed border-border-base sm:my-8">
					<Description
						title={"Avatar del Usuario"}
						details={
							"Puedes subir una imagen de perfil para el usuario. Esta imagen se mostrará en su perfil y en las interacciones dentro de la plataforma."
						}
						className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
					/>
					<Card className="w-full sm:w-8/12 md:w-2/3 border border-border-base p-5 sm:p-8">
						<div className="flex items-center justify-center h-full">
							<p className="text-sm text-muted-foreground">
								Aquí puedes agregar un avatar para el usuario.
							</p>
						</div>
					</Card>
				</div>

				<div className="flex flex-wrap my-5 sm:my-8">
					<Description
						title={"Información del Usuario"}
						details={
							"Completa los detalles del usuario, incluyendo su nombre, slug y lenguajes preferidos. Estos datos son importantes para la identificación y personalización de la experiencia del usuario."
						}
						className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5 "
					/>

					<Card className="w-full sm:w-8/12 md:w-2/3">
						<label className="block mb-2 text-sm font-medium text-gray-700">
							Nombre
						</label>
						<Input
							{...register("name")}
							placeholder="Nombre del usuario"
							className="mb-2"
							error={errors.name?.message}
						/>

						<label className="block mb-2 text-sm font-medium text-gray-700 mt-4">
							Rol del Usuario
						</label>
						<Select
							name="role"
							onChange={(newValue: unknown) => {
								const option = newValue as {
									value: UserRole;
									label: string;
								} | null;
								if (option) setValue("role",option.value);
							}}
							options={[
								{id: 1,value: "THERAPIST",label: "Terapeuta"},
								{id: 2,value: "CLIENT",label: "Usuario"},
								{id: 3,value: "ADMIN",label: "Administrador"},
							]}
							defaultValue={{
								id: 1,
								value: "THERAPIST",
								label: "Terapeuta",
							}}
							className="w-full"
						/>

						<label className="block mt-4 mb-2 text-sm font-medium text-gray-700">
							Correo Electrónico
						</label>
						<Input
							{...register("email")}
							placeholder="user@gmail.com"
							type="email"
							className="mb-2"
							error={errors.email?.message}
							disabled={!!data?.email}
						/>

						{/* Estado de suscripción */}
						<label className="block mt-4 mb-2 text-sm font-medium text-gray-700">
							Estado de Suscripción
						</label>
						<Select
							name="subscriptionStatus"
							onChange={(newValue: unknown) => {
								const option = newValue as {
									value: SubscriptionStatus;
									label: string;
								} | null;
								if (option) setValue("subscriptionStatus",option.value);
							}}
							options={[
								{
									id: 1,
									value: SubscriptionStatus.ACTIVE,
									label: "Activo",
								},
								{
									id: 2,
									value: SubscriptionStatus.INACTIVE,
									label: "Inactivo",
								},
								{
									id: 3,
									value: SubscriptionStatus.CANCELLED,
									label: "Cancelado",
								},
								{
									id: 4,
									value: SubscriptionStatus.PAST_DUE,
									label: "Expirado",
								},
							]}
							defaultValue={{
								id: 1,
								value: SubscriptionStatus.ACTIVE,
								label: "Activo",
							}}
							className={`w-full border rounded-2xl ${subscriptionStatusClass[subscriptionStatus as SubscriptionStatus]}`}
						/>

						<label className="block mt-4 mb-2 text-sm font-medium text-gray-700">
							Contraseña
						</label>
						<Input
							{...register("password")}
							placeholder="Contraseña"
							type="password"
							className="mb-2"
							error={errors.password?.message}
						/>

						<label className="block mt-4 mb-2 text-sm font-medium text-gray-700">
							Confirmar Contraseña
						</label>
						<Input
							{...register("confirmPassword")}
							placeholder="Confirmar contraseña"
							type="password"
							className="mb-2"
							error={errors.confirmPassword?.message}
						/>
					</Card>
				</div>
				<StickyFooterPanel className="z-0">
					<div className="text-end">
						<DefaultButton
							type="submit"
							variant="normal"
							size="big"
							className="inline-flex items-center justify-center"
							loading={isPending || isLoading}
							disabled={isPending || isError}
						>
							Guardar Cambios
						</DefaultButton>
					</div>
				</StickyFooterPanel>
			</form>
		</>
	);
}

UserActionPage.authenticate = {
	permissions: ONLY_ADMIN_ROLE,
};

UserActionPage.Layout = AppLayout;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const {permissions} = getAuthCredentials(ctx);
	return {
		props: {
			userPermissions: permissions,
		},
	};
};
