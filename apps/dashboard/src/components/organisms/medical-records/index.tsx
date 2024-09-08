'use client';

import dynamic from 'next/dynamic';

import Header from '../../molecules/medical-records/header';
import { RecordSidebarProvider } from '../../../context/record-sidebar-context';
import Records from '../../molecules/medical-records/records';

const RecordsSidebar = dynamic(() => import('../../molecules/medical-records/sidebar'), {
	loading: () => <p>Loading...</p>,
});

const MedicalRecords = () => {
	return (
		<RecordSidebarProvider record="medical">
			<section>
				<Header />
				<RecordsSidebar />
				<Records />
			</section>
		</RecordSidebarProvider>
	);
};

export default MedicalRecords;
