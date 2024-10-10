import { useState } from 'react';

import { useRouterQuery } from '@webservices/hooks';

export default function useMedicalRecord() {
	const [activeFilter, setActiveFilter] = useState('PRESCRIPTION');
	const [showSidebar, setShowSidebar] = useState(false);
	const { query, params } = useRouterQuery();
	const petId = query?.id;
	const parentId = params.get('parentId');

	return {
		activeFilter,
		setActiveFilter,
		petId,
		parentId,
		setShowSidebar,
		showSidebar,
	};
}
