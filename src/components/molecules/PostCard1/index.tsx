import {BlogNote} from '@/types/blog'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import {FC} from 'react'

interface Props {
	className?: string
	post: BlogNote
	size?: 'sm' | 'md'
}

const PostCard1: FC<Props> = ({className = 'h-full',post,size = 'md'}) => {
	const {title,excerpt,coverImage,slug} = post;

	return (
		<div
			className={clsx(
				className,
				'flex flex-col',
				size === 'md' && 'gap-y-6 md:gap-y-8',
				size === 'sm' && 'gap-y-5'
			)}
		>
			<Link href={'/blog/' + slug} title={title} className="relative block aspect-4/3 overflow-hidden rounded-3xl">
				{coverImage && (
					<Image src={coverImage} alt={title || ''} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
				)}
			</Link>

			<div className="mt-auto flex flex-col">
				<h2
					className={clsx(
						'block font-semibold text-neutral-900 dark:text-neutral-100',
						size === 'sm' && 'text-base sm:text-xl',
						size === 'md' && 'text-lg sm:text-2xl'
					)}
				>
					<Link href={'/blog/' + slug} className="line-clamp-1">
						{title}
					</Link>
				</h2>
				<p className="mt-4 line-clamp-2 text-neutral-500 dark:text-neutral-400">{excerpt}</p>
				{/* <PostCardMeta author={author} date={date || ''} className="mt-5" /> */}
			</div>
		</div>
	)
}

export default PostCard1
