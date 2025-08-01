/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from 'axios'
import Cookies from 'js-cookie'
import invariant from 'tiny-invariant'

import {AUTH_CRED} from '@/utils/constants'

invariant(
	process.env.NEXT_PUBLIC_REST_API_ENDPOINT,
	'NEXT_PUBLIC_REST_API_ENDPOINT is not defined, please define it in your .env file'
)
const Axios = axios.create({
	baseURL: process.env.NEXT_PUBLIC_REST_API_ENDPOINT,
	timeout: 50000,
	headers: {
		'Content-Type': 'application/json',
	},
})
// Change request data/error

Axios.interceptors.request.use((config: any) => {
	if (typeof window !== 'undefined') {
		const cookies = Cookies.get(AUTH_CRED);
		let token = '';

		if (cookies) {
			try {
				const decoded = decodeURIComponent(cookies);
				const parsed = JSON.parse(decoded);
				token = parsed?.token ?? '';
			} catch (e) {
				console.warn('Failed to parse AUTH_CRED cookie:',cookies,e);
			}
		}

		config.headers = {
			...config.headers,
			Authorization: token ? `Bearer ${token}` : '',
		};
	}

	return config;
});


// Change response data/error here
Axios.interceptors.response.use(
	(response) => response,
	(error) => {
		if (
			(error.response && error.response.status === 401) ||
			(error.response && error.response.status === 403) ||
			(error.response && error.response.data.message === 'Unauthorized')
		) {
			Cookies.remove(AUTH_CRED)
		}
		return Promise.reject(error)
	}
)

export class HttpClient {
	static async get<T>(url: string,params?: unknown) {
		const response = await Axios.get<T>(url,{params})
		return response.data
	}

	static async post<T>(url: string,data: unknown,options?: any) {
		const response = await Axios.post<T>(url,data,options)
		return response.data
	}

	static async put<T>(url: string,data: unknown) {
		const response = await Axios.put<T>(url,data)
		return response.data
	}

	static async delete<T>(url: string) {
		const response = await Axios.delete<T>(url)
		return response.data
	}
	static async patch<T>(url: string,data: unknown,options?: any) {
		const response = await Axios.patch<T>(url,data,options);
		return response.data;
	}
}

export function getFormErrors(error: unknown) {
	if (axios.isAxiosError(error)) {
		return error.response?.data.message
	}
	return null
}

export function getFieldErrors(error: unknown) {
	if (axios.isAxiosError(error)) {
		return error.response?.data.errors
	}
	return null
}
