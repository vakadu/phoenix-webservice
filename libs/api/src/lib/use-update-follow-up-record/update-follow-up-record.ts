import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { ApiEndpoints } from '@webservices/primitives';
import { HttpService } from '@webservices/services';
import useGetFollowRecords from '../use-get-follow-records/get-follow-records';

interface IPayload {
	followUpDate?: string;
	active: boolean;
	id: string;
}

const updateFollowupRecord = async (payload: IPayload) => {
	const { id, ...rest } = payload;
	try {
		const { data } = await HttpService.patch(
			`${process.env.NEXT_PUBLIC_BASE_PATH}/${ApiEndpoints.UpdateClinicFollowup}/${id}`,
			rest
		);
		return data;
	} catch (err) {
		throw new Error('Network Error');
	}
};

export function useUpdateFollowUpRecord({ type, date }: { type: string; date: string }) {
	const { refetch } = useGetFollowRecords({ type, date });
	return useMutation({
		mutationFn: (payload: IPayload) => updateFollowupRecord(payload),
		onSuccess: (data) => {
			if (data?.status === 'SUCCESS') {
				refetch();
				toast.success('Updated Successfully!');
			} else {
				toast.error('Something went wrong. Please try again');
			}
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});
}

export default useUpdateFollowUpRecord;