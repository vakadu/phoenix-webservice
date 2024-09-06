import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { ApiEndpoints } from '@webservices/primitives';
import { HttpService } from '@webservices/services';

const downloadDocument = async (payload: { key: string }) => {
	try {
		const { data } = await HttpService.post(
			`${process.env.NEXT_PUBLIC_BASE_PATH}/${ApiEndpoints.DownloadDocument}`,
			payload
		);
		return data;
	} catch (err) {
		throw new Error('Network Error');
	}
};

export function useDownloadDocument() {
	return useMutation({
		mutationFn: downloadDocument,
		onSuccess: (data) => {
			if (data?.status !== 'SUCCESS') {
				toast.error('Something went wrong. Please try again');
			}
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});
}

export default useDownloadDocument;
