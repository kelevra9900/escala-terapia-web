import {HttpClient} from "./http-client"

import {BlogNote,BlogPayload,Categorie,Comment,CreateBlogNoteInput} from "@/types/blog"
import {PaginatedResponse} from "@/types"

export const blogClient = {
	getNotes: (variables: BlogPayload) => {
		return HttpClient.get<PaginatedResponse<BlogNote>>(`/blog/posts?categoryId=${variables.categoryId}&search=${variables.search}&limit=${variables.limit}&page=${variables.page}`)
	},
	getPost: (slug: string) => {
		return HttpClient.get<BlogNote>(`/blog/posts/${slug}`)
	},
	updatePost: (payload: BlogNote) => {
		return HttpClient.put<BlogNote>(`/blog/posts/${payload.id}`,payload)
	},
	changeStatus: ({id,status}: {id: string,status: string}) => {
		return HttpClient.patch<BlogNote>(`/blog/posts/${id}/status`,{
			status
		});
	},
	deletePost: (id: string) => {
		return HttpClient.delete(`/blog/posts/${id}`)
	},
	createBlogPost: (input: CreateBlogNoteInput) => {
		const {
			coverImageFile,
			title,
			slug,
			content,
			categoryId,
			isFeatured,
			excerpt,
			coverImage,
			coverImageAlt,
		} = input;

		const formData = new FormData();
		if (coverImageFile) {
			formData.append('coverImageFile',coverImageFile);
		}
		formData.append('title',title);
		formData.append('slug',slug);
		formData.append('content',content);
		formData.append('categoryId',categoryId);
		formData.append('isFeatured',isFeatured ? 'true' : 'false');
		if (excerpt !== undefined && excerpt !== null) {
			formData.append('excerpt',excerpt);
		}
		if (coverImage !== undefined && coverImage !== null) {
			formData.append('coverImage',coverImage);
		}
		if (coverImageAlt !== undefined && coverImageAlt !== null) {
			formData.append('coverImageAlt',coverImageAlt);
		}

		return HttpClient.post<BlogNote>('/blog/posts',formData,{
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
	},
	// Blog - Comments
	// Create comment on a post (auth required)
	createPost: ({postId,payload}: {postId: string,payload: Partial<BlogNote>}) => {
		return HttpClient.post(`/blog/posts/${postId}`,payload)
	},
	// List comments for a post (public sees only approved)
	listComments: (postId: string) => {
		return HttpClient.get<Comment[]>(`/blog/posts/${postId}/comments`)
	},
	updateCommentStatus: ({id,status}: {id: string,status: string}) => {
		return HttpClient.patch(`/blog/comments/${id}/status`,{
			status
		})
	},
	deleteComment: (id: string) => {
		return HttpClient.delete(`/blog/comments/${id}`)
	},
	createComment: ({postId,content,parentId}: {postId: string,content: string,parentId?: string}) => {
		return HttpClient.post(`/blog/posts/${postId}/comments`,{
			content,
			parentId
		})
	},
	getCategories: ({page,limit}: {page: number,limit: number}) => {
		return HttpClient.get<PaginatedResponse<Categorie>>(`/blog/categories?page=${page}&limit=${limit}`)
	}
}
