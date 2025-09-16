import React from 'react'
import {Metadata} from 'next'
import {BgGlassmorphism,Loader,Seo} from '@/components/atoms'
import {usePaginatedBlogNotes} from '@/data/blog'
import {MainLayout,SectionGridPosts} from '@/components/organisms'
import SectionMagazine from '@/components/organisms/SectionMagazine'
import {SectionAds} from '@/components/molecules'

export const metadata: Metadata = {
	title: 'Blog',
	description: 'Explore our blog for the latest news, articles, and insights on various topics.',
}

const BlogPage = () => {
	const {data,isPending: loading} = usePaginatedBlogNotes({
		page: 1,
		limit: 10,
		search: '',
		categoryId: ''
	})
	if (loading) {
		return (
			<div>
				<Seo
					title='Blog – Escala Terapia'
					description='Explora nuestro blog con noticias, artículos y guías para terapeutas.'
					url={`${process.env.NEXT_PUBLIC_FRONTEND_URL || 'https://escalaterapia.com'}/blog`}
					keywords={['psicología','terapia','blog','salud mental','artículos']}
					noIndex
				/>
				<BgGlassmorphism />
				<div className="relative">
					<div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-12 lg:pt-16 pb-10 lg:pb-16">
						{/* Skeleton Magazine */}
						<div className="grid gap-6 md:gap-8 lg:grid-cols-12 animate-pulse">
							<div className="lg:col-span-8 xl:col-span-9">
								<div className="aspect-[4/3] w-full rounded-3xl bg-neutral-200 dark:bg-neutral-800" />
								<div className="mt-6 space-y-3">
									<div className="h-7 w-3/4 rounded bg-neutral-200 dark:bg-neutral-800" />
									<div className="h-4 w-11/12 rounded bg-neutral-200 dark:bg-neutral-800" />
									<div className="h-4 w-10/12 rounded bg-neutral-200 dark:bg-neutral-800" />
								</div>
							</div>
							<div className="grid content-start gap-6 md:gap-8 lg:col-span-4 xl:col-span-3">
								{Array.from({length: 3}).map((_,i) => (
									<div key={i} className="relative flex items-start gap-6 sm:gap-8">
										<div className="flex-1 space-y-3 py-1">
											<div className="h-5 w-5/6 rounded bg-neutral-200 dark:bg-neutral-800" />
											<div className="h-4 w-11/12 rounded bg-neutral-200 dark:bg-neutral-800" />
										</div>
										<div className="relative w-2/5 sm:w-1/3 shrink-0 overflow-hidden rounded-xl sm:rounded-3xl aspect-[4/3] bg-neutral-200 dark:bg-neutral-800" />
									</div>
								))}
							</div>
						</div>

						{/* Skeleton Ads */}
						<div className="mt-14 sm:mt-20 rounded-3xl overflow-hidden h-44 sm:h-56 bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
					</div>
				</div>
			</div>
		)
	}

	// Magazine-centric layout: centered with proper margins
	const posts = data?.data ?? []
	const magazinePosts = posts.slice(0,4)

	return (
		<div>
			<BgGlassmorphism />
			<div className="relative">
				<div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-12 lg:pt-16 pb-10 lg:pb-16">
					<SectionMagazine posts={magazinePosts} />
					<SectionAds className="mt-14 sm:mt-20 rounded-3xl overflow-hidden mb-10" />
					<SectionGridPosts posts={posts} className='mt-14' />
				</div>
			</div>
		</div>
	)
}

BlogPage.Layout = MainLayout;

export default BlogPage
