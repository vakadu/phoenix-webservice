import { useMutation } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

import { HttpService } from '@webservices/services';
import { useGetUser } from '../user-details/user-details';
import { PemilyRootState } from '@webservices/slices';

interface IPayload {
	line1: string;
	line2: string;
	pincode: string;
	district: string;
	state: string;
	type: string;
	isPrimary?: boolean;
}

const createAddress = async (payload: IPayload) => {
	try {
		const { data } = await HttpService.post(
			`${process.env.NEXT_PUBLIC_BASE_PATH}/address`,
			payload
		);
		return data;
	} catch (err) {
		throw new Error('Network Error');
	}
};

export function useCreateAddress() {
	const authState = useSelector((state: PemilyRootState) => state.auth);
	const { refetch } = useGetUser(authState.userId as string);

	return useMutation({
		mutationFn: createAddress,
		onSuccess: (data) => {
			if (data?.status === 'SUCCESS') {
				refetch();
				toast.success('Address created successfully!');
			} else {
				toast.error('Something went wrong. Please try again');
			}
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});
}

export default useCreateAddress;
