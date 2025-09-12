import Link from 'next/link';
import {
	UserPlusIcon,
	ClipboardDocumentListIcon,
	UserGroupIcon,
} from '@heroicons/react/24/solid';
import {twMerge} from 'tailwind-merge';
import {JSX} from 'react';

type ActionItem = {
	label: string;
	href: string;
	icon: JSX.Element;
	bgColor?: string;
};

const actions: ActionItem[] = [
	{
		label: 'Invitar paciente',
		href: '/therapist/invitations/new',
		icon: <UserGroupIcon className="w-5 h-5 text-white" />,
		bgColor: 'bg-blue-500',
	},
	{
		label: 'Crear formulario',
		href: '/therapist/forms/new',
		icon: <ClipboardDocumentListIcon className="w-5 h-5 text-white" />,
		bgColor: 'bg-green-500',
	},
	{
		label: 'Nuevo paciente',
		href: '/therapist/clients/new',
		icon: <UserPlusIcon className="w-5 h-5 text-white" />,
		bgColor: 'bg-indigo-500',
	},
];

const QuickActions = () => {
	return (
		<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
			{actions.map((action) => (
				<Link
					key={action.href}
					href={action.href}
					className={twMerge(
						'flex items-center gap-3 p-4 rounded-md text-white shadow hover:opacity-90 transition-all',
						action.bgColor
					)}
				>
					<div className="p-2 bg-white/10 rounded-full">
						{action.icon}
					</div>
					<span className="text-sm font-semibold">{action.label}</span>
				</Link>
			))}
		</div>
	);
};

export default QuickActions;
