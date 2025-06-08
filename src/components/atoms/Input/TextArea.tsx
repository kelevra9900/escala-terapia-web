import React,{TextareaHTMLAttributes} from 'react'

// eslint-disable-next-line react/display-name
const Textarea = React.forwardRef<HTMLTextAreaElement,TextareaHTMLAttributes<HTMLTextAreaElement>>(
	({className = '',children,...args},ref) => {
		return (
			<textarea
				ref={ref}
				className={`dark:focus:ring-primary-600/25 focus:border-primary-300 focus:ring-primary-200/50 block w-full rounded-2xl border-neutral-200 bg-white text-sm focus:ring-3 dark:border-neutral-700 dark:bg-neutral-900 ${className}`}
				rows={4}
				{...args}
			>
				{children}
			</textarea>
		)
	},
)

export default Textarea
