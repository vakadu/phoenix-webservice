import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { ApiEndpoints } from '@webservices/primitives';
import { HttpService } from '@webservices/services';

interface IPayload {
	petId: string;
	parentId: string;
	followUpType: string;
	followUpDates: string[];
}

const createFollowup = async (payload: IPayload) => {
	try {
		const { data } = await HttpService.post(
			`${process.env.NEXT_PUBLIC_BASE_PATH}/${ApiEndpoints.ClinicFollowup}`,
			payload
		);
		return data;
	} catch (err) {
		throw new Error('Network Error');
	}
};

export function useCreateFollowUpRecords() {
	return useMutation({
		mutationFn: createFollowup,
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

export default useCreateFollowUpRecords;
