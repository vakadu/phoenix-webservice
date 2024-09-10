import { useMutation } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

import { ApiEndpoints } from '@webservices/primitives';
import { HttpService } from '@webservices/services';
import { PemilyRootState } from '@webservices/slices';
import { useGetUserProfileUrl } from '../profile-image/profile-image';

const uploadProfile = async (payload: FormData) => {
	try {
		const { data } = await HttpService.post(
			`${process.env.NEXT_PUBLIC_BASE_PATH}/${ApiEndpoints.UploadProfile}`,
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

export function useUploadUserProfile(id?: string) {
	const authState = useSelector((state: PemilyRootState) => state.auth);
	const { refetch } = useGetUserProfileUrl(id ? id : (authState.userId as string));

	return useMutation({
		mutationFn: uploadProfile,
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

export default useUploadUserProfile;
