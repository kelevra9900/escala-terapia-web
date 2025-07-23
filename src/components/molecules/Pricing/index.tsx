import {FC} from 'react'
import {CheckIcon} from '@heroicons/react/24/solid'

import {ButtonPrimary,ButtonSecondary} from "@/components/atoms"
import {PricingItemInterface} from "@/types"

interface PriceingItemProps {
	pricing: PricingItemInterface
	key: number
	onClick?: () => void
	loading?: boolean
}

const PricingItem: FC<PriceingItemProps> = ({pricing,key,onClick,loading}) => {
	return (
		<div
			key={'pricing-' + key}
			onClick={onClick}
			className={`relative flex h-full flex-col overflow-hidden rounded-3xl border-2 px-6 py-8 ${pricing.isPopular
				? 'border-primary-500'
				: 'border-neutral-100 dark:border-neutral-700'
				}`}>
			{pricing.isPopular && (
				<span className="absolute end-3 top-3 z-10 rounded-full bg-primary-500 px-3 py-1 text-xs tracking-widest text-white">
					Popular
				</span>
			)}
			<div className="mb-8">
				<h3 className="mb-2 block text-sm font-(family-name:--font-inter) font-medium uppercase tracking-widest text-neutral-600 dark:text-neutral-300">
					{pricing.name}
				</h3>
				<h2 className="flex items-center text-5xl font-(family-name:--font-inter) leading-none text-neutral-900 dark:text-neutral-300">
					<span className="font-(family-name:--font-inter)">{pricing.pricing}</span>
					<span className="font-(family-name:--font-inter) ms-1 text-lg font-normal text-neutral-500">
						{pricing.per}
					</span>
				</h2>
			</div>
			<nav className="mb-8 space-y-4">
				{pricing.features.map((item,index) => (
					<li className="flex items-center" key={index}>
						<span className="me-4 inline-flex flex-shrink-0 text-primary-600">
							<CheckIcon className="h-5 w-5" aria-hidden="true" />
						</span>
						<span className="text-neutral-700 font-(family-name:--font-inter) dark:text-neutral-300">
							{item}
						</span>
					</li>
				))}
			</nav>
			<div className="mt-auto flex flex-col">
				{pricing.isPopular ? (
					<ButtonPrimary>Enviar</ButtonPrimary>
				) : (
					<ButtonSecondary>
						<span className="font-medium font-(family-name:--font-inter)">Enviar</span>
					</ButtonSecondary>
				)}
				<p className="mt-3 text-xs text-neutral-500 dark:text-neutral-400 font-(family-name:--font-inter)">
					{pricing.desc}
				</p>
			</div>
		</div>
	)
}

export default PricingItem