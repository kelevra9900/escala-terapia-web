/* eslint-disable @typescript-eslint/no-explicit-any */
import {AUTH_CRED, PERMISSIONS} from './constants';

export function setAuthCredentials(token: string, permissions: any, role: any) {
  const value = JSON.stringify({token, permissions, role});
  if (typeof window !== 'undefined') {
    document.cookie = `${AUTH_CRED}=${encodeURIComponent(value)}; path=/; SameSite=Lax`;
  }
}

export function getAuthCredentials() {
  let authCred: string | undefined;
  if (typeof window !== 'undefined') {
    const pairs = (document.cookie || '').split('; ').filter(Boolean);
    const found = pairs.find((c) => c.startsWith(`${AUTH_CRED}=`));
    authCred = found ? decodeURIComponent(found.split('=').slice(1).join('=')) : undefined;
  }

  if (authCred) {
    try {
      const parsed = JSON.parse(authCred);
      return {
        token: parsed.token ?? null,
        permissions: parsed.permissions ?? null,
        role: parsed.role ?? null,
      };
    } catch {}
  }

  return {token: null, permissions: null, role: null};
}

export function hasAccess(
  _allowedRoles: string[],
  _userPermissions: string[] | undefined | null,
) {
  if (_userPermissions) {
    return Boolean(_allowedRoles?.find((aRole) => _userPermissions.includes(aRole)));
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

