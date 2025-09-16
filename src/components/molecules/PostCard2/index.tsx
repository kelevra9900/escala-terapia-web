import {BlogNote} from '@/types/blog'
import Image from 'next/image'
import Link from 'next/link'
import {FC} from 'react'

interface Props {
	className?: string
	post: BlogNote
}

const PostCard2: FC<Props> = ({className,post}) => {
	const {title,excerpt,publishedAt,coverImage,slug} = post;

	return (
		<div className={`relative flex items-start gap-x-6 sm:gap-x-8 ${className ?? ''}`}>
			<div className="flex h-full flex-col py-2">
				<h2 className={`block text-base font-semibold nc-card-title`}>
					<Link href={'/blog/' + slug} className="line-clamp-2 capitalize" title={title}>
						{title}
					</Link>
				</h2>
				<span className="my-3 hidden text-neutral-500 sm:block dark:text-neutral-400">
					<span className="line-clamp-2">{excerpt}</span>
				</span>
				<span className="mt-4 block text-sm text-neutral-500 sm:hidden">
					{'1m'} · {publishedAt}
				</span>
				<div className="mt-auto hidden sm:block">
					{/* <PostCardMeta author={author} date={date || ''} /> */}
				</div>
			</div>

			<Link href={'/blog/' + slug} className="relative block w-2/5 shrink-0 sm:w-1/3 overflow-hidden rounded-xl sm:rounded-3xl aspect-[4/3]">
				{coverImage && (
					<Image alt={title} src={coverImage} className="object-cover transition-transform duration-200 hover:scale-[1.03]" sizes="400px" fill />
				)}
			</Link>
		</div>
	)
}

export default PostCard2
