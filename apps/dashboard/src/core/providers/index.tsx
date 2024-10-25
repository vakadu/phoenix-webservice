'use client';

import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Toaster } from 'react-hot-toast';

import { pemilyPersistor, pemilyStore } from '@webservices/slices';
import { ModalView } from '@webservices/ui';

export default function Providers({ children }: any) {
	const [queryClient] = useState(() => new QueryClient());

	return (
		<Provider store={pemilyStore}>
			<PersistGate loading={null} persistor={pemilyPersistor}>
				<QueryClientProvider client={queryClient}>
					{children}
					<ModalView />
					<Toaster
						position="top-right"
						toastOptions={{
							style: {
								background: '#333',
								color: '#fff',
							},
						}}
					/>
				</QueryClientProvider>
			</PersistGate>
		</Provider>
	);
}
