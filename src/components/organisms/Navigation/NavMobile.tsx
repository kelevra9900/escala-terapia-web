import Link from 'next/link'
import {
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
} from '@headlessui/react'
import {ChevronDownIcon} from '@heroicons/react/24/solid'

import {NavItemType} from '@/components/atoms/Navigation/Item'
import {ButtonClose,Logo} from '@/components/atoms'
import {SwitchDarkMode} from '@/components/molecules'


export interface NavMobileProps {
	data?: NavItemType[]
	onClickClose?: () => void
}

const NavMobile: React.FC<NavMobileProps> = ({
	data = [],
	onClickClose,
}) => {
	const _renderMenuChild = (item: NavItemType) => {
		return (
			<ul className="nav-mobile-sub-menu pb-1 ps-6 text-base">
				{item.children?.map((i,index) => (
					<Disclosure key={i.href + index} as="li">
						<Link
							href={{
								pathname: i.href || undefined,
							}}
							className="mt-0.5 flex rounded-lg px-4 text-sm font-medium text-neutral-900 hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-800"
						>
							<span
								className={`py-2.5 pe-3 ${!i.children ? 'block w-full' : ''}`}
							>
								{i.name}
							</span>
							{i.children && (
								<span
									className="flex flex-1"
									onClick={(e) => e.preventDefault()}
								>
									<DisclosureButton
										as="span"
										className="flex flex-1 justify-end py-2.5"
									>
										<ChevronDownIcon
											className="ms-2 h-4 w-4 text-neutral-500"
											aria-hidden="true"
										/>
									</DisclosureButton>
								</span>
							)}
						</Link>
						{i.children && (
							<DisclosurePanel>{_renderMenuChild(i)}</DisclosurePanel>
						)}
					</Disclosure>
				))}
			</ul>
		)
	}

	const _renderItem = (item: NavItemType,index: number) => {
		return (
			<Disclosure
				key={item.id + index}
				as="li"
				className="text-neutral-900 dark:text-white"
			>
				<Link
					className="flex w-full rounded-lg px-4 text-sm font-medium uppercase tracking-wide hover:bg-neutral-100 dark:hover:bg-neutral-800"
					href={{
						pathname: item.href || undefined,
					}}
				>
					<span
						className={`py-2.5 pe-3 ${!item.children ? 'block w-full' : ''}`}
					>
						{item.name}
					</span>
					{item.children && (
						<span className="flex flex-1" onClick={(e) => e.preventDefault()}>
							<DisclosureButton
								as="span"
								className="flex flex-1 items-center justify-end py-2.5"
							>
								<ChevronDownIcon
									className="ms-2 h-4 w-4 text-neutral-500"
									aria-hidden="true"
								/>
							</DisclosureButton>
						</span>
					)}
				</Link>
				{item.children && (
					<DisclosurePanel>{_renderMenuChild(item)}</DisclosurePanel>
				)}
			</Disclosure>
		)
	}

	return (
		<div className="h-screen w-full divide-y-2 divide-neutral-100 overflow-y-auto bg-white py-2 shadow-lg ring-1 dark:divide-neutral-800 dark:bg-neutral-900 dark:ring-neutral-700">
			<div className="px-5 py-6">
				<Logo />
				<div className="mt-5 flex flex-col text-sm text-neutral-700 dark:text-neutral-300">
					<span>Escala terapia</span>

					<div className="mt-4 flex items-center justify-between">
						{/* <SocialsList /> */}
						<span className="block">
							<SwitchDarkMode className="bg-neutral-100 dark:bg-neutral-800" />
						</span>
					</div>
				</div>
				<span className="absolute end-2 top-2 p-1">
					<ButtonClose onClick={onClickClose} />
				</span>
			</div>
			<ul className="flex flex-col space-y-1 px-2 py-6">
				{data.map(_renderItem)}
			</ul>
		</div>
	)
}

export default NavMobile