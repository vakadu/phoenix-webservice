import { useCallback } from 'react';

import { useGetMedicalRecords } from '@webservices/api';

export default function useCertificate({ activeFilter, petId }: { activeFilter: string, petId: string }) {
	const { data, isPending, refetch } = useGetMedicalRecords({
		type: activeFilter,
		petId
	});

	const handleRefetch = useCallback(() => {
		refetch();
	}, []);

	return {
		records: data?.data?.medicalRecords,
		isPending,
		refetch: handleRefetch,
	};
}
