/* eslint-disable @typescript-eslint/no-explicit-any */
import "@/styles/globals.css";
import type {AppProps} from "next/app";
import {DefaultSeo,OrganizationJsonLd,SiteLinksSearchBoxJsonLd,LogoJsonLd,NextSeo} from 'next-seo';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import {Toaster} from 'react-hot-toast';

const AuthProvider = dynamic(() => import('@/context/AuthContext').then(mod => mod.AuthProvider),{
  ssr: false,
});
import {UIProvider} from "@/context/UIContext";
import {ModalProvider} from "@/context/ModalContext";
import {NextPageWithLayout} from "@/types";
import ManagedModal from "@/components/organisms/Modal/managed-modal";
import PrivateRoute from "@/utils/privateRoute";
import defaultSeo from '@/settings/seo.settings';
import dynamic from "next/dynamic";
import {useRouter} from 'next/router';
import {useState} from 'react';
import {ALLOWED_ROLES,ONLY_ADMIN_ROLE} from '@/utils/constants';


type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};


const Noop: React.FC<{children?: React.ReactNode}> = ({children}) => (
  <>{children}</>
);

export default function App({Component,pageProps}: AppPropsWithLayout) {
  const Layout = (Component as any).Layout || Noop;
  const componentAuthProps = (Component as any).authenticate;
  // Keep a single QueryClient instance across renders
  const [queryClient] = useState(() => new QueryClient());
  const router = useRouter();

  // Infer authentication requirements by pathname when the page didn't declare them
  const pathname = router.pathname || '';
  let inferredAuthProps: {permissions: string[]} | undefined = undefined;
  if (/^\/admin(\/|$)/.test(pathname)) {
    inferredAuthProps = {permissions: ONLY_ADMIN_ROLE};
  } else if (/^\/(therapist|dashboard|account)(\/|$)/.test(pathname)) {
    inferredAuthProps = {permissions: ALLOWED_ROLES};
  } else if (/^\/(checkout|subscription)(\/|$)/.test(pathname)) {
    inferredAuthProps = {permissions: ALLOWED_ROLES};
  }

  const finalAuthProps = componentAuthProps ?? inferredAuthProps;

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <UIProvider>
          <ModalProvider>
            <DefaultSeo {...defaultSeo} />
            {/* Global JSON-LD */}
            <OrganizationJsonLd
              type="Organization"
              id={`${process.env.NEXT_PUBLIC_FRONTEND_URL || 'https://escalaterapia.com'}/#organization`}
              name="Escala Terapia"
              url={process.env.NEXT_PUBLIC_FRONTEND_URL || 'https://escalaterapia.com'}
              logo={(process.env.NEXT_PUBLIC_FRONTEND_URL || 'https://escalaterapia.com') + '/logo.png'}
              sameAs={[
                'https://x.com/escala_terapia',
              ]}
            />
            <LogoJsonLd
              logo={(process.env.NEXT_PUBLIC_FRONTEND_URL || 'https://escalaterapia.com') + '/logo.png'}
              url={process.env.NEXT_PUBLIC_FRONTEND_URL || 'https://escalaterapia.com'}
            />
            <SiteLinksSearchBoxJsonLd
              url={process.env.NEXT_PUBLIC_FRONTEND_URL || 'https://escalaterapia.com'}
              potentialActions={[
                {
                  target: `${process.env.NEXT_PUBLIC_FRONTEND_URL || 'https://escalaterapia.com'}/search?q={search_term_string}`,
                  queryInput: 'search_term_string',
                },
              ]}
            />
            {/* Prevent indexing on private areas */}
            {/^(\/admin|\/dashboard|\/therapist|\/account|\/checkout|\/subscription)(\/|$)/.test(pathname) ? (
              <NextSeo noindex nofollow />
            ) : null}
            {finalAuthProps ? (
              <PrivateRoute authProps={finalAuthProps}>
                <Layout {...pageProps}>
                  <Component {...pageProps} />
                </Layout>
              </PrivateRoute>
            ) : (
              <Layout {...pageProps}>
                <Component {...pageProps} />
              </Layout>
            )}
            <ManagedModal />
          </ModalProvider>
        </UIProvider>
      </AuthProvider>
      <Toaster position="top-right" toastOptions={{duration: 4000}} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
