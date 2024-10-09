import { useRouterQuery } from '@webservices/hooks';
import { useState } from 'react';

export default function useMedicalRecord() {
	const [activeFilter, setActiveFilter] = useState('PRESCRIPTION');
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
