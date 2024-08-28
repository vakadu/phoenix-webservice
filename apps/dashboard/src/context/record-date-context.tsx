import { createContext, useContext } from 'react';

export const RecordDateContext = createContext<ICommonTypes.IRecordDateContextType | null>(null);

export const useRecordDate = () => {
	const context = useContext(RecordDateContext);

	if (context === undefined) {
		throw new Error('useRecordDate must be used within a RecordDateProvider ');
	}

	return context;
};
