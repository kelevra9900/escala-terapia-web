import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import {forgotPasswordSchema,ForgotPasswordSchema} from "@/schemas/forgotPasswordSchema";
import {useForgotPasswordMutation} from "@/data/user";
import {ButtonPrimary,Input,Logo,Seo} from "@/components/atoms";
import {Field,Label} from "@/components/atoms/Fieldset";
import {showError,showSuccess} from "@/utils/toasts";
import {MainLayout} from "@/components/organisms";

const ForgotPassword = () => {
	const {
		register,
		handleSubmit,
		formState: {errors},
	} = useForm<ForgotPasswordSchema>({
		resolver: zodResolver(forgotPasswordSchema),
		mode: "onBlur",
	});

	const {mutate,isPending,isSuccess} = useForgotPasswordMutation();

	const onSubmit = (data: ForgotPasswordSchema) => {
		mutate(data.email,{
			onSuccess: () => {
				showSuccess("Hemos enviado un enlace a tu correo.");
			},
			onError: () => {
				showError("No pudimos procesar tu solicitud. Intenta más tarde.");
			},
		});
	};

	return (
		<div className="min-h-screen flex flex-col items-center justify-center px-4">
			<Seo
				title="Recuperar contraseña – Escala Terapia"
				description="Solicita un enlace para restablecer tu contraseña."
				url="https://escala-terapia.com/forgot-password"
				noIndex
			/>

			<div className="mb-8 flex items-center justify-center">
				<Logo />
			</div>

			<div className="w-full max-w-md space-y-6">
				<h1 className="text-center text-2xl font-semibold text-neutral-800 dark:text-neutral-200">
					¿Olvidaste tu contraseña?
				</h1>

				<form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit(onSubmit)}>
					<Field>
						<Label>Correo electrónico</Label>
						<Input
							type="email"
							placeholder="tuemail@ejemplo.com"
							{...register("email")}
							error={errors.email?.message}
						/>
					</Field>

					<ButtonPrimary type="submit" disabled={isPending || isSuccess}>
						{isPending ? "Enviando..." : isSuccess ? "Correo enviado" : "Enviar enlace"}
					</ButtonPrimary>
				</form>

				{isSuccess && (
					<p className="text-center text-green-600 text-sm">
						Revisa tu bandeja de entrada para continuar.
					</p>
				)}
			</div>
		</div>
	);
};

ForgotPassword.Layout = MainLayout;

export default ForgotPassword;
