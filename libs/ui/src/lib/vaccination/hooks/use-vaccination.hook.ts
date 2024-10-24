'use client';

import { useState } from 'react';
import { format } from 'date-fns';

import { useRouterQuery } from '@webservices/hooks';
import { useGetVaccinationRecords } from '@webservices/api';

export default function useVaccination() {
	const { query, params } = useRouterQuery();
	const petId = query?.id as string;
	const parentId = params.get('parentId');
	const [activeFilter, setActiveFilter] = useState('PENDING');
	const [showSidebar, setShowSidebar] = useState(false);
	const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
	const { refetch } = useGetVaccinationRecords({
		type: activeFilter,
		...(petId ? { petId } : { date: selectedDate }),
	});

	const handleDate = (date: string) => {
		setSelectedDate(date);
	};

	return {
		activeFilter,
		setActiveFilter,
		petId,
		parentId,
		setShowSidebar,
		showSidebar,
		refetch,
		handleDate,
		selectedDate,
	};
}
