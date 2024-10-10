'use client';

import Sidebar from '../sidebar/sidebar';
import Filters from './components/filters';
import VaccinationRecords from './components/records';
import VaccinationForm from './components/vaccination-form';
import useVaccination from './hooks/use-vaccination.hook';

interface IVaccination {
	showDays?: boolean;
	selected: string;
}

export function Vaccination({ showDays = true, selected }: IVaccination) {
	const { activeFilter, setActiveFilter, petId, setShowSidebar, showSidebar, refetch, parentId } =
		useVaccination();

	return (
		<div>
			<Filters
				activeFilter={activeFilter}
				setActiveFilter={setActiveFilter}
				petId={petId as string | undefined}
				setShowSidebar={setShowSidebar}
			/>
			<VaccinationRecords activeFilter={activeFilter} petId={petId as string} />
			<Sidebar isOpen={showSidebar} handleClose={() => setShowSidebar(false)}>
				<VaccinationForm
					refetch={refetch}
					petId={petId}
					parentId={parentId as string}
					handleClose={() => setShowSidebar(false)}
				/>
			</Sidebar>
		</div>
	);
}

export default Vaccination;
