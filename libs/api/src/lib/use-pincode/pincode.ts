import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { ApiEndpoints } from '@webservices/primitives';
import { HttpService } from '@webservices/services';

export async function getPincode(pincode: string) {
	try {
		const { data } = await HttpService.get<
			ICommonTypes.IApiResponse<IUserTypes.IAddressResponse>
		>(`${process.env.NEXT_PUBLIC_BASE_PATH}/${ApiEndpoints.Pincode}/${pincode}`);
		return data;
	} catch (err) {
		throw new Error('Network Error');
	}
}

export const usePincode = () => {
	return useMutation({
		mutationFn: (pincode: string) => getPincode(pincode),
		onSuccess: (data) => {
			if (data?.status !== 'SUCCESS') {
				toast.error('Unable to fetch pincode.');
			}
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});
};
