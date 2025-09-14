import {useMutation,useQuery,useQueryClient} from "@tanstack/react-query";
import {therapistClient} from "./client/therapist";
import {AvailableForm,Client,CreateClientInput,PaginatedResponse,Reponse} from "@/types";
import {PatientResponse} from "@/types/patient";
import {showError,showSuccess} from "@/utils/toasts";

export const useGetClients = ({
	page,
	limit,
	search = '',
}: {
	page: number;
	limit: number;
	search?: string;
}) => {
	const queryClient = useQueryClient();
	return useQuery<PaginatedResponse<Client>>({
		queryKey: ['therapist-clients'],
		queryFn: () => therapistClient.getClients({page,limit,search}),
		placeholderData: () => {
			const previousPage = queryClient.getQueryData<PaginatedResponse<Client>>([
				'client',
				page - 1,
				limit,
				search,
			]);
			return previousPage ?? undefined;
		}
	});
}

export const useCreateClientMutation = () => {
	const queryClient = useQueryClient();

	return useMutation<Client,Error,CreateClientInput>({
		mutationFn: therapistClient.addClient,
		onSuccess: () => {
			showSuccess('Se ha creado correctamente el cliente')
			queryClient.invalidateQueries({queryKey: ['therapist','client']})
		},
		onError: (err) => {
			console.error("Error to create client",err)
			showError('Error al crear el cliente')
		}
	});
}

// Attach form with client
export const useAttachForm = () => {
	return useMutation({
		mutationFn: therapistClient.attachForm,
		onSuccess: () => {
			showSuccess("Se ha asociado el usuario con el formulario")
		},
		onError: () => {
			showError("Error al asociar un formulario con el paciente")
		}
	})
}
export const useGetAnswers = (formId: string) => {
	return useQuery({
		queryKey: ['therapist','answers',formId],
		queryFn: () => therapistClient.getFormAnswersByForm(formId),
		retry: false,
		staleTime: 1000 * 60 * 5,
	});
}

export const useGetPatient = (uid: string) => {
	return useQuery<PatientResponse>({
		queryKey: ['therapist','patients',uid],
		queryFn: () => therapistClient.getPatient(uid),
		retry: false,
		staleTime: 1000 * 60 * 5,
	})
}

export const useGetAvailableForms = ({
	page,
	limit,
}: {
	page: number;
	limit: number;
}) => {
	const queryClient = useQueryClient();
	return useQuery<PaginatedResponse<AvailableForm[]>>({
		queryKey: ['therapist','available-forms',page,limit],
		queryFn: () => therapistClient.getAvailableForms({page,limit}),
		placeholderData: () => {
			const previousPage = queryClient.getQueryData<PaginatedResponse<AvailableForm[]>>([
				'available-forms',
				page - 1,
				limit,
			]);
			return previousPage ?? undefined;
		}
	});
}

export const useGetForms = ({
	page,
	limit,
	search = '',
}: {
	page: number;
	limit: number;
	search?: string;
}) => {
	const queryClient = useQueryClient();

	return useQuery<PaginatedResponse<Reponse>>({
		queryKey: ['therapist','forms',page,limit,search],
		queryFn: () => therapistClient.getFormResponses({page,limit,search}),
		placeholderData: () => {
			const previousPage = queryClient.getQueryData<PaginatedResponse<Reponse>>([
				'therapist',
				'forms',
				page - 1,
				limit,
				search,
			]);
			return previousPage ?? undefined;
		},
	});
}
