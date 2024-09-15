import { QueryFunctionContext, useQuery } from '@tanstack/react-query';
import { ApiEndpoints } from '@webservices/primitives';

import { HttpService } from '@webservices/services';

const getPetById = async ({ queryKey }: QueryFunctionContext<[string, string]>) => {
	const [_key, _params] = queryKey;
	const { data } = await HttpService.get<
		ICommonTypes.IApiResponse<ICommonTypes.IGetPetByIdResponse>
	>(`${process.env.NEXT_PUBLIC_BASE_PATH}/${_key}/${_params}`);
	return data;
};

export function useGetPetById(petId: string) {
	return useQuery({
		queryKey: [ApiEndpoints.PetId, petId],
		queryFn: getPetById,
		enabled: !!petId,
	});
}

export default useGetPetById;
