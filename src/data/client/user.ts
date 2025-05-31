import {HttpClient} from "./http-client"

import type {
	LoginInput,
	LoginResponseSuccess,
	PaginatedResponse,
	User,
	UserListItem
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
}