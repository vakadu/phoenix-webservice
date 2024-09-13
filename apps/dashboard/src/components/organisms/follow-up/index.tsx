'use client';

import dynamic from 'next/dynamic';

import Header from '../../molecules/medical-records/header';
import { RecordSidebarProvider } from '../../../context/record-sidebar-context';
import Followups from '../../molecules/followup/records';

const RecordsSidebar = dynamic(() => import('../../molecules/medical-records/sidebar'), {
	loading: () => <p>Loading...</p>,
});

const Followup = () => {
	return (
		<RecordSidebarProvider record="followup">
			<section>
				<p className="text-24 px-16 font-semibold">Follow ups</p>
				<Header />
				<RecordsSidebar />
				<Followups />
			</section>
		</RecordSidebarProvider>
	);
};

export default Followup;
