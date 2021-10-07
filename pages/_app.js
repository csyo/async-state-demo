import {SWRConfig} from 'swr';
import { QueryClient, QueryClientProvider } from 'react-query';
import 'src/styles/globals.css'

const swrConfig = {
  dedupingInterval: 2000,
  revalidateOnFocus: false,
}

const reactQueryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 2000,
      cacheTime: 10000,
      refetchOnWindowFocus: false,
      notifyOnChangeProps: 'tracked',
    }
  }
}

const queryClient = new QueryClient(reactQueryClientConfig);

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SWRConfig value={swrConfig}>
        <Component {...pageProps} />
      </SWRConfig>
    </QueryClientProvider>
  )
}

export default MyApp
