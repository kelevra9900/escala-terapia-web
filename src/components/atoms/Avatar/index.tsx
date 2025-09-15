import React,{FC} from 'react'
import Image,{StaticImageData} from 'next/image'
import {CheckIcon} from '@heroicons/react/24/solid'

import {avatarColors} from '@/utils/constants'

export interface AvatarProps {
	containerClassName?: string
	sizeClass?: string
	radius?: string
	imgUrl?: string | StaticImageData
	userName?: string
	hasChecked?: boolean
	hasCheckedClass?: string
	src?: string | StaticImageData
}

const Avatar: FC<AvatarProps> = ({
	containerClassName = 'ring-1 ring-white dark:ring-neutral-900',
	sizeClass = 'h-6 w-6 text-sm',
	radius = 'rounded-full',
	imgUrl = undefined,
	userName,
	hasChecked,
	hasCheckedClass = 'w-4 h-4 -top-0.5 -right-0.5',
	src,
}) => {
	// Prefer `src` prop when provided; fallback to `imgUrl` or empty
	const url = (src || imgUrl) || ''
	const name = userName || 'John Doe'
	const _setBgColor = (name: string) => {
		const backgroundIndex = Math.floor(name.charCodeAt(0) % avatarColors.length)
		return avatarColors[backgroundIndex]
	}

	const getInitials = (fullName: string) => {
		const parts = fullName.trim().split(/\s+/)
		if (!parts.length) return ''
		const first = parts[0]?.[0] || ''
		const second = parts[1]?.[0] || ''
		return `${first}${second}` || first
	}

	return (
		<div
			className={`wil-avatar relative inline-flex flex-shrink-0 items-center justify-center font-semibold uppercase text-neutral-100 shadow-inner ${radius} ${sizeClass} ${containerClassName}`}
			style={{backgroundColor: url ? undefined : _setBgColor(name)}}
		>
			{url ? (
				<Image
					className={`absolute inset-0 h-full w-full object-cover ${radius}`}
					src={url}
					alt={name}
					width={20}
					height={20}
				/>
			) : (
				<span className="wil-avatar__name">{getInitials(name)}</span>
			)}

			{hasChecked && (
				<span
					className={`absolute flex items-center justify-center rounded-full bg-teal-500 text-xs text-white ${hasCheckedClass}`}
				>
					<CheckIcon className="h-3 w-3" />
				</span>
			)}
		</div>
	)
}

export default Avatar
