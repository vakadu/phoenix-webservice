'use client';

import Filters from './components/filters';
import Records from './components/records';
import useMedicalRecord from './hooks/medical-record.hook';

interface IMedicalRecords {
	showDays: boolean;
}

export function MedicalRecord({ showDays }: IMedicalRecords) {
	const { activeFilter, setActiveFilter, petId } = useMedicalRecord();

	return (
		<div>
			<Filters activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
			<Records activeFilter={activeFilter} petId={petId as string} />
		</div>
	);
}

export default MedicalRecord;
