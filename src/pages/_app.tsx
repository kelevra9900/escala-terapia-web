import "@/styles/globals.css";
import type {AppProps} from "next/app";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import {Toaster} from 'react-hot-toast';

import {AuthProvider} from "@/context/AuthContext";
import {Layout} from "@/components/organisms";

export default function App({Component,pageProps}: AppProps) {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
      <Toaster position="top-right" toastOptions={{duration: 4000}} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
