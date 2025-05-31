import {Avatar,ButtonPrimary,Divider,Input} from "@/components/atoms";
import {Field,Label} from "@/components/atoms/Fieldset";
import {ImageAdd02Icon} from "@/components/atoms/Icons";
import {useGetMeInfo} from "@/data/user";

const Account = () => {
	const {data: profile,isLoading,isError} = useGetMeInfo();

	if (isError) {
		return <div className="container mx-auto px-4 mb-24">Error loading profile</div>;
	}

	return (
		<div className="container mx-auto px-4 mb-24 space-y-24 lg:mb-28 lg:space-y-28">
			<Divider className="my-8 w-14!" />
			<div className="flex flex-col md:flex-row">
				{/* Avatar */}
				<div className="flex shrink-0 items-start">
					<div className="relative flex overflow-hidden rounded-full">
						{isLoading ? (
							<div className="h-32 w-32 rounded-full bg-neutral-200 dark:bg-neutral-700 animate-pulse" />
						) : (
							<>
								<Avatar containerClassName="h-32 w-32" />
								<div className="absolute inset-0 flex cursor-pointer flex-col items-center justify-center bg-black/60 text-neutral-50">
									<ImageAdd02Icon className="h-6 w-6" />
									<span className="mt-1 text-xs">Cambiar foto</span>
								</div>
								<input type="file" className="absolute inset-0 cursor-pointer opacity-0" />
							</>
						)}
					</div>
				</div>

				{/* Form */}
				<div className="mt-10 max-w-3xl grow space-y-6 md:mt-0 md:ps-16">
					{/* Nombre */}
					<Field>
						<Label>Nombre</Label>
						{isLoading ? (
							<div className="h-10 mt-2 rounded bg-neutral-200 dark:bg-neutral-700 animate-pulse" />
						) : (
							<Input className="mt-1.5" defaultValue={profile?.name} />
						)}
					</Field>

					{/* Email */}
					<Field>
						<Label>Correo electrónico</Label>
						{isLoading ? (
							<div className="h-10 mt-2 rounded bg-neutral-200 dark:bg-neutral-700 animate-pulse" />
						) : (
							<Input className="mt-1.5" defaultValue={profile?.email} />
						)}
					</Field>

					{/* Teléfono */}
					<Field>
						<Label>Teléfono</Label>
						{isLoading ? (
							<div className="h-10 mt-2 rounded bg-neutral-200 dark:bg-neutral-700 animate-pulse" />
						) : (
							<Input className="mt-1.5" defaultValue="003 888 232" />
						)}
					</Field>

					{/* Botón */}
					<div className="pt-4">
						{isLoading ? (
							<div className="h-12 w-40 rounded bg-neutral-200 dark:bg-neutral-700 animate-pulse" />
						) : (
							<ButtonPrimary>Guardar cambios</ButtonPrimary>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Account;
