import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { ApiEndpoints } from '@webservices/primitives';
import { HttpService } from '@webservices/services';
import useGetVaccinationRecords from '../use-get-vaccination-records/get-vaccination-records';

interface IPayload {
	parentMobile: number;
	petName: string;
	clinicName: string;
	nextVaccinationDate: string;
	vaccineName: string;
	id: string;
}

const vaccinationRemainder = async (payload: IPayload) => {
	const { id, ...rest } = payload;
	try {
		const { data } = await HttpService.patch(
			`${process.env.NEXT_PUBLIC_BASE_PATH}/${ApiEndpoints.ClinicVaccinationRemainder}/${id}`,
			rest
		);
		return data;
	} catch (err) {
		throw new Error('Network Error');
	}
};

export function useSendVaccinationRemainder({ type, date }: { type: string; date: string }) {
	const { refetch } = useGetVaccinationRecords({
		type,
		date,
	});
	return useMutation({
		mutationFn: vaccinationRemainder,
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

export default useSendVaccinationRemainder;
