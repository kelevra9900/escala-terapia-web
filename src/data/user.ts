import {useMutation,useQuery,useQueryClient} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import Cookies from 'js-cookie';

import {User,LoginInput,LoginResponseSuccess,PaginatedResponse,UserListItem} from '@/types';
import {userClient} from './client/user';
import {getFormErrors} from './client/http-client';
import {useAuth} from '@/context/AuthContext';
import {showError,showSuccess} from '@/utils/toasts';
import {AUTH_CRED} from '@/utils/constants';
import {useEffect,useState} from 'react';

export const useLoginMutation = () => {
	const queryClient = useQueryClient();
	const {login} = useAuth();

	return useMutation<LoginResponseSuccess,AxiosError,LoginInput>({
		mutationFn: userClient.login,
		onSuccess: (data) => {
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
	const [enabled,setEnabled] = useState(false);

	useEffect(() => {
		setEnabled(!!Cookies.get(AUTH_CRED));
	},[]);

	return useQuery<User>({
		queryKey: ['me'],
		queryFn: userClient.getMe,
		enabled,
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