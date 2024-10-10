'use client';

import Sidebar from '../sidebar/sidebar';
import Filters from './components/filters';
import Records from './components/records';
import Upload from './components/upload';
import useMedicalRecord from './hooks/medical-record.hook';
import { firstCharCapital } from '@webservices/helpers';

interface IMedicalRecords {
	showDays?: boolean;
	selected: string;
}

export function MedicalRecord({ showDays = true, selected }: IMedicalRecords) {
	const {
		activeFilter,
		setActiveFilter,
		petId,
		showSidebar,
		setShowSidebar,
		handleUploadClick,
		uploadMedicalRecordPending,
	} = useMedicalRecord();

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
				<Upload
					isLoading={uploadMedicalRecordPending}
					handleClick={handleUploadClick}
					btnTxt={`Upload ${firstCharCapital(activeFilter as string)}`}
					headingTxt={`Upload a photo of your ${firstCharCapital(
						activeFilter as string
					)}`}
				/>
			</Sidebar>
		</div>
	);
}

export default MedicalRecord;
