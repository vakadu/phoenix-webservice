import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { ApiEndpoints } from '@webservices/primitives';
import { HttpService } from '@webservices/services';
import useGetMedicalRecords from '../use-get-medical-records/use-get-medical-records';

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

export function useUploadMedicalRecord({
	petId,
	activeRecord,
	handleSidebar,
	selectedDate,
}: {
	petId: string;
	activeRecord: string;
	handleSidebar: (a: boolean) => void;
	selectedDate?: string;
}) {
	const { refetch } = useGetMedicalRecords({ type: activeRecord, date: selectedDate, petId });
	return useMutation({
		mutationFn: (payload: FormData) => uploadMedicalRecord(payload, petId),
		onSuccess: (data) => {
			if (data?.status === 'SUCCESS') {
				refetch();
				handleSidebar(false);
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
