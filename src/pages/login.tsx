import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import Link from "next/link";
import {useRouter} from "next/router";

import {loginSchema,LoginSchema} from "@/schemas/loginSchema";
import {useLoginMutation} from "@/data/user";
import {ButtonPrimary,Input,Logo,Seo} from "@/components/atoms";
import {Field,Label} from "@/components/atoms/Fieldset";

import {showError} from "@/utils/toasts";
import {MainLayout} from "@/components/organisms";

const Login = () => {
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: {errors},
	} = useForm<LoginSchema>({
		resolver: zodResolver(loginSchema),
		mode: "onBlur",
	});

	const {mutate: loginMutation,isPending,isError} = useLoginMutation();

	const onSubmit = async (data: LoginSchema) => {
		try {
			loginMutation(data,{
				onSuccess: () => {
					router.push("/");
				},
				onError: (error) => {
					console.log("Error on login",error)
				}
			});
		} catch (error) {
			console.error(error);
			showError("Error al iniciar sesión. Verifica tus credenciales.");
		}
	};

	return (
		<div className="min-h-screen flex flex-col items-center justify-center px-4">
			<Seo
				title="Iniciar sesión – Escala Terapia"
				description="Accede a tu cuenta de Escala Terapia para gestionar tus sesiones, formularios y pacientes."
				url="https://escala-terapia.com/login"
				image="https://escala-terapia.com/images/login-og.jpg"
				noIndex
			/>

			<div className="mb-8 flex items-center justify-center">
				<Logo />
			</div>

			<div className="w-full max-w-md space-y-8">
				<form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit(onSubmit)}>
					<Field className="block">
						<Label className="text-neutral-800 dark:text-neutral-200">Correo electrónico</Label>
						<Input
							type="email"
							placeholder="example@example.com"
							{...register("email")}
							error={errors.email?.message}
						/>
					</Field>

					<Field className="block">
						<div className="flex items-center justify-between text-neutral-800 dark:text-neutral-200">
							<Label>Contraseña</Label>
							<Link href="/forgot-password" className="text-sm font-medium underline">
								¿Olvidaste tu contraseña?
							</Link>
						</div>
						<Input
							type="password"
							{...register("password")}
							error={errors.password?.message}
						/>
					</Field>

					<ButtonPrimary type="submit" disabled={isPending}>
						{isPending ? "Cargando..." : "Login"}
					</ButtonPrimary>
				</form>

				{isError && (
					<p className="text-sm text-red-500 text-center mt-2">
						Error al iniciar sesión. Verifica tus credenciales.
					</p>
				)}

				<div className="block text-center text-sm text-neutral-700 dark:text-neutral-300">
					¿No tienes una cuenta?{" "}
					<Link href="/signup" className="font-medium underline">
						Crea una cuenta
					</Link>
				</div>
			</div>
		</div>
	);
};

Login.Layout = MainLayout;

export default Login;
