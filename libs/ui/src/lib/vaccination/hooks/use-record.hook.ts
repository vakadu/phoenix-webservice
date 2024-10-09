import { useGetVaccinationRecords } from '@webservices/api';
import { useCallback } from 'react';

interface IProps {
	activeFilter: string;
	petId: string;
}

export default function useRecord({ activeFilter, petId }: IProps) {
	const { data, isPending, refetch } = useGetVaccinationRecords({
		type: activeFilter,
		...(petId ? { petId } : { date: '' }),
	});

	const handleRefetch = useCallback(() => {
		refetch();
	}, []);

	return {
		vaccinationRecords: data?.data?.vaccinationRecords,
		isPending,
		refetch: handleRefetch,
	};
}
