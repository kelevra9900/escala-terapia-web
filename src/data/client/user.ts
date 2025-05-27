import {HttpClient} from "./http-client"

import type {
	LoginInput,
	LoginResponseSuccess,
	User
} from "@/types"


export const userClient = {
	login: (variables: LoginInput) => {
		return HttpClient.post<LoginResponseSuccess>("/auth/login",variables)
	},
	getMe: () => HttpClient.get<User>('/users/me'),
}