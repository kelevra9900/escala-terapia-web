import {createContext,useContext} from 'react';
import Cookies from 'js-cookie';

import {useGetMeInfo} from '@/data/user';

import {AUTH_CRED} from '@/utils/constants';
import type {LoginResponseSuccess} from '@/types';

interface AuthContextType {
	user: LoginResponseSuccess['user'] | null;
	isAuthenticated: boolean;
	login: (data: LoginResponseSuccess) => void;
	logout: () => void;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	token: any | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
	const {data: user,isSuccess} = useGetMeInfo();

	const login = (data: LoginResponseSuccess) => {
		const payload = {
			token: data.access_token,
			role: data.user.role,
			permissions: [data.user.role],
		};
		Cookies.set(AUTH_CRED,JSON.stringify(payload));
	};


	const logout = () => {
		Cookies.remove(AUTH_CRED);
		window.location.href = '/login'
	};

	const getToken = () => {
		const raw = Cookies.get(AUTH_CRED);
		if (!raw) return null;
		try {
			const parsed = JSON.parse(raw);
			return parsed.token;
		} catch {
			return null;
		}
	};

	return (
		<AuthContext.Provider
			value={{
				user: user || null,
				isAuthenticated: !!user && isSuccess,
				login,
				logout,
				token: getToken(),
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider');
	return ctx;
};