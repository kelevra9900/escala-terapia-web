import React from 'react';

type Option = {
	label: string;
	value: string;
};

type RadioGroupProps = {
	name: string;
	value: string;
	onChange: (value: string) => void;
	options: Option[];
	className?: string;
};

export const RadioGroup = ({name,value,onChange,options,className = ''}: RadioGroupProps) => {
	return (
		<div className={`space-y-2 ${className}`}>
			{options.map((option) => (
				<label
					key={option.value}
					className="flex items-center space-x-2 cursor-pointer text-gray-700 dark:text-white"
				>
					<input
						type="radio"
						name={name}
						value={option.value}
						checked={value === option.value}
						onChange={() => onChange(option.value)}
						className="h-4 w-4 text-brand-600 border-gray-300 focus:ring-brand-500"
					/>
					<span>{option.label}</span>
				</label>
			))}
		</div>
	);
};

export default RadioGroup;
