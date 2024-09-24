import { useDispatch } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { HttpService } from '@webservices/services';
import useGetPets from '../use-get-pets/get-pets';
import { closeModal } from '@webservices/slices';

interface IPayload {
	name: string;
	breed: string;
	gender: string;
	type: string;
	dob: string;
	parentId?: string;
}

const createPet = async (payload: IPayload) => {
	try {
		const { data } = await HttpService.post(
			`${process.env.NEXT_PUBLIC_BASE_PATH}/pet`,
			payload
		);
		return data;
	} catch (err) {
		throw new Error('Network Error');
	}
};

export function useCreatePet({
	parentId,
	refetchParents,
}: {
	parentId: string;
	refetchParents: () => void;
}) {
	const dispatch = useDispatch();
	const { refetch } = useGetPets(parentId);

	return useMutation({
		mutationFn: createPet,
		onSuccess: (data) => {
			if (data?.status === 'SUCCESS') {
				dispatch(closeModal());
				refetch();
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

export default useCreatePet;
