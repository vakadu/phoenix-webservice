'use client';

import dynamic from 'next/dynamic';
import { useEffect } from 'react';

import Vaccination from '../../molecules/vaccination/records';
import Filters from '../../molecules/medical-records/filters';
import { Loading } from '@webservices/ui';
import { useRecordSidebar } from '../../../context/record-sidebar-context';
import { useRouterQuery } from '@webservices/hooks';

const Sidebar = dynamic(() => import('./sidebar'), {
	loading: () => <Loading />,
});

const VaccinationRecords = () => {
	const { query, params } = useRouterQuery();
	const parentId = params.get('parentId') || undefined;

	const {
		handleActiveType,
		handleActiveParent,
		handleActivePet,
		handleRecordType,
		handleFilter,
	} = useRecordSidebar();

	useEffect(() => {
		handleActiveType('vaccination');
		handleActiveParent(parentId as string);
		handleActivePet(query.id as string);
		handleRecordType('vaccination');
		handleFilter('PENDING');
	}, [query.id]);

	return (
		<div>
			<Filters />
			<Vaccination />
			<Sidebar />
		</div>
	);
};

export default VaccinationRecords;
