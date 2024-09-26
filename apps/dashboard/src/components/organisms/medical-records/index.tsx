'use client';

import dynamic from 'next/dynamic';

import { RecordSidebarProvider } from '../../../context/record-sidebar-context';
import Records from '../../molecules/medical-records/records';
import Days from '../../molecules/medical-records/days';
import Filters from '../../molecules/medical-records/filters';
import { Loading } from '@webservices/ui';

const RecordsSidebar = dynamic(() => import('../../molecules/records/sidebar'), {
	loading: () => <Loading />,
});

const MedicalRecords = () => {
	return (
		<RecordSidebarProvider record="medical">
			<h1 className="text-24 font-semibold">Medical Records</h1>
			<div className="px-16 mt-12 sticky top-[0px] z-[11] bg-white py-8 shadow-base rounded-8">
				<Days />
				<Filters />
			</div>
			<Records />
			<RecordsSidebar />
		</RecordSidebarProvider>
	);
};

export default MedicalRecords;
