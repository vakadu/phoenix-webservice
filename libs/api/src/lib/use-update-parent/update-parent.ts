import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { ApiEndpoints } from '@webservices/primitives';
import { HttpService } from '@webservices/services';
import useGetParentById from '../use-get-parent-by-id/get-parent-by-id';

interface IPayload {
	name?: string;
	comment?: string;
	active: boolean;
}

const updateParent = async (payload: IPayload, parentId: string) => {
	try {
		const { data } = await HttpService.patch(
			`${process.env.NEXT_PUBLIC_BASE_PATH}/${ApiEndpoints.UpdateParent}/${parentId}`,
			payload
		);
		return data;
	} catch (err) {
		throw new Error('Network Error');
	}
};

export function useUpdateParent(
	memberId: string,
	parentId: string,
	handleClose: () => void,
	refetchParents: () => void
) {
	const { refetch } = useGetParentById(parentId);

	return useMutation({
		mutationFn: (payload: IPayload) => updateParent(payload, memberId),
		onSuccess: (data) => {
			if (data?.status === 'SUCCESS') {
				refetch();
				refetchParents();
				handleClose();
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

export default useUpdateParent;
