import {useMutation} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {formTemplateClient} from '@/data/client/forms';
import {showError,showSuccess} from '@/utils/toasts';

export type SubmitFormResponseInput = {
	token: string;
	answers: Record<string,string>;
};

export const useSubmitFormResponse = () => {
	return useMutation<void,AxiosError,SubmitFormResponseInput>({
		mutationFn: ({token,answers}) =>
			formTemplateClient.submitResponse(token,answers),
		onSuccess: () => {
			showSuccess('Formulario enviado con éxito.');
		},
		onError: () => {
			showError('No se pudo enviar el formulario.');
		},
	});
};
