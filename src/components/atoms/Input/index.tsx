import React,{InputHTMLAttributes} from 'react'
import cn from 'classnames'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	sizeClass?: string
	fontClass?: string
	rounded?: string
	error?: string
	type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url'
	className?: string
	placeholder?: string
	disabled?: boolean
	autofocus?: boolean
	autocomplete?: string
	autocorrect?: 'on' | 'off'
	autocapitalize?: 'none' | 'off' | 'on' | 'sentences' | 'words'
	readonly?: boolean
	label?: string
}

// eslint-disable-next-line react/display-name
const Input = React.forwardRef<HTMLInputElement,InputProps>(
	(
		{
			className = '',
			sizeClass = 'h-11 px-4 py-3',
			fontClass = 'text-sm font-normal font-(family-name:--font-inter)',
			rounded = 'rounded-2xl',
			type = 'text',
			error = '',
			disabled = false,
			label = '',
			...props
		},
		ref
	) => {
		return (
			<div className="mb-4">
				{label && <label className="block mt-4 mb-2 text-sm font-medium text-gray-700">{label}</label>}
				<input
					ref={ref}
					type={type}
					{...props} // 👈 Muy importante: esto debe ir después del `type` y del `ref`
					className={cn(
						`block w-full border-neutral-200 bg-white focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:focus:ring-primary-600 dark:focus:ring-opacity-25 ${rounded} ${fontClass} ${sizeClass} ${className}`,
						error && 'border-red-500 focus:border-red-500',
						disabled && 'cursor-not-allowed opacity-50'
					)}
					disabled={disabled}
				/>
				{error && <span className="text-xs text-red-500 mt-1">{error}</span>}
			</div>
		);
	}
);


export default Input
