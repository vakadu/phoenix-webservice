import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { ApiEndpoints } from '@webservices/primitives';
import { HttpService } from '@webservices/services';
import { useGetUserProfileUrl } from '../profile-image/profile-image';

const uploadClinicMemberProfile = async (payload: FormData, clinicMemberUserId: string) => {
	try {
		const { data } = await HttpService.patch(
			`${process.env.NEXT_PUBLIC_BASE_PATH}/${ApiEndpoints.UploadClinicMemberProfile}/${clinicMemberUserId}`,
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

export function useUpdateClinicMemberProfile({
	memberId,
	parentId,
}: {
	memberId: string;
	parentId: string;
}) {
	const { refetch } = useGetUserProfileUrl(parentId as string);
	return useMutation({
		mutationFn: (payload: FormData) => uploadClinicMemberProfile(payload, memberId),
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

export default useUpdateClinicMemberProfile;
