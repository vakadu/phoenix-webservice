'use client';

import dynamic from 'next/dynamic';

import { RecordSidebarProvider } from '../../../context/record-sidebar-context';
import Days from '../../molecules/medical-records/days';
import { Loading } from '@webservices/ui';
import Followups from '../../molecules/followup/records';

const RecordsSidebar = dynamic(() => import('../../molecules/records/sidebar'), {
	loading: () => <Loading />,
});

const Followup = () => {
	return (
		<RecordSidebarProvider record="followup">
			<div className="px-16 mt-12 sticky top-[0px] z-[11] bg-white py-8 shadow-base rounded-8">
				<Days />
			</div>
			<Followups />
			<RecordsSidebar />
		</RecordSidebarProvider>
	);
};

export default Followup;
