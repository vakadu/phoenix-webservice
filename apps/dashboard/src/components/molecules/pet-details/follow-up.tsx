'use client';

import dynamic from 'next/dynamic';
import { useEffect } from 'react';

import Filters from '../../molecules/medical-records/filters';
import { Loading } from '@webservices/ui';
import { useRecordSidebar } from '../../../context/record-sidebar-context';
import { useRouterQuery } from '@webservices/hooks';
import Followups from '../followup/records';

const Sidebar = dynamic(() => import('./sidebar'), {
	loading: () => <Loading />,
});

const Followup = () => {
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
		handleActiveType('followup');
		handleActiveParent(parentId as string);
		handleActivePet(query.id as string);
		handleRecordType('followup');
		handleFilter('UPCOMING');
	}, [query.id]);

	return (
		<div>
			<Filters />
			<Followups />
			<Sidebar />
		</div>
	);
};

export default Followup;
