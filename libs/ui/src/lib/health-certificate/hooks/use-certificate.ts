import { useCallback } from 'react';

import { useGetMedicalRecords } from '@webservices/api';

export default function useCertificate({ activeFilter }: { activeFilter: string }) {
	const { data, isPending, refetch } = useGetMedicalRecords({
		type: activeFilter,
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
