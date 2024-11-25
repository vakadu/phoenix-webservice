import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { HttpService } from '@webservices/services';
import useGetClinicLogo from './get-clinic-logo';
import { ApiEndpoints } from '../primitives';

const uploadLogo = async (payload: FormData) => {
	try {
		const { data } = await HttpService.post(
			`${process.env.NEXT_PUBLIC_BASE_PATH}/${ApiEndpoints.UploadLogo}`,
			payload,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
					'cache-control': 'no-cache',
				},
			},
		);
		return data;
	} catch (err) {
		throw new Error('Network Error');
	}
};

export function useUploadClinicLogo(id?: string) {
	const { refetch } = useGetClinicLogo();

	return useMutation({
		mutationFn: uploadLogo,
		onSuccess: (data) => {
			if (data?.status === 'SUCCESS') {
				toast.success('Profile updated!');
				refetch();
			} else {
				toast.error('Unable to upload');
			}
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});
}

export default useUploadClinicLogo;
