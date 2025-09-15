import {AvailableForm,Client,CreateClientInput,FormResponses,GenericMessageResponse,PaginatedResponse,Reponse} from "@/types";
import {HttpClient} from "./http-client";
import {PatientResponse} from "@/types/patient";


export const therapistClient = {
	getClients: ({page,limit,search = ''}: {page: number; limit: number; search?: string}) => {
		return HttpClient.get<PaginatedResponse<Client>>(`/therapist/clients?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`)
	},
	addClient: (client: CreateClientInput) => {
		const {birthDate,...rest} = client;
		const isoBirth = birthDate ? new Date(birthDate).toISOString() : null;
		return HttpClient.post<Client>('/therapist/clients',{
			...rest,
			birthDate: isoBirth,
			birthdate: isoBirth,
		});
	},
	attachForm: ({
		clientId,
		formId,
		expiresAt
	}: {clientId: string,formId: string,expiresAt: string}) => {
		return HttpClient.post('/therapist/attach-form',{
			clientId,
			formTemplateId: formId,
			expiresAt
		})
	},
	getFormResponses: ({page,limit,search = ''}: {page: number; limit: number; search?: string}) => {
		return HttpClient.get<PaginatedResponse<Reponse>>(`/therapist/responses?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`);
	},
	getFormAnswersByForm: (id: string) => {
		return HttpClient.get<FormResponses>(`/therapist/responses/${id}`);
	},
	getPatient: (uid: string) => {
		return HttpClient.get<PatientResponse>(`/therapist/patients/${uid}`)
	},
	getAvailableForms: ({page,limit}: {page: number,limit: number}) => {
		return HttpClient.get<PaginatedResponse<AvailableForm[]>>(`/therapist/available-forms?page=${page}&limit=${limit}`)
	},
	deletePatient: (id: string) => {
		return HttpClient.delete<GenericMessageResponse>(`/therapist/patients/${id}`)
	},
	changePassword: ({
		actualPassword,
		newPassword,
		confirmPassword
	}: {actualPassword: string,newPassword: string,confirmPassword: string}) => {
		return HttpClient.post<GenericMessageResponse>("/auth/change-password",{
			actualPassword,
			newPassword,
			confirmPassword
		})
	}
}
