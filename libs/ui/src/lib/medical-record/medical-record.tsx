'use client';

import Sidebar from '../sidebar/sidebar';
import Filters from './components/filters';
import Records from './components/records';
import useMedicalRecord from './hooks/medical-record.hook';

interface IMedicalRecords {
	showDays?: boolean;
	selected: string;
}

export function MedicalRecord({ showDays = true, selected }: IMedicalRecords) {
	const { activeFilter, setActiveFilter, petId, showSidebar, setShowSidebar } =
		useMedicalRecord();

	return (
		<div>
			<Filters
				activeFilter={activeFilter}
				setActiveFilter={setActiveFilter}
				petId={petId as string | undefined}
				setShowSidebar={setShowSidebar}
			/>
			<Records activeFilter={activeFilter} petId={petId as string} />
			<Sidebar isOpen={showSidebar} handleClose={() => setShowSidebar(false)}>
				<div>hello</div>
			</Sidebar>
		</div>
	);
}

export default MedicalRecord;
