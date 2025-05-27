import React from 'react'

import Button,{ButtonProps} from './Button'

const ButtonPrimary: React.FC<ButtonProps> = ({
	className = '',
	...args
}) => {
	return (
		<Button
			className={`ttnc-ButtonPrimary bg-primary-600 text-neutral-50 font-(family-name:--font-inter) hover:bg-primary-700 disabled:bg-opacity-70 ${className}`}
			{...args}
		/>
	)
}

export default ButtonPrimary
