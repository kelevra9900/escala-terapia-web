// hooks/useFormTemplates.ts

import {useQuery,useMutation,useQueryClient} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {formTemplateClient} from '@/data/client/forms';
import {PaginatedResponse,FormTemplate,CreateFormTemplateInput,SubmitFormResponseInput} from '@/types';
import {getFormErrors} from '@/data/client/http-client';
import {showError,showSuccess} from '@/utils/toasts';

export const usePaginatedFormTemplates = ({
	page,
	limit,
	search = '',
}: {
	page: number;
	limit: number;
	search?: string;
}) => {
	const queryClient = useQueryClient();

	return useQuery<PaginatedResponse<FormTemplate>>({
		queryKey: ['formTemplates',page,limit,search],
		queryFn: () => formTemplateClient.getPaginated({page,limit,search}),
		placeholderData: () => {
			const prev = queryClient.getQueryData<PaginatedResponse<FormTemplate>>([
				'formTemplates',
				page - 1,
				limit,
				search,
			]);
			return prev ?? undefined;
		},
	});
};

export const useFormTemplateById = (id: string) => {
	return useQuery<FormTemplate>({
		queryKey: ['formTemplate',id],
		queryFn: () => formTemplateClient.getById(id),
	});
};


export const useGetResponsesByIdForm = (id: string) => {
	return useQuery({
		queryKey: ['response',id],
		queryFn: () => formTemplateClient.getFormResponses(id)
	})
}

export const useCreateFormTemplate = () => {
	const queryClient = useQueryClient();

	return useMutation<FormTemplate,AxiosError,{data: CreateFormTemplateInput}>({
		mutationFn: ({data}) => formTemplateClient.create(data),
		onSuccess: (data) => {
			queryClient.invalidateQueries({queryKey: ['formTemplates']});
			queryClient.setQueryData(['formTemplate',data.id],data);
			showSuccess('Formulario creado exitosamente');
		},
		onError: (err) => {
			const formErrors = getFormErrors(err);
			showError('Error al crear formulario');
			return formErrors;
		},
	});
};
export const useSubmitFormResponse = () => {
	return useMutation<void,AxiosError,SubmitFormResponseInput>({
		mutationFn: ({token,answers}) =>
			formTemplateClient.submitResponse(token,answers),
		onSuccess: () => {
			showSuccess('Formulario enviado con éxito.');
		},
		onError: (err) => {
			console.error('Error al enviar respuestas:',err);
			showError('No se pudo enviar el formulario.');
		},
	});
};

export const useUpdateExpirationForm = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({uid,expiresAt}: {uid: string,expiresAt: string}) => formTemplateClient.updateFormInvitation(uid,expiresAt),
		onSuccess: async () => {
			showSuccess('Formulario actualizado')
			await queryClient.invalidateQueries({queryKey: ['therapist-clients']});
		},
		onError: (err) => {
			console.error("Error al actualizar expiración",err)
			showError('Error inesperado al actualizar el formulario')
		}
	})
}

export const useFormResponses = (token: string) => {
	return useQuery({
		queryKey: ['formResponses',token],
		queryFn: () => formTemplateClient.getFormResponses(token),
		select: (data) => data.responses,
	});
};

// get form template with token string param
export const useGetForm = (token: string) => {
	return useQuery({
		queryKey: ['formTemplate',token],
		queryFn: () => formTemplateClient.getPublicForm(token),
	})
}

export const useUpdateFormTemplate = () => {
	const queryClient = useQueryClient();

	return useMutation<FormTemplate,AxiosError,{id: string; data: Partial<FormTemplate>}>({
		mutationFn: ({id,data}) => formTemplateClient.update(id,data),
		onSuccess: (data) => {
			queryClient.invalidateQueries({queryKey: ['formTemplates']});
			queryClient.setQueryData(['formTemplate',data.id],data);
			showSuccess('Formulario actualizado exitosamente');
		},
		onError: (err) => {
			const formErrors = getFormErrors(err);
			showError('Error al actualizar formulario');
			return formErrors;
		},
	});
};

export const useDeleteFormTemplate = () => {
	const queryClient = useQueryClient();

	return useMutation<{message: string},AxiosError,{id: string}>({
		mutationFn: ({id}) => formTemplateClient.delete(id),
		onSuccess: () => {
			queryClient.invalidateQueries({queryKey: ['formTemplates']});
			showSuccess('Formulario eliminado correctamente');
		},
		onError: (err) => {
			const formErrors = getFormErrors(err);
			showError('Error al eliminar formulario');
			return formErrors;
		},
	});
};
