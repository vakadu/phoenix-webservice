/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";

import { pemilyStore } from '@webservices/slices';
import { ModalView, Snackbar } from '@webservices/ui';

persistStore(pemilyStore);

export default function Providers({ children }: any) {
    const [queryClient] = React.useState(() => new QueryClient());

    return (
        <Provider store={pemilyStore}>
            <QueryClientProvider client={queryClient}>
                {children}
                <ModalView />
                <Snackbar />
            </QueryClientProvider>
        </Provider>
    )
}
