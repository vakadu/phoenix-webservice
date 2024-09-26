import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { ApiEndpoints } from '@webservices/primitives';
import { HttpService } from '@webservices/services';

const uploadMedicalRecord = async (payload: FormData, petId: string) => {
	try {
		const { data } = await HttpService.patch(
			`${process.env.NEXT_PUBLIC_BASE_PATH}/${ApiEndpoints.UploadClinicMedicalRecords}/${petId}`,
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

export function useUploadMedicalRecord({ petId }: { petId: string }) {
	return useMutation({
		mutationFn: (payload: FormData) => uploadMedicalRecord(payload, petId),
		onSuccess: (data) => {
			if (data?.status === 'SUCCESS') {
				toast.success('Medical record updated!');
			} else {
				toast.error('Unable to upload');
			}
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});
}

export default useUploadMedicalRecord;
