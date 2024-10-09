import { useGetFollowRecords } from '@webservices/api';
import { useCallback } from 'react';

interface IProps {
	activeFilter: string;
	petId: string;
}

export default function useRecord({ activeFilter, petId }: IProps) {
	const { data, isPending, refetch } = useGetFollowRecords({
		type: activeFilter,
		...(petId ? { petId } : { date: '' }),
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
