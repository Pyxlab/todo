import React from 'react';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import superjson from 'superjson';
import { useCookies } from 'react-cookie';
import { trpc } from '~/utils/trpc';

const url = import.meta.env.VITE_API_URL;

export const queryCache = new QueryCache()
export const queryClient = new QueryClient({
    queryCache: queryCache,
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5,
        }
    }
});

export const TrpcProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cookies] = useCookies(['token']);

    const trpcClient = trpc.createClient({
        links: [
            httpBatchLink({
                url,
                headers: cookies.token ? { Authorization: `Bearer ${cookies.token}` } : {},
            }),
        ],
        transformer: superjson,
    });

    queryClient.setDefaultOptions({
        queries: {
            enabled: !!cookies.token,
        },
    });

    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </trpc.Provider>
    );
};
