import React,{FC} from 'react'
import {ArrowRightIcon} from '@heroicons/react/24/solid'
import Image from 'next/image'

import {Badge,ButtonCircle,Input} from '@/components/atoms'
import rightImg from '@/assets/images/subscribe.png'


export interface SectionSubscribe2Props {
	className?: string
}

const SectionSubscribe: FC<SectionSubscribe2Props> = ({className = ''}) => {
	return (
		<div
			className={`nc-SectionSubscribe2 relative flex flex-col lg:flex-row lg:items-center ${className}`}
		>
			<div className="mb-10 flex-shrink-0 lg:mb-0 lg:me-10 lg:w-2/5">
				<h2 className="text-4xl font-semibold font-(family-name:--font-playfair)">
					Únete a nuestra comunidad de terapeutas 🧠
				</h2>
				<span className="mt-5 block text-neutral-500 dark:text-neutral-400 font-(family-name:--font-inter)">
					Recibe recursos clínicos, actualizaciones sobre nuevos formularios y consejos
					para mejorar tu práctica profesional.
				</span>
				<ul className="mt-10 space-y-4">
					<li className="flex items-center gap-x-4">
						<Badge name="01" />
						<span className="font-medium text-neutral-700 dark:text-neutral-300 font-(family-name:--font-inter)">
							Accede a formularios clínicos exclusivos
						</span>
					</li>
					<li className="flex items-center gap-x-4">
						<Badge color="red" name="02" />
						<span className="font-medium text-neutral-700 dark:text-neutral-300 font-(family-name:--font-inter)">
							Aprende a interpretar resultados con reportes automáticos
						</span>
					</li>
				</ul>
				<form className="relative mt-10 max-w-sm">
					<Input
						required
						aria-required
						placeholder={'Ingresa tu correo electrónico'}
						type="email"
						rounded="rounded-full"
						sizeClass="h-12 px-5 py-3"
					/>
					<ButtonCircle
						type="submit"
						className="absolute end-1.5 top-1/2 -translate-y-1/2"
						size="w-10 h-10"
					>
						<ArrowRightIcon className="h-5 w-5 rtl:rotate-180" />
					</ButtonCircle>
				</form>
			</div>
			<div className="flex-grow">
				<Image alt="" src={rightImg} />
			</div>
		</div>
	)
}

export default SectionSubscribe