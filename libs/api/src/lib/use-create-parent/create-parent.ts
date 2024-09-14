import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { ApiEndpoints } from '@webservices/primitives';
import { HttpService } from '@webservices/services';
import { useGetPetParentsMutation } from '../use-pet-parents/pet-parents';

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

export function useCreateParent(handleClose: () => void, refetchParents: () => void) {
	return useMutation({
		mutationFn: createParent,
		onSuccess: (data) => {
			if (data?.status === 'SUCCESS') {
				handleClose();
				refetchParents();
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
