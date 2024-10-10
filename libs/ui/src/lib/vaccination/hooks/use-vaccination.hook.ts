'use client';

import { useState } from 'react';

import { useRouterQuery } from '@webservices/hooks';
import { useGetVaccinationRecords } from '@webservices/api';

export default function useVaccination() {
	const { query, params } = useRouterQuery();
	const petId = query?.id as string;
	const parentId = params.get('parentId');
	const [activeFilter, setActiveFilter] = useState('PENDING');
	const [showSidebar, setShowSidebar] = useState(false);
	const { refetch } = useGetVaccinationRecords({
		type: activeFilter,
		...(petId ? { petId } : { date: '' }),
	});

	return {
		activeFilter,
		setActiveFilter,
		petId,
		parentId,
		setShowSidebar,
		showSidebar,
		refetch,
	};
}
