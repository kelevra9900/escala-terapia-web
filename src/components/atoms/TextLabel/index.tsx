import React from 'react';

type TextLabelProps = {
	children: React.ReactNode;
	className?: string;
};

export const TextLabel = ({children,className = ''}: TextLabelProps) => {
	return (
		<label className={`block text-sm font-medium text-gray-700 dark:text-white ${className}`}>
			{children}
		</label>
	);
};

export default TextLabel;
