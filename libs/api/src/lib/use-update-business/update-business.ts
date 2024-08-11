import { useMutation } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

import { HttpService } from '@webservices/services';
import { useGetUser } from '../user-details/user-details';
import { PemilyRootState } from '@webservices/slices';

interface IPayload {
	ownerName: string;
	pan: string;
	gstNo: string;
	businessContact: number;
}

const updateBusiness = async (payload: IPayload) => {
	try {
		const { data } = await HttpService.patch(
			`${process.env.NEXT_PUBLIC_BASE_PATH}/user/businessDetail`,
			payload
		);
		return data;
	} catch (err) {
		throw new Error('Network Error');
	}
};

export function useUpdateBusiness() {
	const authState = useSelector((state: PemilyRootState) => state.auth);
	const { refetch } = useGetUser(authState.userId as string);

	return useMutation({
		mutationFn: updateBusiness,
		onSuccess: (data) => {
			if (data?.status === 'SUCCESS') {
				refetch();
				toast.success('Business details updated successfully!');
			} else {
				toast.error('Something went wrong. Please try again');
			}
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});
}

export default useUpdateBusiness;
