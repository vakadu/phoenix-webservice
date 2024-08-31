import { useMutation } from '@tanstack/react-query';
import { HttpService } from '@webservices/services';

const PAGE_LIMIT = 1000;
const PAGE = 0;

const petParents = async (value: string) => {
	const url = `${process.env.NEXT_PUBLIC_BASE_PATH}/clinic/parents?page=${PAGE}&limit=${PAGE_LIMIT}&searchTerm=${value}`;
	try {
		const { data } = await HttpService.get<
			ICommonTypes.IApiResponse<IClinicTypes.IPetParentsApiResponse>
		>(url);
		return data;
	} catch (err) {
		throw new Error('Network Error');
	}
};

export const useGetPetParentsMutation = () => {
	return useMutation({
		mutationFn: petParents,
	});
};
