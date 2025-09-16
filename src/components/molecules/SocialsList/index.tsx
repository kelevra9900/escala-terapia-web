import {FC} from 'react'
import Link from 'next/link'
import {Facebook01Icon,Mail01Icon,NewTwitterIcon} from '@hugeicons/core-free-icons'
import {HugeiconsIcon} from '@hugeicons/react'

interface Props {
	className?: string
	itemClass?: string
	socials?: any
}

const socialsDemo = [
	{
		name: 'Facebook',
		href: '#',
		icon: Facebook01Icon,
	},
	{
		name: 'Email',
		href: '#',
		icon: Mail01Icon,
	},
	{
		name: 'Twitter',
		href: '#',
		icon: NewTwitterIcon,
	},
]

const SocialsList: FC<Props> = ({className = '',itemClass = 'block',socials = socialsDemo}) => {
	return (
		<nav className={`flex gap-x-3.5 text-2xl text-neutral-600 dark:text-neutral-300 ${className}`}>
			{socials.map((item: any,i: number) => (
				<Link key={i} className={itemClass} href={item.href} target="_blank" rel="noopener noreferrer">
					<HugeiconsIcon icon={item.icon} size={20} color="currentColor" strokeWidth={1.5} />
				</Link>
			))}
		</nav>
	)
}

export default SocialsList
