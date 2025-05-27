import {useMutation,useQuery,useQueryClient} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import Cookies from 'js-cookie';

import {User,LoginInput,LoginResponseSuccess} from '@/types';
import {userClient} from './client/user';
import {getFormErrors} from './client/http-client';
import {useAuth} from '@/context/AuthContext';

export const useLoginMutation = () => {
	const queryClient = useQueryClient();
	const {login} = useAuth();

	return useMutation<LoginResponseSuccess,AxiosError,LoginInput>({
		mutationFn: userClient.login,
		onSuccess: (data) => {
			login(data);
			queryClient.invalidateQueries({queryKey: ['me']});
		},
		onError: (error) => {
			return getFormErrors(error);
		},
	});
};


export const useGetMeInfo = () => {
	return useQuery<User>({
		queryKey: ['me'],
		queryFn: userClient.getMe,
		retry: false,
		staleTime: 1000 * 60 * 5,
		enabled: typeof window !== 'undefined' && !!Cookies.get('auth_token'),
	});
};
