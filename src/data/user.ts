import {useMutation,useQuery,useQueryClient} from '@tanstack/react-query';
import {AxiosError} from 'axios';

import {User,LoginInput,LoginResponseSuccess,PaginatedResponse,UserListItem,CreateUserInput} from '@/types';
import {userClient} from './client/user';
import {getFormErrors} from './client/http-client';
import {useAuth} from '@/context/AuthContext';
import {showError,showSuccess} from '@/utils/toasts';
import {useRouter} from 'next/router';

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

export const useDeleteUserMutation = () => {
	const queryClient = useQueryClient();
	return useMutation<{message: string},AxiosError,{id: string}>({
		mutationFn: ({id}) => userClient.deleteUser(id),
		onSuccess: async () => {
			queryClient.invalidateQueries({queryKey: ['users']});
			showSuccess('Usuario eliminado exitosamente');
		},
		onError: (error) => {
			const formErrors = getFormErrors(error);
			showError('Error al eliminar el usuario');
			return formErrors;
		},
	});
};

export const useUpdateUserMutation = () => {
	const queryClient = useQueryClient();
	return useMutation<UserListItem,AxiosError,{id: string; data: Partial<User>}>({
		mutationFn: ({id,data}) => userClient.updateUser(id,data),
		onSuccess: async (data) => {
			queryClient.invalidateQueries({queryKey: ['users']});
			queryClient.setQueryData<UserListItem>(['me'],data);
			showSuccess('Usuario actualizado exitosamente');
		},
		onError: (error) => {
			const formErrors = getFormErrors(error);
			showError('Error al actualizar el usuario');
			return formErrors;
		},
	});
};

export const useCreateUserMutation = () => {
	const queryClient = useQueryClient();
	const router = useRouter();

	return useMutation<UserListItem,AxiosError,{data: CreateUserInput}>({
		mutationFn: ({data}) => userClient.createUser(data),
		onSuccess: async (data) => {
			queryClient.invalidateQueries({queryKey: ['users']});
			queryClient.setQueryData<UserListItem>(['user',data.id],data);
			showSuccess('Usuario creado exitosamente');
			setTimeout(() => {
				router.back();
			},1000);
		},
		onError: (error) => {
			console.error('Error al crear el usuario:',error);
			const formErrors = getFormErrors(error);
			showError('Error al crear el usuario');
			return formErrors;
		},
	});
};

export const useGetUserById = (id: string) => {
	const queryClient = useQueryClient();
	return useQuery<UserListItem>({
		queryKey: ['user'],
		queryFn: () => userClient.getUserById(id),
		retry: false,
		staleTime: 1000 * 60 * 5, // 5 minutes
		placeholderData: () => {
			const user = queryClient.getQueryData<UserListItem>(['user',id]);
			return user ?? undefined;
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