'use client';

import Filters from './components/filters';
import VaccinationRecords from './components/records';
import useVaccination from './hooks/use-vaccination.hook';

interface IVaccination {
	showDays?: boolean;
}

export function Vaccination({ showDays = true }: IVaccination) {
	const { activeFilter, setActiveFilter, petId } = useVaccination();

	return (
		<div>
			<Filters
				activeFilter={activeFilter}
				setActiveFilter={setActiveFilter}
				petId={petId as string | undefined}
			/>
			<VaccinationRecords activeFilter={activeFilter} petId={petId as string} />
		</div>
	);
}

export default Vaccination;
