import { useGetMedicalRecords } from '@webservices/api';
import { useCallback } from 'react';

interface IProps {
	activeFilter: string;
	petId: string;
}

export default function useRecord({ activeFilter, petId }: IProps) {
	const { data, isPending, refetch } = useGetMedicalRecords({
		type: activeFilter,
		...(petId ? { petId } : { date: '' }),
	});

	const handleRefetch = useCallback(() => {
		refetch();
	}, []);

	return {
		medicalRecords: data?.data?.medicalRecords,
		isPending,
		refetch: handleRefetch,
	};
}
