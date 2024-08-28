'use client';

import { createContext, useContext } from 'react';

export const RecordFilterContext = createContext<ICommonTypes.IRecordFilterContextType | null>(
	null
);

export function useRecordFilter() {
	const context = useContext(RecordFilterContext);

	if (context === undefined) {
		throw new Error('useRecordFilter must be used within a RecordFilterProvider');
	}

	return context;
}
