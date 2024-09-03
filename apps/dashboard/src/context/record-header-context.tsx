import { format } from 'date-fns';
import { useContext, createContext, useState, ReactNode } from 'react';
import { medicalRecordsFilters } from '@webservices/constants';

interface IRecordHeader {
	activeRecord: string;
	selectedDate: string;
	handleFilter: (id: string) => void;
	handleDate: (date: string) => void;
}

const RecordHeaderContext = createContext<IRecordHeader | null>(null);

export const RecordHeaderProvider = ({ children }: { children: ReactNode }) => {
	const [activeRecord, setRecord] = useState(medicalRecordsFilters[0].value);
	const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));

	const handleFilter = (id: string) => {
		setRecord(id);
	};

	const handleDate = (date: string) => {
		setSelectedDate(date);
	};

	const value: IRecordHeader = {
		activeRecord,
		selectedDate,
		handleFilter,
		handleDate,
	};

	return <RecordHeaderContext.Provider value={value}>{children}</RecordHeaderContext.Provider>;
};

export const useRecordHeader = () => {
	const context = useContext(RecordHeaderContext);
	if (context === null) {
		throw new Error('useRecordHeader must be used within a RecordHeaderProvider');
	}

	return context;
};
