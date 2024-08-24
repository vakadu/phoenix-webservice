import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { ApiEndpoints } from '@webservices/primitives';
import { HttpService } from '@webservices/services';
import useGetStaff from '../use-get-staff/get-staff';

interface IPayload {
	name: string;
}

const createStaff = async (payload: IPayload) => {
	try {
		const { data } = await HttpService.post(
			`${process.env.NEXT_PUBLIC_BASE_PATH}/${ApiEndpoints.AddStaff}`,
			payload
		);
		return data;
	} catch (err) {
		throw new Error('Network Error');
	}
};

export function useCreateStaff(handleClose: () => void) {
	const { refetch } = useGetStaff();

	return useMutation({
		mutationFn: createStaff,
		onSuccess: (data) => {
			if (data?.status === 'SUCCESS') {
				refetch();
				handleClose();
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

export default useCreateStaff;
