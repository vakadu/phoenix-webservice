import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { ApiEndpoints } from '@webservices/primitives';
import { HttpService } from '@webservices/services';
import useGetFollowRecords from '../use-get-follow-records/get-follow-records';

interface IPayload {
	parentMobile: number;
	petName: string;
	clinicName: string;
	followUpDate: string;
	followUpType: string;
	id: string;
}

const follwupRemainder = async (payload: IPayload) => {
	const { id, ...rest } = payload;
	try {
		const { data } = await HttpService.patch(
			`${process.env.NEXT_PUBLIC_BASE_PATH}/${ApiEndpoints.ClinicFollowupRemainder}/${id}`,
			rest
		);
		return data;
	} catch (err) {
		throw new Error('Network Error');
	}
};

export function useSendFollowUpRecord({ refetch }: { refetch: () => void }) {
	return useMutation({
		mutationFn: follwupRemainder,
		onSuccess: (data) => {
			if (data?.status === 'SUCCESS') {
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

export default useSendFollowUpRecord;
