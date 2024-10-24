import { useGetFollowRecords } from '@webservices/api';
import { useCallback } from 'react';

interface IProps {
	activeFilter: string;
	petId: string;
	selectedDate: string;
}

export default function useRecord({ activeFilter, petId, selectedDate }: IProps) {
	const { data, isPending, refetch } = useGetFollowRecords({
		type: activeFilter,
		...(petId ? { petId } : { date: selectedDate }),
	});

	const handleRefetch = useCallback(() => {
		refetch();
	}, []);

	return {
		followUpRecords: data?.data?.followUpRecords,
		isPending,
		refetch: handleRefetch,
	};
}
