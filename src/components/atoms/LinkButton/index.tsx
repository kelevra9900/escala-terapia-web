import NextLink,{LinkProps as NextLinkProps} from 'next/link';
import cn from 'classnames';

const classes = {
	root: 'inline-flex items-center justify-center flex-shrink-0 font-medium leading-none rounded-lg outline-none transition duration-300 ease-in-out focus:outline-none focus:shadow',
	normal: 'bg-brand-green border border-brand-green hover:bg-brand-brown hover:border-brand-brown',
	outline: 'border border-brand-green text-brand-green bg-transparent hover:text-light hover:bg-brand-green ring:text-white',
	disabled: 'border border-neutral-300 bg-neutral-100 text-neutral-500 cursor-not-allowed',
	disabledOutline: 'border border-neutral-300 text-neutral-400 cursor-not-allowed',
	small: 'px-3 py-0 h-9 text-sm h-10',
	medium: 'px-5 py-0 h-12 text-[15px] lg:text-base',
	big: 'px-10 py-0 h-14',
};


export interface ButtonProps {
	className?: string;
	variant?: 'normal' | 'outline';
	size?: 'big' | 'medium' | 'small';
	active?: boolean;
	type?: 'submit' | 'reset' | 'button';
	disabled?: boolean;
	children?: React.ReactNode;
}

const LinkButton: React.FC<NextLinkProps & ButtonProps> = ({
	href,
	children,
	className,
	variant = 'normal',
	size = 'medium',
	disabled = false,
	...props
}) => {
	const rootClassName = cn(
		classes.root,
		{
			[classes.normal]: !disabled && variant === 'normal',
			[classes.disabled]: disabled && variant === 'normal',
			[classes.outline]: !disabled && variant === 'outline',
			[classes.disabledOutline]: disabled && variant === 'outline',
			[classes.small]: size === 'small',
			[classes.medium]: size === 'medium',
			[classes.big]: size === 'big',
		},
		className
	);

	return (
		<NextLink href={href} {...props} className={cn(rootClassName,className)}>
			{children}
		</NextLink>
	);
};

export default LinkButton;
