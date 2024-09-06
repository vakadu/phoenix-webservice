'use client';

import { medicalRecordsFilters } from '@webservices/constants';
import { format } from 'date-fns';
import { createContext, useContext, useState } from 'react';

type IActiveType = 'pet-parents' | 'pets' | 'upload' | 'comment';

const RecordSidebarContext = createContext<ICommonTypes.IRecordSidebarContextType | null>(null);

export const RecordSidebarProvider = ({ children }: { children: React.ReactNode }) => {
	const [showSidebar, setSidebar] = useState(false);
	const [activeType, setActiveType] = useState<IActiveType>('pet-parents');
	const [activeParentId, setActiveParentId] = useState<string | null>(null);
	const [activePetId, setActivePetId] = useState<string | null>(null);
	const [activeClinicId, setActiveClinicId] = useState<string | null>(null);
	const [activeRecord, setRecord] = useState(medicalRecordsFilters[0].value);
	const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));

	const handleSidebar = (side: boolean) => {
		setSidebar(side);
	};

	const handleActiveType = (type: IActiveType) => {
		setActiveType(type);
	};

	const handleActiveParent = (parent: string) => {
		setActiveParentId(parent);
	};

	const handleActivePet = (petId: string) => {
		setActivePetId(petId);
	};

	const handleActiveClinicId = (clinicId: string) => {
		setActiveClinicId(clinicId);
	};

	const handleFilter = (id: string) => {
		setRecord(id);
	};

	const handleDate = (date: string) => {
		setSelectedDate(date);
	};

	const resetSidebar = () => {
		setSidebar(false);
		setActiveType('pet-parents');
		setActiveParentId(null);
	};

	const sidebarValue = {
		showSidebar,
		handleSidebar,
		activePetId,
		activeParentId,
		activeType,
		handleActiveType,
		handleActiveParent,
		resetSidebar,
		handleActivePet,
		activeClinicId,
		handleActiveClinicId,
		activeRecord,
		selectedDate,
		handleFilter,
		handleDate,
	} as ICommonTypes.IRecordSidebarContextType;

	return (
		<RecordSidebarContext.Provider value={sidebarValue}>
			{children}
		</RecordSidebarContext.Provider>
	);
};

export const useRecordSidebar = () => {
	const context = useContext(RecordSidebarContext);
	if (!context) {
		throw new Error('useRecordSidebar must be used within a RecordSidebarProvider');
	}

	return context;
};
