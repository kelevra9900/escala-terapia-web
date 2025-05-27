import {
	Popover,
	PopoverButton,
	PopoverPanel,
	Transition,
} from '@headlessui/react'
import {FC,Fragment} from 'react'
import {BellIcon} from '@heroicons/react/24/outline'

import {Avatar} from '@/components/atoms'
import avatar4 from '@/assets/avatars/Image-4.png'
import avatar5 from '@/assets/avatars/Image-5.png'
import avatar6 from '@/assets/avatars/Image-6.png'

const notifications = [
	{
		name: 'Roger Torres',
		description: 'Measure actions your users take',
		time: '3 minutes ago',
		href: '#a',
		avatar: avatar4,
	},
	{
		name: 'Leo Messi',
		description: 'Create your own targeted content',
		time: '1 minute ago',
		href: '#a',
		avatar: avatar5,
	},
	{
		name: 'Leo Kante',
		description: 'Keep track of your growth',
		time: '3 minutes ago',
		href: '#a',
		avatar: avatar6,
	},
]

interface Props {
	className?: string
}

const NotifyDropdown: FC<Props> = ({className = ''}) => {
	return (
		<>
			<Popover className={`relative flex ${className}`}>
				{({open}) => (
					<>
						<PopoverButton
							className={` ${open ? '' : 'text-opacity-90'
								} group relative inline-flex h-10 w-10 items-center justify-center self-center rounded-full text-base font-medium hover:bg-gray-100 hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 dark:hover:bg-neutral-800 sm:h-12 sm:w-12`}
						>
							<span className="absolute end-2 top-2 h-2 w-2 rounded-full bg-blue-500"></span>
							<BellIcon className="h-6 w-6" />
						</PopoverButton>
						<Transition
							as={Fragment}
							enter="transition ease-out duration-200"
							enterFrom="opacity-0 translate-y-1"
							enterTo="opacity-100 translate-y-0"
							leave="transition ease-in duration-150"
							leaveFrom="opacity-100 translate-y-0"
							leaveTo="opacity-0 translate-y-1"
						>
							<PopoverPanel className="absolute -end-28 top-full z-10 w-screen max-w-xs px-4 sm:end-0 sm:max-w-sm sm:px-0">
								<div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-black ring-opacity-5">
									<div className="relative grid gap-8 bg-white p-7 dark:bg-neutral-800">
										<h3 className="text-xl font-semibold">
											Notificaciones
										</h3>
										{notifications.map((item,index) => (
											<a
												key={index}
												href={item.href}
												className="relative -m-3 flex rounded-lg p-2 pe-8 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 dark:hover:bg-gray-700"
											>
												<Avatar
													imgUrl={item.avatar}
													sizeClass="w-8 h-8 sm:w-12 sm:h-12"
												/>
												<div className="ms-3 space-y-1 sm:ms-4">
													<p className="text-sm font-medium text-gray-900 dark:text-gray-200">
														{item.name}
													</p>
													<p className="text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
														{item.description}
													</p>
													<p className="text-xs text-gray-400 dark:text-gray-400">
														{item.time}
													</p>
												</div>
												<span className="absolute end-1 top-1/2 h-2 w-2 -translate-y-1/2 transform rounded-full bg-blue-500"></span>
											</a>
										))}
									</div>
								</div>
							</PopoverPanel>
						</Transition>
					</>
				)}
			</Popover>
		</>
	)
}

export default NotifyDropdown