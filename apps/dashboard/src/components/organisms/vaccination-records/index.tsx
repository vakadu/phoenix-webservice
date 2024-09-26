'use client';

import dynamic from 'next/dynamic';

import { RecordSidebarProvider } from '../../../context/record-sidebar-context';
import Days from '../../molecules/medical-records/days';
import Filters from '../../molecules/medical-records/filters';
import { Loading } from '@webservices/ui';
import Vaccination from '../../molecules/vaccination/records';

const RecordsSidebar = dynamic(() => import('../../molecules/records/sidebar'), {
	loading: () => <Loading />,
});

const VaccinationRecords = () => {
	return (
		<RecordSidebarProvider record="vaccination">
			<h1 className="text-24 font-semibold">Vaccination Records</h1>
			<div className="px-16 mt-12 sticky top-[0px] z-[11] bg-white py-8 shadow-base rounded-8">
				<Days />
				<Filters />
			</div>
			<Vaccination />
			<RecordsSidebar />
		</RecordSidebarProvider>
	);
};

export default VaccinationRecords;
