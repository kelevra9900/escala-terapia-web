import cn from 'classnames';
import React,{ButtonHTMLAttributes} from 'react';
import {twMerge} from 'tailwind-merge';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
	variant?: 'normal' | 'outline' | 'custom';
	size?: 'big' | 'medium' | 'small';
	active?: boolean;
	loading?: boolean;
	disabled?: boolean;
	children?: React.ReactNode;
}

const classes = {
	root: 'inline-flex items-center justify-center flex-shrink-0 font-semibold leading-none rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
	normal:
		'bg-brand-moss text-white hover:bg-brand-moss/90 focus:ring-brand-moss',
	custom: 'border border-transparent',
	outline:
		'border border-brand-moss text-brand-moss bg-transparent hover:bg-brand-moss/10 focus:ring-brand-moss',
	loading:
		'h-4 w-4 ms-2 rounded-full border-2 border-transparent border-t-2 animate-spin',
	disabled:
		'bg-neutral-200 text-neutral-500 cursor-not-allowed',
	disabledOutline:
		'border border-neutral-300 text-neutral-400 cursor-not-allowed',
	small: 'px-3 h-9 text-sm',
	medium: 'px-5 h-11 text-sm',
	big: 'px-6 h-14 text-white',
};


const DefaultButton = React.forwardRef<HTMLButtonElement,ButtonProps>(
	(props,ref) => {
		const {
			className,
			variant = 'normal',
			size = 'medium',
			active,
			children,
			loading = false,
			disabled = false,
			...rest
		} = props;

		const classesName = cn(
			classes.root,
			{
				[classes.normal]: !disabled && variant === 'normal',
				[classes.disabled]: disabled && variant === 'normal',
				[classes.outline]: !disabled && variant === 'outline',
				[classes.disabledOutline]: disabled && variant === 'outline',
				[classes.custom]: variant === 'custom',
				[classes.small]: size === 'small',
				[classes.medium]: size === 'medium',
				[classes.big]: size === 'big',
			},
			className
		);

		return (
			<button
				aria-pressed={active}
				data-variant={variant}
				ref={ref}
				className={twMerge(classesName)}
				disabled={disabled}
				{...rest}
			>
				{children}
				{loading && (
					<span
						className={classes.loading}
						style={{
							borderTopColor:
								variant === 'outline' ? 'currentColor' : '#ffffff',
						}}
					/>
				)}
			</button>
		);
	}
);

DefaultButton.displayName = 'Button';

export default DefaultButton;
