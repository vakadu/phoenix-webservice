import { useMutation } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

import { ApiEndpoints } from '@webservices/primitives';
import { HttpService } from '@webservices/services';
import useGetDoctors from '../use-get-doctors/get-doctors';

interface IPayload {
	name: string;
	degree: string;
	experience: string;
	speciality: string;
}

const createDoctor = async (payload: IPayload) => {
	try {
		const { data } = await HttpService.post(
			`${process.env.NEXT_PUBLIC_BASE_PATH}/${ApiEndpoints.AddClinicDoctor}`,
			payload
		);
		return data;
	} catch (err) {
		throw new Error('Network Error');
	}
};

export function useCreateDoctor(handleClose: () => void) {
	const { refetch } = useGetDoctors();

	return useMutation({
		mutationFn: createDoctor,
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

export default useCreateDoctor;
