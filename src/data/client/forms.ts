import {HttpClient} from './http-client';
import type {PaginatedResponse,FormTemplate,CreateFormTemplateInput,Form,FormInvitationWithResponses,ResponsesAvaibales} from '@/types';

export const formTemplateClient = {
	getPaginated: ({page,limit,search = ''}: {page: number; limit: number; search?: string}) =>
		HttpClient.get<PaginatedResponse<FormTemplate>>(
			`/admin/form-templates?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`
		),
	getById: (id: string) =>
		HttpClient.get<FormTemplate>(`/admin/form-templates/${id}`),

	create: (data: CreateFormTemplateInput) =>
		HttpClient.post<FormTemplate>('/admin/form-templates',data),
	update: (id: string,data: Partial<FormTemplate>) =>
		HttpClient.put<FormTemplate>(`/admin/form-templates/${id}`,data),
	delete: (id: string) =>
		HttpClient.delete<{message: string}>(`/admin/form-templates/${id}`),
	getPublicForm: (token: string) => {
		return HttpClient.get<Form>(`/form-invitations/${token}`);
	},
	submitResponse: (token: string,answers: Record<string,string>): Promise<void> => {
		return HttpClient.post<void>(`/form-invitations/${token}/responses`,{answers});
	},
	getFormResponses: (token: string) => {
		return HttpClient.get<ResponsesAvaibales>(`/therapist/responses/${token}`);
	},
	updateFormInvitation: (uid: string,expiresAt: string) => {
		return HttpClient.patch(`/form-invitations/${uid}`,{
			expiresAt
		})
	}
};