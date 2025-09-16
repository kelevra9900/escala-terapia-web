import {FC} from 'react'
import clsx from 'clsx'

import {PostCard1,PostCard2} from '@/components/molecules'
import {BlogNote} from '@/types/blog'


interface SectionMagazine5Props {
	posts: BlogNote[]
	className?: string
}

const SectionMagazine: FC<SectionMagazine5Props> = ({posts,className}) => {
    const featuredPost = posts[0]
    const otherPosts = posts.slice(1,4)

    return (
		<div className={clsx('grid gap-6 md:gap-8 lg:grid-cols-12',className)}>
			<div className="lg:col-span-8 xl:col-span-9">
				<PostCard1 post={featuredPost} />
			</div>
			<div className="grid content-start gap-6 md:gap-8 lg:col-span-4 xl:col-span-3">
				{otherPosts.map((post) => (
					<PostCard2 key={post.id} post={post} />
				))}
			</div>
		</div>
    )
}

export default SectionMagazine
