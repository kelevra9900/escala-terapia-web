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

export function getAuthCredentials(context?: any) {
	let authCred: string | undefined;

	if (context) {
		console.log('[getAuthCredentials] SSR mode, context.req:',!!context.req);
		const cookies = parseSSRCookie(context);
		authCred = cookies?.[AUTH_CRED];
	} else if (typeof window !== 'undefined') {
		console.log('[getAuthCredentials] CSR mode');
		authCred = Cookie.get(AUTH_CRED);
	}

	if (authCred) {
		try {
			const parsed = JSON.parse(authCred);
			return {
				token: parsed.token ?? null,
				permissions: parsed.permissions ?? null,
				role: parsed.role ?? null,
			};
		} catch (e) {
			console.warn('Error parsing auth cookie:',e);
		}
	}

	return {token: null,permissions: null,role: null};
}



export function parseSSRCookie(context: any) {
	try {
		const cookieHeader = context?.req?.headers?.cookie;
		if (!cookieHeader) {
			console.warn('[parseSSRCookie] No cookie header found.');
			return {};
		}
		return SSRCookie.parse(cookieHeader);
	} catch (error) {
		console.error('[parseSSRCookie] Failed to parse cookies:',error);
		return {};
	}
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
