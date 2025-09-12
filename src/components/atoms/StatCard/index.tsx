import {ReactNode} from 'react';
import classNames from 'classnames';

type Props = {
	title: string;
	value: string | number;
	icon: ReactNode;
	variant?: 'primary' | 'secondary' | 'neutral'; // opcional
};

const variantClasses: Record<string,string> = {
	primary: 'bg-primary-100 text-primary-700',
	secondary: 'bg-secondary-100 text-secondary-700',
	neutral: 'bg-neutral-100 text-neutral-700',
};

const StatCard = ({
	title,
	value,
	icon,
	variant = 'primary',
}: Props) => {
	return (
		<div className="flex items-center gap-4 p-4 rounded-md bg-white shadow-box transition hover:shadow-lg">
			<div
				className={classNames(
					'flex items-center justify-center w-12 h-12 rounded-full',
					variantClasses[variant]
				)}
			>
				{icon}
			</div>
			<div className="flex flex-col">
				<span className="text-sm text-gray-500">{title}</span>
				<span className="text-xl font-semibold text-gray-900">{value}</span>
			</div>
		</div>
	);
};

export default StatCard;
