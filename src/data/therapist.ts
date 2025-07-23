import {useMutation,useQuery,useQueryClient} from "@tanstack/react-query";
import {therapistClient} from "./client/therapist";
import {Client,PaginatedResponse,Reponse} from "@/types";


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
		queryKey: ['therapist','client',page,limit,search],
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
	return useMutation<Client,Error,Omit<Client,'id' | 'createdAt'>>({
		mutationFn: therapistClient.addClient,
		onSuccess: (data) => {
			console.log('Client created successfully:',data);
		}
	});
}
export const useGetAnswers = (formId: string) => {
	return useQuery({
		queryKey: ['therapist','answers',formId],
		queryFn: () => therapistClient.getFormAnswersByForm(formId),
		retry: false,
		staleTime: 1000 * 60 * 5,
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