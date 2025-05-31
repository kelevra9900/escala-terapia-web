import {useState} from "react";
import Link from "next/link";

import {ButtonPrimary,Input,Logo} from "@/components/atoms";
import {Field,Label} from "@/components/atoms/Fieldset";
import {LoginInput} from "@/types";
import {useLoginMutation} from "@/data/user";

const Login = () => {
	const [formData,setFormData] = useState<LoginInput>({
		email: "",
		password: "",
	});

	const [formErrors,setFormErrors] = useState<Record<string,string>>({});
	const loginMutation = useLoginMutation();


	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		console.log("handleSubmit",formData);
		e.preventDefault();
		setFormErrors({});

		loginMutation.mutate(formData,{
			onError: (errors: any) => {
				console.log("Login error:",errors);

				if (errors && typeof errors === "object") {
					setFormErrors(errors);
				}
			},
		});
	};

	return (
		<div className="min-h-screen flex flex-col items-center justify-center px-4">
			{/* Center logo */}
			<div className="mb-8 flex items-center justify-center">
				<Logo />
			</div>
			<div className="w-full max-w-md space-y-8">
				<form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
					<Field className="block">
						<Label className="text-neutral-800 dark:text-neutral-200">
							Correo electrónico
						</Label>
						<Input
							type="email"
							name="email"
							placeholder="example@example.com"
							className="mt-1"
							value={formData.email}
							onChange={handleChange}
						// error={formErrors.email ?? ''}
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
							name="password"
							className="mt-1"
							value={formData.password}
							onChange={handleChange}
						// error={formErrors.password}
						/>
					</Field>

					<ButtonPrimary type="submit" disabled={loginMutation.isPending}>
						{loginMutation.isPending ? "Cargando..." : "Login"}
					</ButtonPrimary>
				</form>

				<div className="block text-center text-sm text-neutral-700 dark:text-neutral-300">
					¿No tienes una cuenta?
					{' '}
					<Link href="/signup" className="font-medium underline">
						Crea una cuenta
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;
