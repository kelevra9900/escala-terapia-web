import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export interface LogoProps {
	className?: string
}

const Logo: React.FC<LogoProps> = ({className = 'w-22 sm:w-24'}) => {
	return (
		<Link
			href="/"
			className={`ttnc-logo inline-block text-primary-600 focus:outline-none focus:ring-0 ${className}`}
		>
			<Image
				src="/logo.png"
				alt="Logo"
				width={60}
				height={60}
				priority
			/>
		</Link>
	)
}

export default Logo
