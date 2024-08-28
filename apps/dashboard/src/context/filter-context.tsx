'use client';

import { createContext, useContext } from 'react';

export const FilterContext = createContext<ICommonTypes.IFilterContextType | null>(null);

export function useFilter() {
	const context = useContext(FilterContext);

	if (context === undefined) {
		throw new Error('useFilter must be used within a FilterProvider');
	}

	return context;
}
