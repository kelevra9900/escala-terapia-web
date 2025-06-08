import cn from 'classnames';
import {twMerge} from 'tailwind-merge';

type BadgeProps = {
	className?: string;
	color?: string;
	textColor?: string;
	text?: string;
	textKey?: string;
	animate?: boolean;
	variant?: 'solid' | 'outline';
};

const Badge: React.FC<BadgeProps> = (props) => {
	const {
		className,
		color: colorOverride,
		textColor: textColorOverride,
		text,
		textKey,
		animate = false,
		variant = 'solid',
	} = props;

	const isOutline = variant === 'outline';


	const classes = {
		root: 'px-3 py-1.5 rounded text-xs whitespace-nowrap relative font-medium inline-flex items-center min-w-[80px] justify-center',
		animate: 'animate-pulse',
		default: 'accent-current',
		text: 'text-light',
		solidBg: 'bg-brand-moss text-white',
		// border gray light
		outline: 'border border-gray-200 text-gray-700 dark:border-gray-700 dark:text-gray-300',
	};

	return (
		<>
			<span
				className={twMerge(
					cn(
						'inline-block',
						classes.root,
						{
							[classes.default]: !colorOverride,
							[classes.text]: !textColorOverride,
							[classes.animate]: animate,
							[classes.outline]: isOutline,
							[classes.solidBg]: !isOutline && !colorOverride,
						},
						colorOverride,
						textColorOverride,
						className
					)
				)}
			>
				{textKey ? textKey : text}
			</span>
		</>
	);
};

export default Badge;
