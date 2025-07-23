/* eslint-disable @typescript-eslint/no-explicit-any */
import "@/styles/globals.css";
import type {AppProps} from "next/app";
import {DefaultSeo} from 'next-seo';
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


type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};


const Noop: React.FC<{children?: React.ReactNode}> = ({children}) => (
  <>{children}</>
);

export default function App({Component,pageProps}: AppPropsWithLayout) {
  const Layout = (Component as any).Layout || Noop;
  const authProps = (Component as any).authenticate;
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <UIProvider>
          <ModalProvider>
            <DefaultSeo {...defaultSeo} />
            {authProps ? (
              <PrivateRoute authProps={authProps}>
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
