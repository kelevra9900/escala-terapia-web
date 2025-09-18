export interface BlogNote {
	id: string
	title: string
	slug: string
	excerpt: string
	content: string
	coverImage: string
	coverImageAlt: string
	isFeatured: boolean
	status: string
	publishedAt: string
	createdAt: string
	updatedAt: string
	authorId: string
	categoryId: string
	category: Category
	author: Author
	coverImageFile?: File | Blob | null
}

export interface Category {
	id: string
	name: string
	slug: string
	description: string
	createdAt: string
	updatedAt: string
}

export interface Author {
	id: string
	name: string
}

export type BlogPayload = {
	categoryId?: string | null
	status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED' | null
	search?: string | null
	limit?: number | null
	page?: number | null
}


export type Comment = {
	id: string
	content: string
	status: string
	createdAt: string
	updatedAt: string
	postId: string
	authorId: string
	parentId: any
	author: Author
}


export type CreateBlogNoteInput = {
	title: string,
	slug: string,
	excerpt?: string | null,
	content: string,
	coverImage?: string | null,
	coverImageAlt?: string | null,
	isFeatured: boolean,
	categoryId: string,
	coverImageFile?: File | Blob | null
}

export type Categorie = {
	id: string,
	name: string,
	slug: string,
	description: string,
	createdAt: string,
	updatedAt: string
}
