/* eslint-disable @typescript-eslint/no-explicit-any */
import Cookie from 'js-cookie';
import SSRCookie from 'cookie';
import {
	AUTH_CRED,
	PERMISSIONS,
} from './constants';

export const allowedRoles = [];

export function setAuthCredentials(token: string,permissions: any,role: any) {
	Cookie.set(AUTH_CRED,JSON.stringify({token,permissions,role}));
}

export function getAuthCredentials(context?: any): {
	token: string | null;
	permissions: string[] | null;
	role: string | null;
} {
	let authCred;
	if (context) {
		authCred = parseSSRCookie(context)[AUTH_CRED];
	} else {
		authCred = Cookie.get(AUTH_CRED);
	}
	if (authCred) {
		return JSON.parse(authCred);
	}
	return {token: null,permissions: null,role: null};
}

export function parseSSRCookie(context: any) {
	return SSRCookie.parse(context.req.headers.cookie ?? '');
}

export function hasAccess(
	_allowedRoles: string[],
	_userPermissions: string[] | undefined | null,
) {
	if (_userPermissions) {
		return Boolean(
			_allowedRoles?.find((aRole) => _userPermissions.includes(aRole)),
		);
	}
	return false;
}

export function isAuthenticated(_cookies: any) {
	return (
		!!_cookies[AUTH_CRED] &&
		Array.isArray(_cookies[PERMISSIONS]) &&
		!!_cookies[PERMISSIONS].length
	);
}
