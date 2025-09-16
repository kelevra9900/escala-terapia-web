import {HttpClient} from "./http-client"

import {BlogNote,BlogPayload,Comment,CreateBlogNoteInput} from "@/types/blog"
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
		return HttpClient.post<BlogNote>('/blog/posts',input)
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
	}
}
