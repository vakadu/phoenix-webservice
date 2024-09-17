import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { ApiEndpoints } from '@webservices/primitives';
import { HttpService } from '@webservices/services';
import useGetVaccinationRecords from '../use-get-vaccination-records/get-vaccination-records';

interface IPayload {
	petId: string;
	parentId: string;
	vaccineName: string;
	vaccinationDates: string[];
}

const createVaccination = async (payload: IPayload) => {
	try {
		const { data } = await HttpService.post(
			`${process.env.NEXT_PUBLIC_BASE_PATH}/${ApiEndpoints.ClinicVaccination}`,
			payload
		);
		return data;
	} catch (err) {
		throw new Error('Network Error');
	}
};

export function useCreateVaccinationRecords({
	handleSidebar,
	type,
	date,
	petId,
}: {
	handleSidebar: (s: boolean) => void;
	type: string;
	date: string;
	petId?: string;
}) {
	const { refetch } = useGetVaccinationRecords({
		type,
		date,
		petId,
	});
	return useMutation({
		mutationFn: createVaccination,
		onSuccess: (data) => {
			if (data?.status === 'SUCCESS') {
				refetch();
				handleSidebar(false);
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

export default useCreateVaccinationRecords;
