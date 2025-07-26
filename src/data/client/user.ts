import {HttpClient} from "./http-client"

import type {
	CreateUserInput,
	LoginInput,
	LoginResponseSuccess,
	PaginatedResponse,
	User,
	UserListItem,
	RegisterInput
} from "@/types"


export const userClient = {
	login: (variables: LoginInput) => {
		return HttpClient.post<LoginResponseSuccess>("/auth/login",variables)
	},
	getMe: () => HttpClient.get<User>('/users/me'),
	getAllUsers: ({page,limit,search = ''}: {page: number; limit: number; search?: string}) =>
		HttpClient.get<PaginatedResponse<UserListItem>>(
			`/users/all?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`
		).then(res => res),
	deleteUser: (id: string): Promise<{message: string}> => {
		return HttpClient.delete<{message: string}>(`/users/${id}`)
	},
	updateUser: (id: string,data: Partial<UserListItem>): Promise<UserListItem> => {
		return HttpClient.put<UserListItem>(`/users/${id}`,data)
	},
	getUserById: (id: string): Promise<UserListItem> => {
		return HttpClient.get<UserListItem>(`/users/${id}`)
	},
	createUser: (data: CreateUserInput): Promise<UserListItem> => {
		return HttpClient.post<UserListItem>('/users',data)
	},
	register: (data: RegisterInput) => {
		return HttpClient.post("/auth/register",data);
	},
}