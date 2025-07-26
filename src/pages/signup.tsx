// pages/signup.tsx

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useRouter} from "next/router";
import Link from "next/link";

import {registerSchema,RegisterSchema} from "@/schemas/registerSchema";
import {useRegisterMutation} from "@/data/user";
import {ButtonPrimary,Input,Logo,Seo} from "@/components/atoms";
import {Field,Label} from "@/components/atoms/Fieldset";
import {showError} from "@/utils/toasts";
import {MainLayout} from "@/components/organisms";

const Signup = () => {
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: {errors},
	} = useForm<RegisterSchema>({
		resolver: zodResolver(registerSchema),
		mode: "onBlur",
	});

	const {mutate: registerMutation,isPending} = useRegisterMutation();

	const onSubmit = (data: RegisterSchema) => {
		const {confirmPassword,...registerInput} = data;

		registerMutation(registerInput,{
			onSuccess: () => {
				router.push("/login");
			},
			onError: (error: any) => {
				showError(error.response?.data?.message || "Error al registrar");
			},
		});
	};

	return (
		<div className="min-h-screen flex flex-col items-center justify-center px-4">
			<Seo title="Registro – Escala Terapia" noIndex />

			<div className="mb-8 flex items-center justify-center">
				<Logo />
			</div>

			<div className="w-full max-w-md space-y-8">
				<form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit(onSubmit)}>
					<Field className="block">
						<Label>Nombre completo</Label>
						<Input
							type="text"
							placeholder="Ej. Ana López"
							{...register("name")}
							error={errors.name?.message}
						/>
					</Field>

					<Field className="block">
						<Label>Correo electrónico</Label>
						<Input
							type="email"
							placeholder="ejemplo@correo.com"
							{...register("email")}
							error={errors.email?.message}
						/>
					</Field>

					<Field className="block">
						<Label>Contraseña</Label>
						<Input
							type="password"
							{...register("password")}
							error={errors.password?.message}
						/>
					</Field>

					<Field className="block">
						<Label>Confirmar contraseña</Label>
						<Input
							type="password"
							{...register("confirmPassword")}
							error={errors.confirmPassword?.message}
						/>
					</Field>

					<ButtonPrimary type="submit" disabled={isPending}>
						{isPending ? "Cargando..." : "Crear cuenta"}
					</ButtonPrimary>
				</form>

				<div className="text-center text-sm text-neutral-700 dark:text-neutral-300">
					¿Ya tienes una cuenta?{" "}
					<Link href="/login" className="font-medium underline">
						Inicia sesión
					</Link>
				</div>
			</div>
		</div>
	);
};

Signup.Layout = MainLayout;

export default Signup;
