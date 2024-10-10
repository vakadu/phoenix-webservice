import { useState } from 'react';

import { useRouterQuery } from '@webservices/hooks';
import { useGetFollowRecords } from '@webservices/api';

export default function useFollowup() {
	const [activeFilter, setActiveFilter] = useState('UPCOMING');
	const { query, params } = useRouterQuery();
	const petId = query?.id as string;
	const parentId = params.get('parentId');
	const [showSidebar, setShowSidebar] = useState(false);
	const { refetch } = useGetFollowRecords({
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
