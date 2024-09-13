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
				<h1 className="text-24 px-16 font-semibold">Follow ups</h1>
				<Header />
				<RecordsSidebar />
				<Followups />
			</section>
		</RecordSidebarProvider>
	);
};

export default Followup;
