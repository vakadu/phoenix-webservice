'use client';

import dynamic from 'next/dynamic';
import { useEffect } from 'react';

import Records from '../../molecules/medical-records/records';
import Filters from '../../molecules/medical-records/filters';
import { Loading } from '@webservices/ui';
import { useRecordSidebar } from '../../../context/record-sidebar-context';
import { useRouterQuery } from '@webservices/hooks';

const Sidebar = dynamic(() => import('./sidebar'), {
	loading: () => <Loading />,
});

const MedicalRecords = () => {
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
		handleActiveType('upload');
		handleActiveParent(parentId as string);
		handleActivePet(query.id as string);
		handleRecordType('medical');
		handleFilter('PRESCRIPTION');
	}, [query.id]);

	return (
		<div>
			<Filters />
			<Records />
			<Sidebar />
		</div>
	);
};

export default MedicalRecords;
