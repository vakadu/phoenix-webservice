'use client';

import Sidebar from '../sidebar/sidebar';
import Filters from './components/filters';
import FollowupForm from './components/follow-up-form';
import Records from './components/records';
import useFollowup from './hooks/use-follwup';

interface IFollowup {
	showDays?: boolean;
	showFilters?: boolean;
}

export function Followup({ showDays = true, showFilters = true }: IFollowup) {
	const { activeFilter, setActiveFilter, petId, setShowSidebar, showSidebar, parentId, refetch } =
		useFollowup();

	return (
		<div>
			{showFilters && (
				<Filters
					activeFilter={activeFilter}
					setActiveFilter={setActiveFilter}
					petId={petId as string | undefined}
					setShowSidebar={setShowSidebar}
				/>
			)}
			<Records activeFilter={activeFilter} petId={petId as string} />
			<Sidebar isOpen={showSidebar} handleClose={() => setShowSidebar(false)}>
				<FollowupForm
					refetch={refetch}
					petId={petId as string}
					parentId={parentId as string}
					handleClose={() => setShowSidebar(false)}
				/>
			</Sidebar>
		</div>
	);
}

export default Followup;
