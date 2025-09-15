/* eslint-disable @typescript-eslint/no-explicit-any */
import {getAuthCredentials as getAuthCredentialsClient, setAuthCredentials as setAuthCredentialsClient, hasAccess as hasAccessClient, isAuthenticated as isAuthenticatedClient} from './auth.client';
import {getAuthCredentials as getAuthCredentialsServer} from './auth.server';

export const allowedRoles = [];

export function setAuthCredentials(token: string, permissions: any, role: any) {
  // Only set on client in this project
  return setAuthCredentialsClient(token, permissions, role);
}

export function getAuthCredentials(context?: any) {
  if (context || typeof window === 'undefined') {
    return getAuthCredentialsServer(context);
  }
  return getAuthCredentialsClient();
}

export const hasAccess = hasAccessClient;
export const isAuthenticated = isAuthenticatedClient;
