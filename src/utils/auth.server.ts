/* eslint-disable @typescript-eslint/no-explicit-any */
import {AUTH_CRED} from './constants';

// Parse cookies from Next.js pages context (SSR)
export function parseSSRCookie(context: any) {
  try {
    const header = context?.req?.headers?.cookie as string | undefined;
    if (!header) return {} as Record<string, string>;
    const out: Record<string, string> = {};
    for (const part of header.split('; ')) {
      const [name, ...rest] = part.split('=');
      out[name] = decodeURIComponent(rest.join('='));
    }
    return out;
  } catch {
    return {} as Record<string, string>;
  }
}

export function getAuthCredentials(context?: any) {
  let authCred: string | undefined;

  if (context?.req?.headers?.cookie) {
    const map = parseSSRCookie(context);
    authCred = map?.[AUTH_CRED];
  } else {
    // App Router server context (optional): try next/headers if available
    try {
      // Import lazily to avoid bundling into client
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const {cookies} = require('next/headers') as {cookies: () => any};
      const store = cookies();
      authCred = store?.get?.(AUTH_CRED)?.value;
    } catch {
      authCred = undefined;
    }
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

