import {GetServerSideProps} from "next";
import Image from "next/image";
import {Tab,TabGroup,TabList,TabPanel,TabPanels} from '@headlessui/react';

import {MainLayout} from "@/components/organisms";
import {getAuthCredentials} from "@/utils/auth";
import {
	DefaultButton,
	Description,
	Divider,
	Input,
	Textarea,
} from "@/components/atoms";
import {Field,Label} from "@/components/atoms/Fieldset";

export default function Checkout() {
	return (
		<main className="container mx-auto mt-10 mb-24 flex flex-col gap-10 px-4 md:gap-14 lg:mb-32 lg:flex-row lg:gap-10">
			{/* Columna izquierda */}
			<div className="w-full lg:w-3/5 xl:w-2/3">
				<div className="flex w-full flex-col gap-y-8 rounded-3xl border border-neutral-200 px-4 py-6 sm:p-6 xl:p-8 dark:border-neutral-700">
					<h1 className="text-2xl font-semibold sm:text-3xl lg:text-4xl">Confirmación y pago</h1>
					<Divider />

					<div className="pt-3 sm:pt-5">
						<h3 className="text-xl font-semibold sm:text-2xl">Método de pago</h3>
						<div className="my-4 w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

						<TabGroup className="mt-4 sm:mt-6">
							<TabList className="flex flex-wrap gap-2 text-sm">
								<Tab className="flex items-center gap-x-2 rounded-full px-5 py-2.5 font-medium transition-all data-hover:bg-neutral-100 data-selected:bg-neutral-900 data-selected:text-white dark:data-selected:bg-neutral-100 dark:data-selected:text-black">
									PayPal
								</Tab>
								<Tab className="flex items-center gap-x-2 rounded-full px-5 py-2.5 font-medium transition-all data-hover:bg-neutral-100 data-selected:bg-neutral-900 data-selected:text-white dark:data-selected:bg-neutral-100 dark:data-selected:text-black">
									Tarjeta de crédito
								</Tab>
							</TabList>

							<TabPanels className="mt-6">
								{/* Tarjeta */}
								<TabPanel className="flex flex-col gap-6">
									<Field>
										<Label>Número de tarjeta</Label>
										<Input placeholder="1234 5678 9012 3456" className="mt-1.5" />
									</Field>

									<Field>
										<Label>Nombre del titular</Label>
										<Input placeholder="JUAN PÉREZ" />
									</Field>

									<div className="flex flex-col gap-6 sm:flex-row">
										<Field className="flex-1">
											<Label>Fecha de expiración</Label>
											<Input placeholder="MM/AA" className="mt-1.5" />
										</Field>
										<Field className="flex-1">
											<Label>CVC</Label>
											<Input placeholder="123" className="mt-1.5" />
										</Field>
									</div>
								</TabPanel>

								{/* PayPal */}
								<TabPanel className="flex flex-col gap-6">
									<Field>
										<Label>Correo de PayPal</Label>
										<Input type="email" placeholder="correo@ejemplo.com" />
									</Field>
									<Field>
										<Label>Contraseña</Label>
										<Input type="password" placeholder="••••••••" />
									</Field>
									<Field>
										<Label>Mensaje</Label>
										<Textarea placeholder="Opcional: mensaje para el terapeuta" />
										<Description className="mt-1 text-sm text-neutral-500">
											Escribe un mensaje si deseas compartir algo adicional.
										</Description>
									</Field>
								</TabPanel>
							</TabPanels>
						</TabGroup>

						<DefaultButton className="mt-10 w-full sm:w-auto text-base">
							Confirmar y pagar
						</DefaultButton>
					</div>
				</div>
			</div>

			{/* Divider móvil */}
			<Divider className="block lg:hidden" />

			{/* Columna derecha */}
			<div className="w-full lg:w-2/5 xl:w-1/3">
				<div className="flex w-full flex-col gap-6 rounded-3xl border border-neutral-200 px-4 py-6 sm:p-6 xl:p-8 dark:border-neutral-700">
					<div className="flex flex-col sm:flex-row sm:items-center gap-5">
						<div className="w-full sm:w-40">
							<div className="aspect-w-4 aspect-h-3 sm:aspect-h-4 rounded-2xl overflow-hidden relative">
								<Image
									alt="Resumen de la reserva"
									fill
									sizes="200px"
									src="https://images.pexels.com/photos/6373478/pexels-photo-6373478.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
									className="object-cover"
								/>
							</div>
						</div>
						<div className="flex flex-col justify-between gap-3 text-start sm:pl-5">
							<div>
								<p className="text-sm text-neutral-500">Suscripción</p>
								<h2 className="text-base font-medium">Profesional</h2>
							</div>
							<p className="text-sm text-neutral-500">
								Este es un resumen de tu suscripción. Puedes revisar los detalles y confirmar el pago.
							</p>
							<p className="text-lg font-semibold">MX$ 499.00</p>
							<Divider className="w-10" />
						</div>
					</div>
				</div>
			</div>
		</main>

	);
}

Checkout.Layout = MainLayout;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const {permissions} = getAuthCredentials(ctx);
	return {
		props: {
			userPermissions: permissions,
		},
	};
};
