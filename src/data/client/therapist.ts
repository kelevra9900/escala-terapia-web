import {Client,CreateClientInput,FormResponses,PaginatedResponse,Reponse} from "@/types";
import {HttpClient} from "./http-client";


export const therapistClient = {
	getClients: ({page,limit,search = ''}: {page: number; limit: number; search?: string}) => {
		return HttpClient.get<PaginatedResponse<Client>>(`/therapist/clients?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`)
	},
	addClient: (client: CreateClientInput) => {
		return HttpClient.post<Client>('/therapist/clients',client);
	},
	getFormResponses: ({page,limit,search = ''}: {page: number; limit: number; search?: string}) => {
		return HttpClient.get<PaginatedResponse<Reponse>>(`/therapist/responses?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`);
	},
	getFormAnswersByForm: (id: string) => {
		return HttpClient.get<FormResponses>(`/therapist/responses/${id}`);
	},
}