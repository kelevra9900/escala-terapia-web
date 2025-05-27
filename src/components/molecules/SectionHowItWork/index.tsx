import React,{FC} from 'react'
import Image,{StaticImageData} from 'next/image'

import HIW1img from '@/assets/images/HIW1.png'
import HIW2img from '@/assets/images/HIW2.png'
import HIW3img from '@/assets/images/HIW3.png'
import VectorImg from '@/assets/svg/VectorHIW.svg'

export interface SectionHowItWorkProps {
	className?: string
	data?: {
		id: number
		title: string
		desc: string
		img: StaticImageData
		imgDark?: StaticImageData
	}[]
}

export const DEMO_DATA: SectionHowItWorkProps['data'] = [
	{
		id: 1,
		img: HIW1img,
		title: 'Suscríbete a un plan',
		desc: 'Elige el plan que se adapte a tu consulta y desbloquea acceso a formularios clínicos profesionales.',
	},
	{
		id: 2,
		img: HIW2img,
		title: 'Comparte el formulario con tus pacientes',
		desc: 'Envía evaluaciones personalizadas a tus pacientes y obtén sus respuestas en tiempo real.',
	},
	{
		id: 3,
		img: HIW3img,
		title: 'Visualiza reportes clínicos',
		desc: 'Accede a informes automáticos con niveles de ansiedad, estadísticas y seguimiento de progreso.',
	},
];

const SectionHowItWork: FC<SectionHowItWorkProps> = ({
	className = '',
	data = DEMO_DATA,
}) => {
	return (
		<div
			className={`nc-SectionHowItWork ${className}`}
			data-nc-id="SectionHowItWork"
		>
			{/* <Heading isCenter desc="">
				Como funciona
			</Heading> */}
			<div className="relative mt-20 grid gap-20 md:grid-cols-3">
				<Image
					className="absolute inset-x-0 top-10 hidden md:block"
					src={VectorImg}
					alt=""
				/>
				{data.map((item) => (
					<div
						key={item.id}
						className="relative mx-auto flex max-w-xs flex-col items-center"
					>
						{item.imgDark ? (
							<>
								<Image
									className="mx-auto mb-8 block max-w-[180px] dark:hidden"
									src={item.img}
									alt=""
								/>
								<Image
									alt=""
									className="mx-auto mb-8 hidden max-w-[180px] dark:block"
									src={item.imgDark}
								/>
							</>
						) : (
							<Image
								alt=""
								className="mx-auto mb-8 max-w-[180px]"
								src={item.img}
							/>
						)}
						<div className="mt-auto text-center">
							<h3 className="text-xl font-(family-name:--font-inter) font-semibold">{item.title}</h3>
							<span className="mt-5 font-(family-name:--font-inter) block text-neutral-500 dark:text-neutral-400">
								{item.desc}
							</span>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default SectionHowItWork
