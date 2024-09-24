import { useDispatch } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { ApiEndpoints } from '@webservices/primitives';
import { HttpService } from '@webservices/services';
import { closeModal } from '@webservices/slices';

interface IPayload {
	mobileNumber: string;
}

const createParent = async (payload: IPayload) => {
	try {
		const { data } = await HttpService.patch(
			`${process.env.NEXT_PUBLIC_BASE_PATH}/${ApiEndpoints.AddParent}/${payload?.mobileNumber}`,
			payload
		);
		return data;
	} catch (err) {
		throw new Error('Network Error');
	}
};

export function useCreateParent({ refetch }: { refetch: () => void }) {
	const dispatch = useDispatch();

	return useMutation({
		mutationFn: createParent,
		onSuccess: (data) => {
			if (data?.status === 'SUCCESS') {
				dispatch(closeModal());
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

export default useCreateParent;
