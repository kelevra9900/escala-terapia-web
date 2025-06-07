import {useMutation,useQuery,useQueryClient} from '@tanstack/react-query';
import {AxiosError} from 'axios';

import {User,LoginInput,LoginResponseSuccess,PaginatedResponse,UserListItem} from '@/types';
import {userClient} from './client/user';
import {getFormErrors} from './client/http-client';
import {useAuth} from '@/context/AuthContext';
import {showError,showSuccess} from '@/utils/toasts';

export const useLoginMutation = () => {
	const queryClient = useQueryClient();
	const {login} = useAuth();

	return useMutation<LoginResponseSuccess,AxiosError,LoginInput>({
		mutationFn: userClient.login,
		onSuccess: async (data) => {
			login(data);
			queryClient.invalidateQueries({queryKey: ['me']});
			showSuccess('Inicio de sesión exitoso');
		},
		onError: (error) => {
			const formErrors = getFormErrors(error);
			showError('Error al iniciar sesión');
			return formErrors;
		},
	});
};

export const useGetMeInfo = () => {
	return useQuery<User>({
		queryKey: ['me'],
		queryFn: userClient.getMe,
		retry: false,
		staleTime: 1000 * 60 * 5,
	});
};


export const usePaginatedUsers = ({
	page,
	limit,
	search = '',
}: {
	page: number;
	limit: number;
	search?: string;
}) => {
	const queryClient = useQueryClient();

	return useQuery<PaginatedResponse<UserListItem>>({
		queryKey: ['users',page,limit,search],
		queryFn: () => userClient.getAllUsers({page,limit,search}),
		placeholderData: () => {
			const previousPage = queryClient.getQueryData<PaginatedResponse<UserListItem>>([
				'users',
				page - 1,
				limit,
				search,
			]);

			return previousPage ?? undefined;
		},
	});
};