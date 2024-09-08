'use client';

import dynamic from 'next/dynamic';

import Header from '../../molecules/medical-records/header';
import { RecordSidebarProvider } from '../../../context/record-sidebar-context';
import Vaccination from '../../molecules/vaccination/records';

const RecordsSidebar = dynamic(() => import('../../molecules/medical-records/sidebar'), {
	loading: () => <p>Loading...</p>,
});

const VaccinationRecords = () => {
	return (
		<RecordSidebarProvider record="vaccination">
			<section>
				<Header />
				<RecordsSidebar />
				<Vaccination />
			</section>
		</RecordSidebarProvider>
	);
};

export default VaccinationRecords;
