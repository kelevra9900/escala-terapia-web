import {ButtonPrimary,Divider,Input,Textarea} from '@/components/atoms'
import {Field,Label} from '@/components/atoms/Fieldset'
import {SectionSubscribe,SocialsList} from '@/components/molecules'
import {MainLayout} from '@/components/organisms'
import {Metadata} from 'next'

const info = [
	{
		title: '🗺 Dirección',
		description: 'Photo booth tattooed prism, portland taiyaki hoodie neutra typewriter',
	},
	{
		title: '💌 Correo',
		description: 'example@example.com',
	},
	{
		title: '☎ Teléfono',
		description: '000-123-456-7890',
	},
]

export const metadata: Metadata = {
	title: 'Contact Us',
	description: 'Explore contact us page',
}

const PageContact = () => {
	return (
		<div className="pt-10 pb-24 sm:py-24 lg:py-32">
			<div className="container mx-auto max-w-7xl">
				<div className="grid shrink-0 grid-cols-1 gap-x-5 gap-y-12 sm:grid-cols-2">
					<div>
						<h1 className="max-w-2xl text-4xl font-semibold sm:text-5xl">Contácto</h1>
						<div className="mt-10 flex max-w-sm flex-col gap-y-8 sm:mt-20">
							{info.map((item,index) => (
								<div key={index}>
									<h3 className="text-sm font-semibold tracking-wider uppercase dark:text-neutral-200">{item.title}</h3>
									<span className="mt-2 block text-neutral-500 dark:text-neutral-400">{item.description}</span>
								</div>
							))}
							<div>
								<h3 className="text-sm font-semibold tracking-wider uppercase dark:text-neutral-200">🌏 Redes sociales</h3>
								<SocialsList className="mt-2" />
							</div>
						</div>
					</div>
					<form className="grid grid-cols-1 gap-6" action="#" method="post">
						<Field className="block">
							<Label>Nombre completo</Label>
							<Input placeholder="Jhon Doe" type="text" className="mt-1" />
						</Field>
						<Field className="block">
							<Label>Correo electrónico</Label>
							<Input type="email" placeholder="example@example.com" className="mt-1" />
						</Field>
						<Field className="block">
							<Label>Mensaje</Label>
							<Textarea className="mt-1" rows={6} />
						</Field>
						<div>
							<ButtonPrimary type="submit">Enviar mensaje</ButtonPrimary>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

PageContact.Layout = MainLayout;

export default PageContact
