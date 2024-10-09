import { useState } from 'react';

import { useRouterQuery } from '@webservices/hooks';

export default function useVaccination() {
	const { query, params } = useRouterQuery();
	const petId = query?.id;
	const parentId = params.get('parentId');
	const [activeFilter, setActiveFilter] = useState('PENDING');

	return {
		activeFilter,
		setActiveFilter,
		petId,
		parentId,
	};
}
