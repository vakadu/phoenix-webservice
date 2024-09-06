import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { ApiEndpoints } from '@webservices/primitives';
import { HttpService } from '@webservices/services';
import useGetMedicalRecords from '../use-get-medical-records/use-get-medical-records';

interface IPayload {
	comment?: string;
	active?: boolean;
	type: string;
}

const updateMedicalRecord = async (payload: IPayload, id: string) => {
	try {
		const { data } = await HttpService.patch(
			`${process.env.NEXT_PUBLIC_BASE_PATH}/${ApiEndpoints.UpdateClinicMedicalRecords}/${id}`,
			payload
		);
		return data;
	} catch (err) {
		throw new Error('Network Error');
	}
};

export function useUpdateMedicalRecord({
	id,
	type,
	date,
	handleClose,
}: {
	id: string;
	type: string;
	date: string;
	handleClose?: () => void;
}) {
	const { refetch } = useGetMedicalRecords({ type, date });
	return useMutation({
		mutationFn: (payload: IPayload) => updateMedicalRecord(payload, id),
		onSuccess: (data) => {
			if (data?.status === 'SUCCESS') {
				refetch();
				toast.success('Updated Successfully!');
				if (handleClose) {
					handleClose();
				}
			} else {
				toast.error('Something went wrong. Please try again');
			}
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});
}

export default useUpdateMedicalRecord;
