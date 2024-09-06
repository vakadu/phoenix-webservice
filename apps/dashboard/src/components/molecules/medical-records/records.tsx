import { useState } from 'react';

import { useGetMedicalRecords } from '@webservices/api';
import MedicalRecord from '../../atoms/medical-record';
import { CategoryLoader } from '@webservices/ui';
import { useRecordSidebar } from '../../../context/record-sidebar-context';

const Records = () => {
	const { activeRecord, selectedDate } = useRecordSidebar();
	const { data, isPending } = useGetMedicalRecords({ type: activeRecord, date: selectedDate });

	if (isPending) {
		return (
			<section className="px-16 mt-12">
				<CategoryLoader columns={1} rows={4} />
			</section>
		);
	}

	if (data && data?.data?.medicalRecords?.length <= 0) {
		return (
			<section className="px-16 mt-24">
				<p className="text-16 font-semibold">No records found</p>
			</section>
		);
	}

	return (
		<section className="px-16 mt-12">
			{data?.data?.medicalRecords?.map((medicalRecord) => (
				<MedicalRecord key={medicalRecord._id} record={medicalRecord} />
			))}
		</section>
	);
};

export default Records;
