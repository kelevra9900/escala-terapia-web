import React,{InputHTMLAttributes} from 'react';
import clsx from 'clsx';

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
	className?: string;
	label?: string;
	name: string;
	error?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement,Props>(
	({className,label,name,error,id,disabled,...rest},ref) => {
		const inputId = id ?? name;
		const errorId = error ? `${inputId}-error` : undefined;

		return (
			<div className={clsx('flex flex-col gap-2',className)}>
				<label
					htmlFor={inputId}
					className={clsx(
						'relative flex cursor-pointer select-none items-start gap-3',
						disabled && 'cursor-not-allowed opacity-60'
					)}
				>
					<input
						id={inputId}
						name={name}
						type="checkbox"
						disabled={disabled}
						ref={ref}
						aria-invalid={Boolean(error)}
						aria-describedby={errorId}
						className="peer sr-only"
						{...rest}
					/>
					<span
						aria-hidden="true"
						className="flex h-5 w-5 items-center justify-center rounded-md border border-[rgb(var(--color-gray-300))] bg-white transition-all duration-150 ease-out peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-[rgb(var(--color-accent))] peer-checked:border-[rgb(var(--color-accent))] peer-checked:bg-[rgb(var(--color-accent))] peer-disabled:border-[rgb(var(--color-gray-400))] peer-disabled:bg-[rgb(var(--color-gray-300))]"
					>
						<svg
							className="h-3.5 w-3.5 text-white opacity-0 transition-opacity duration-150 peer-checked:opacity-100"
							viewBox="0 0 14 14"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="m3.2 7.4 2.4 2.4 5.2-5.2"
								stroke="currentColor"
								strokeWidth="1.8"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</span>
					{label ? (
						<span className="text-sm leading-5 text-body">{label}</span>
					) : null}
				</label>

				{error && (
					<p id={errorId} className="text-xs text-red-500">
						{error}
					</p>
				)}
			</div>
		);
	}
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
