'use client';

import { useState } from 'react';

import { FilterContext } from '../../../context/filter-context';
import Header from '../../molecules/medical-records/header';
import { medicalRecordsFilters } from '@webservices/constants';

const MedicalRecords = () => {
	const [activeRecord, handleRecord] = useState(medicalRecordsFilters[0].value);

	const handleFilter = (id: string) => {
		handleRecord(id);
	};

	const value = {
		activeRecord,
		handleRecord: handleFilter,
	} as ICommonTypes.IFilterContextType;

	return (
		<FilterContext.Provider value={value}>
			<section>
				<Header />
			</section>
		</FilterContext.Provider>
	);
};

export default MedicalRecords;
