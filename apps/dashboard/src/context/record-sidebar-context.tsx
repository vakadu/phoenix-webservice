import { createContext, useContext } from 'react';

export const RecordSidebarContext = createContext<ICommonTypes.IRecordSidebarContextType | null>(
	null
);

export const useRecordSidebar = () => {
	const context = useContext(RecordSidebarContext);
	if (context === undefined) {
		throw new Error('useRecordSidebar is undefined');
	}

	return context;
};
