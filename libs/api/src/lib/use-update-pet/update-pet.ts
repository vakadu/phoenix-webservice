import { useDispatch } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { HttpService } from '@webservices/services';
import useGetPetById from '../use-get-pet-by-id/get-pet-by-id';
import { closeModal } from '@webservices/slices';

interface IPayload {
	name: string;
	breed: string;
	gender: string;
	type: string;
	dob: string;
}

const updatePet = async (payload: IPayload, petId: string) => {
	try {
		const { data } = await HttpService.patch(
			`${process.env.NEXT_PUBLIC_BASE_PATH}/pet/${petId}`,
			payload
		);
		return data;
	} catch (err) {
		throw new Error('Network Error');
	}
};

export function useUpdatePet(petId: string) {
	const { refetch } = useGetPetById(petId as string);
	const dispatch = useDispatch();
	return useMutation({
		mutationFn: (payload: IPayload) => updatePet(payload, petId),
		onSuccess: (data) => {
			if (data?.status === 'SUCCESS') {
				refetch();
				dispatch(closeModal());
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

export default useUpdatePet;
