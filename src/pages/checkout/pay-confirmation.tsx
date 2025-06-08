import {DefaultButton,Divider} from "@/components/atoms";
import {MainLayout} from "@/components/organisms";
import Image from "next/image";

export default function PayConfirmation() {
	return (
		<main className="container mt-10 mb-24 sm:mt-16 lg:mb-32">
			<div className="mx-auto flex w-full max-w-4xl flex-col gap-y-12 px-4 sm:rounded-2xl sm:p-6 xl:p-8">
				<h1 className="text-4xl font-semibold sm:text-5xl">¡Felicidades 🎉!</h1>
				<Divider />

				{/* Sección de resumen */}
				<section>
					<h3 className="text-2xl font-semibold">Tu subscripción</h3>
					<div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-6">
						<div className="w-full sm:w-40">
							<div className="aspect-w-4 aspect-h-3 sm:aspect-h-4 overflow-hidden rounded-2xl relative">
								<Image
									fill
									alt="Imagen de suscripción"
									className="object-cover"
									src="https://images.pexels.com/photos/6373478/pexels-photo-6373478.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
								/>
							</div>
						</div>
						<div className="flex flex-col gap-y-3 text-start sm:pl-5">
							<span className="text-sm text-neutral-500 dark:text-neutral-400">Subscripción</span>
							<span className="text-lg font-medium text-neutral-800 dark:text-white">Profesional</span>
							<p className="text-sm text-neutral-500 dark:text-neutral-400">
								Detalles completos disponibles en tu{" "}
								<a
									href="/admin"
									className="text-primary-600 hover:text-primary-700 dark:text-primary-500 dark:hover:text-primary-400"
								>
									Administrador Web
								</a>
							</p>
							<Divider className="w-10" />
						</div>
					</div>
				</section>

				{/* Fechas */}
				<section className="flex flex-col divide-y divide-neutral-200 rounded-3xl border border-neutral-200 sm:flex-row sm:divide-x sm:divide-y-0 dark:divide-neutral-700 dark:border-neutral-700">
					<div className="flex flex-1 gap-x-4 p-5">
						<div className="flex flex-col">
							<span className="text-sm text-neutral-400">Inicio</span>
							<span className="mt-1.5 text-lg font-semibold text-neutral-900 dark:text-white">12 Ago 2025</span>
						</div>
					</div>
					<div className="flex flex-1 gap-x-4 p-5">
						<div className="flex flex-col">
							<span className="text-sm text-neutral-400">Finaliza</span>
							<span className="mt-1.5 text-lg font-semibold text-neutral-900 dark:text-white">12 Ago 2026</span>
						</div>
					</div>
				</section>

				{/* Detalle del plan */}
				<section>
					<h3 className="text-2xl font-semibold">Detalle de la subscripción</h3>
					<div className="mt-5 grid gap-6 sm:grid-cols-2">
						<ul className="text-sm text-neutral-600 dark:text-neutral-300 space-y-3">
							<li>✅ Acceso ilimitado a formularios clínicos</li>
							<li>✅ Historial de pacientes y estadísticas</li>
							<li>✅ Soporte prioritario por correo</li>
							<li>✅ Notificaciones personalizadas</li>
						</ul>
						<div className="flex flex-col justify-between bg-neutral-100 dark:bg-neutral-800 rounded-2xl p-5">
							<div>
								<p className="text-sm text-neutral-500">Costo anual</p>
								<p className="text-3xl font-bold text-neutral-900 dark:text-white">MX$ 499.00</p>
							</div>
							<p className="mt-4 text-xs text-neutral-500">
								* Se renovará automáticamente a menos que canceles antes del próximo ciclo.
							</p>
						</div>
					</div>
				</section>

				<div>
					<DefaultButton className="w-full sm:w-auto">Ir al Administrador</DefaultButton>
				</div>
			</div>
		</main>
	);
}

PayConfirmation.Layout = MainLayout;
