'use client';

import dynamic from 'next/dynamic';

import { RecordSidebarProvider } from '../../../context/record-sidebar-context';
import Days from '../../molecules/medical-records/days';
import Filters from '../../molecules/medical-records/filters';
import { Loading } from '@webservices/ui';
import Followups from '../../molecules/followup/records';

const RecordsSidebar = dynamic(() => import('../../molecules/records/sidebar'), {
	loading: () => <Loading />,
});

const Followup = () => {
	return (
		<RecordSidebarProvider record="followup">
			<h1 className="text-24 font-semibold">Follow ups</h1>
			<div className="px-16 mt-12 sticky top-[0px] z-[11] bg-white py-8 shadow-base rounded-8">
				<Days />
				<Filters />
			</div>
			<Followups />
			<RecordsSidebar />
		</RecordSidebarProvider>
	);
};

export default Followup;
