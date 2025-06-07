import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import Link from "next/link";
import {useRouter} from "next/router";

import {loginSchema,LoginSchema} from "@/schemas/loginSchema";
import {useLoginMutation} from "@/data/user";
import {ButtonPrimary,Input,Logo} from "@/components/atoms";
import {Field,Label} from "@/components/atoms/Fieldset";

import {showError} from "@/utils/toasts";

const Login = () => {
	// Navigation home page 
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: {errors},
	} = useForm<LoginSchema>({
		resolver: zodResolver(loginSchema),
		mode: "onBlur",
	});

	const loginMutation = useLoginMutation();

	const onSubmit = (data: LoginSchema) => {
		console.log("Errors during login:",errors);
		try {
			loginMutation.mutateAsync(data);
			// fetch query me
			router.push("/");
		}
		catch {
			showError("Error al iniciar sesión. Por favor, verifica tus credenciales.");
		}
	};

	return (
		<div className="min-h-screen flex flex-col items-center justify-center px-4">
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
							<Link href="/" className="text-sm font-medium underline">
								¿Olvidaste tu contraseña?
							</Link>
						</div>
						<Input
							type="password"
							{...register("password")}
							error={errors.password?.message}
						/>
					</Field>

					<ButtonPrimary type="submit" disabled={loginMutation.isPending}>
						{loginMutation.isPending ? "Cargando..." : "Login"}
					</ButtonPrimary>
				</form>

				{loginMutation.isError && (
					<p className="text-sm text-red-500 text-center mt-2">
						Error al iniciar sesión. Verifica tus credenciales.
					</p>
				)}

				<div className="block text-center text-sm text-neutral-700 dark:text-neutral-300">
					¿No tienes una cuenta?{" "}
					<a href="/signup" className="font-medium underline">
						Crea una cuenta
					</a>
				</div>
			</div>
		</div>
	);
};

export default Login;
