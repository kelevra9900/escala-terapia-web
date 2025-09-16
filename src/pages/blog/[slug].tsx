import Image from 'next/image'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {ArticleJsonLd} from 'next-seo'

import {Avatar,ButtonPrimary,ButtonSecondary,Divider,Textarea} from '@/components/atoms'
import {BadgeButton} from '@/components/atoms/BadgeButton'
import {SocialsList} from '@/components/molecules'
import {MainLayout} from '@/components/organisms'
import BlogPostSkeleton from '@/components/organisms/BlogPostSkeleton'
import {useGetPost} from '@/data/blog'



const BlogNote = () => {
	const router = useRouter();
	const slug = String(router.query.slug || '');

	const {data: post,isPending} = useGetPost(slug)

	if (isPending) {
		return <BlogPostSkeleton />
	}


	const renderHeader = () => {
		return (
			<header className="container flex justify-center rounded-xl">
				<div className="mx-auto flex w-full max-w-(--breakpoint-md) flex-col items-start gap-y-5 px-4 sm:px-6">
					<BadgeButton href="#" color="purple">
						{post?.category.name}
					</BadgeButton>
					<h1
						className="max-w-4xl text-3xl font-semibold text-neutral-900 md:text-4xl md:leading-[120%]! lg:text-4xl dark:text-neutral-100"
						title="Quiet ingenuity: 120,000 lunches and counting"
					>
						{post?.title}
					</h1>
					<span className="block pb-1 text-base text-neutral-500 md:text-lg dark:text-neutral-400">{post?.excerpt}</span>

					<Divider />
					<div className="flex w-full flex-wrap justify-between gap-2.5">
						<div className="nc-PostMeta2 flex shrink-0 flex-wrap items-center text-left text-sm leading-none text-neutral-700 dark:text-neutral-200">
							<Avatar />
							<div className="ms-3">
								<div className="flex items-center">
									<Link className="block font-semibold" href="#">
										{post?.author?.name}
									</Link>
								</div>
								<div className="mt-[6px] text-xs">
									<span className="text-neutral-700 dark:text-neutral-300">{post?.publishedAt}</span>
									<span className="mx-2 font-semibold">·</span>
									{/* <span className="text-neutral-700 dark:text-neutral-300">{} </span> */}
								</div>
							</div>
						</div>
						<div className="ms-auto mt-3 hidden sm:mt-1.5 sm:block">
							<SocialsList />
						</div>
					</div>
				</div>
			</header>
		)
	}

	const renderContent = () => {
		// render your content here / [content]
		// this for the demo purpose only
		// Basic HTML sanitizer with client-side DOM traversal and SSR-safe fallback
		const sanitizeHtml = (html: string): string => {
			if (!html) return ''
			// SSR/basic fallback: strip dangerous tags/attrs quickly via regex
			const basicSanitize = (s: string) => {
				let out = s
				// Remove script/style/iframe/object/embed tags and their content
				out = out.replace(/<\s*(script|style|iframe|object|embed)[^>]*>[\s\S]*?<\s*\/\s*\1\s*>/gi,'')
				// Remove HTML comments
				out = out.replace(/<!--[\s\S]*?-->/g,'')
				// Remove inline event handlers (on*)
				out = out.replace(/\s+on[a-zA-Z]+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/g,'')
				// Neutralize javascript: and non-image data: in href
				out = out.replace(/href\s*=\s*("|')\s*(javascript:[^"']*|data:(?!image\/)[^"']*)\1/gi,'')
				// Remove unsafe src (allow http(s) and data:image)
				out = out.replace(/src\s*=\s*("|')\s*(?!https?:|data:image\/)\S*\1/gi,'')
				return out
			}

			// If DOM APIs are available, perform stricter sanitization
			if (typeof window === 'undefined' || typeof document === 'undefined') {
				return basicSanitize(html)
			}

			const allowedTags = new Set([
				'p','br','div','span','h1','h2','h3','h4','h5','h6','strong','em','b','i','u','a',
				'ul','ol','li','blockquote','code','pre','img','hr','table','thead','tbody','tr','th','td','sup','sub'
			])
			const allowedAttrs: Record<string,Set<string>> = {
				'a': new Set(['href','title','target','rel']),
				'img': new Set(['src','alt','title','width','height']),
				'table': new Set([]),
				'div': new Set([]),
				'span': new Set([]),
				'p': new Set([]),
				'h1': new Set([]),'h2': new Set([]),'h3': new Set([]),'h4': new Set([]),'h5': new Set([]),'h6': new Set([]),
				'ul': new Set([]),'ol': new Set([]),'li': new Set([]),
				'blockquote': new Set([]),'code': new Set([]),'pre': new Set([]),'hr': new Set([]),
				'thead': new Set([]),'tbody': new Set([]),'tr': new Set([]),'th': new Set([]),'td': new Set([]),
				'sup': new Set([]),'sub': new Set([])
			}

			const container = document.createElement('div')
			container.innerHTML = html

			const sanitizeElement = (el: Element) => {
				const tag = el.tagName.toLowerCase()
				// Remove event handler attributes and disallowed attributes
				Array.from(el.attributes).forEach((attr) => {
					const name = attr.name.toLowerCase()
					const value = attr.value
					if (name.startsWith('on')) {
						el.removeAttribute(attr.name)
						return
					}
					const allowed = allowedAttrs[tag] || new Set<string>()
					if (!allowed.has(name)) {
						el.removeAttribute(attr.name)
						return
					}
					if (name === 'href') {
						const v = value.trim()
						if (/^javascript:/i.test(v) || /^data:(?!image\/)/i.test(v)) {
							el.removeAttribute('href')
						}
					}
					if (name === 'src') {
						const v = value.trim()
						if (!/^(https?:|data:image\/)/i.test(v)) {
							el.removeAttribute('src')
						}
					}
					if (name === 'target') {
						if (value !== '_blank' && value !== '_self') {
							el.setAttribute('target','_self')
						}
						if (el.getAttribute('target') === '_blank') {
							const rel = (el.getAttribute('rel') || '').split(' ').filter(Boolean)
							for (const req of ['noopener','noreferrer']) {
								if (!rel.includes(req)) rel.push(req)
							}
							el.setAttribute('rel',rel.join(' '))
						}
					}
				})

				// Recurse through children and strip disallowed tags
				Array.from(el.childNodes).forEach((child) => {
					if (child.nodeType === Node.COMMENT_NODE) {
						child.parentNode?.removeChild(child)
						return
					}
					if (child.nodeType === Node.ELEMENT_NODE) {
						const cEl = child as Element
						const cTag = cEl.tagName.toLowerCase()
						if (!allowedTags.has(cTag)) {
							// unwrap: keep children but remove the element
							const parent = cEl.parentNode
							if (parent) {
								while (cEl.firstChild) parent.insertBefore(cEl.firstChild,cEl)
								parent.removeChild(cEl)
							}
						} else {
							sanitizeElement(cEl)
						}
					}
				})
			}

			// Start from the container root
			Array.from(container.childNodes).forEach((n) => {
				if (n.nodeType === Node.ELEMENT_NODE) sanitizeElement(n as Element)
				if (n.nodeType === Node.COMMENT_NODE) n.parentNode?.removeChild(n)
			})

			return container.innerHTML
		}

		const sanitized = sanitizeHtml(post?.content || '')

		return (
			<div
				id="single-entry-content"
				className="mx-auto prose prose-sm max-w-(--breakpoint-md)! px-4 sm:px-6 sm:prose lg:prose-lg dark:prose-invert"
			>
				{/* Your content will render here  {content} */}
				<div dangerouslySetInnerHTML={{__html: sanitized}} />
			</div>
		)
	}

	const renderTags = () => {
		return (
			<div className="mx-auto flex w-full max-w-(--breakpoint-md) flex-wrap gap-2 px-4 sm:px-6">
				{/* {post.category.map((tag) => (
					<Tag key={tag} className="mb-2">
						{tag}
					</Tag>
				))} */}
			</div>
		)
	}

	const renderAuthor = () => {
		return (
			<div className="mx-auto w-full max-w-(--breakpoint-md) px-4 sm:px-6">
				<div className="nc-SingleAuthor flex">
					<Avatar />
					<div className="ml-3 flex max-w-lg flex-col gap-y-1 sm:ml-5">
						<span className="text-xs tracking-wider text-neutral-400 uppercase">written by</span>
						<h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-200">
							<a href="#">{post?.author?.name}</a>
						</h2>
					</div>
				</div>
			</div>
		)
	}

	const renderCommentForm = () => {
		return (
			<div className="mx-auto w-full max-w-(--breakpoint-md) pt-5 px-4 sm:px-6">
				<h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">Comments (14)</h3>
				<form className="mt-5">
					<Textarea rows={4} />
					<div className="mt-6 flex gap-x-3">
						<ButtonPrimary>Submit</ButtonPrimary>
						<ButtonSecondary>Cancel</ButtonSecondary>
					</div>
				</form>
			</div>
		)
	}


	return (
		<>
			<ArticleJsonLd
				type="BlogPosting"
				title={post?.title || ''}
				images={post?.coverImage ? [post.coverImage] : []}
				description={post?.excerpt || ''}
				url={`${process.env.NEXT_PUBLIC_FRONTEND_URL || 'https://escalaterapia.com'}/blog/${post?.slug}`}
				authorName={post?.author?.name || 'Escala Terapia'}
				publisherName="Escala Terapia"
				publisherLogo={(process.env.NEXT_PUBLIC_FRONTEND_URL || 'https://escalaterapia.com') + '/logo-square.png'}
				datePublished={post?.publishedAt || ''}
				dateModified={post?.updatedAt || post?.publishedAt || ''}
			/>
			<div className="pt-8 lg:pt-16 mb-10 justify-center items-center">
				{renderHeader()}

				<div className="container my-8 sm:my-12 flex justify-center">
					{post?.coverImage && (
						<div className="mx-auto w-full max-w-(--breakpoint-md) overflow-hidden rounded-3xl">
							<Image
								alt={post.title || ''}
								src={post.coverImage}
								width={1600}
								height={900}
								priority
								className="h-auto w-full object-cover"
							/>
						</div>
					)}
				</div>

				<div className="container flex flex-col items-center gap-y-10">
					{renderContent()}
					{renderTags()}
					<div className="mx-auto w-full max-w-(--breakpoint-md) border-t border-b border-neutral-100 px-4 sm:px-6 dark:border-neutral-700"></div>
					{renderAuthor()}
					{renderCommentForm()}
				</div>

			</div>
		</>
	)
}

BlogNote.Layout = MainLayout;


export default BlogNote;
