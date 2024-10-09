import { useState } from 'react';

import { useRouterQuery } from '@webservices/hooks';

export default function useFollowup() {
	const [activeFilter, setActiveFilter] = useState('UPCOMING');
	const { query, params } = useRouterQuery();
	const petId = query?.id;
	const parentId = params.get('parentId');

	return {
		activeFilter,
		setActiveFilter,
		petId,
		parentId,
	};
}
