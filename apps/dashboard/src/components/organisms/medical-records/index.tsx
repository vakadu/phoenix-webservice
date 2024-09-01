'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import dynamic from 'next/dynamic';

import { RecordFilterContext } from '../../../context/record-filter-context';
import Header from '../../molecules/medical-records/header';
import { medicalRecordsFilters } from '@webservices/constants';
import { RecordDateContext } from '../../../context/record-date-context';
import { RecordSidebarProvider } from '../../../context/record-sidebar-context';

const RecordsSidebar = dynamic(() => import('../../molecules/medical-records/sidebar'), {
	loading: () => <p>Loading...</p>,
});

const MedicalRecords = () => {
	const [activeRecord, handleRecord] = useState(medicalRecordsFilters[0].value);
	const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));

	const handleFilter = (id: string) => {
		handleRecord(id);
	};

	const handleDate = (id: string) => {
		setSelectedDate(id);
	};

	const recordValue = {
		activeRecord,
		handleRecord: handleFilter,
	} as ICommonTypes.IRecordFilterContextType;

	const dateValue = {
		recordSelectedDate: selectedDate,
		handleRecordSelectedDate: handleDate,
	} as ICommonTypes.IRecordDateContextType;

	return (
		<RecordSidebarProvider>
			<RecordDateContext.Provider value={dateValue}>
				<RecordFilterContext.Provider value={recordValue}>
					<section>
						<Header />
						<RecordsSidebar />
					</section>
				</RecordFilterContext.Provider>
			</RecordDateContext.Provider>
		</RecordSidebarProvider>
	);
};

export default MedicalRecords;
