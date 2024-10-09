'use client';

import Filters from './components/filters';
import Records from './components/records';
import useFollowup from './hooks/use-follwup';

interface IFollowup {
	showDays?: boolean;
	showFilters?: boolean;
}

export function Followup({ showDays = true, showFilters = true }: IFollowup) {
	const { activeFilter, setActiveFilter, petId } = useFollowup();

	return (
		<div>
			{showFilters && (
				<Filters activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
			)}
			<Records activeFilter={activeFilter} petId={petId as string} />
		</div>
	);
}

export default Followup;
