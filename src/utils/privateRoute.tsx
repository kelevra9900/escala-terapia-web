/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {useRouter} from 'next/router';
import {getAuthCredentials,hasAccess} from './auth';
import {Routes} from '@/settings/routes';
import {Loader} from '@/components/atoms';

const PrivateRoute: React.FC<{
	authProps: any;
	children?: React.ReactNode;
}> = ({children,authProps}) => {
	const router = useRouter();
	const {token,permissions} = getAuthCredentials();
	const isUser = !!token;
	const hasPermission =
		Array.isArray(permissions) &&
		!!permissions.length &&
		hasAccess(authProps.permissions,permissions);
	React.useEffect(() => {
		if (!isUser) router.replace(Routes.login); // If not authenticated, force log in
		// eslint-disable-next-line react-hooks/exhaustive-deps
	},[isUser]);

	if (isUser && hasPermission) {
		return <>{children}</>;
	}
	if (isUser && !hasPermission) {
		return <p>Access Denied</p>; // User is authenticated but does not have the required permissions
	}
	// Session is being fetched, or no user.
	// If no user, useEffect() will redirect.
	return <Loader /> // Show a loading state while checking authentication
};

export default PrivateRoute;
