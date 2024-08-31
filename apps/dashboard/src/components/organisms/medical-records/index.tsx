'use client';

import { useState } from 'react';
import { format } from 'date-fns';

import { RecordFilterContext } from '../../../context/record-filter-context';
import Header from '../../molecules/medical-records/header';
import { medicalRecordsFilters } from '@webservices/constants';
import { RecordDateContext } from '../../../context/record-date-context';
import { RecordSidebarContext } from '../../../context/record-sidebar-context';
import RecordsSidebar from '../../molecules/medical-records/sidebar';

const MedicalRecords = () => {
	const [activeRecord, handleRecord] = useState(medicalRecordsFilters[0].value);
	const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
	const [showSidebar, setSidebar] = useState(false);
	const [activeType, setActiveType] = useState<string | null>(null);

	const handleFilter = (id: string) => {
		handleRecord(id);
	};

	const handleDate = (id: string) => {
		setSelectedDate(id);
	};

	const handleSidebar = (side: boolean) => {
		setSidebar(side);
	};

	const handleActiveType = (type: string) => {
		setActiveType(type);
	};

	const recordValue = {
		activeRecord,
		handleRecord: handleFilter,
	} as ICommonTypes.IRecordFilterContextType;

	const dateValue = {
		recordSelectedDate: selectedDate,
		handleRecordSelectedDate: handleDate,
	} as ICommonTypes.IRecordDateContextType;

	const sidebarValue = {
		showSidebar,
		handleSidebar,
		activeType,
		handleActiveType,
	} as ICommonTypes.IRecordSidebarContextType;

	return (
		<RecordSidebarContext.Provider value={sidebarValue}>
			<RecordDateContext.Provider value={dateValue}>
				<RecordFilterContext.Provider value={recordValue}>
					<section>
						<Header />
						<RecordsSidebar />
					</section>
				</RecordFilterContext.Provider>
			</RecordDateContext.Provider>
		</RecordSidebarContext.Provider>
	);
};

export default MedicalRecords;
