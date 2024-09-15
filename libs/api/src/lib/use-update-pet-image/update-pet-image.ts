import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { ApiEndpoints } from '@webservices/primitives';
import { HttpService } from '@webservices/services';
import useGetPets from '../use-get-pets/get-pets';
import useGetPetProfileImage from '../use-get-pet-profile-image/get-pet-profile-image';

const updatePetImage = async (payload: FormData, petId: string) => {
	try {
		const { data } = await HttpService.patch(
			`${process.env.NEXT_PUBLIC_BASE_PATH}/${ApiEndpoints.UploadPetImage}/${petId}`,
			payload,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
					'cache-control': 'no-cache',
				},
			}
		);
		return data;
	} catch (err) {
		throw new Error('Network Error');
	}
};

export function useUpdatePetImage(petId: string) {
	const { refetch } = useGetPetProfileImage(petId as string);

	return useMutation({
		mutationFn: (payload: FormData) => updatePetImage(payload, petId),
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

export default useUpdatePetImage;
