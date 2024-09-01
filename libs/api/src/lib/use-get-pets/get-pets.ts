import { QueryFunctionContext, useQuery } from '@tanstack/react-query';

import { ApiEndpoints } from '@webservices/primitives';
import { HttpService } from '@webservices/services';

const getPets = async ({ queryKey }: QueryFunctionContext<[string, string]>) => {
	const [_key, _params] = queryKey;
	const url = `${process.env.NEXT_PUBLIC_BASE_PATH}/${_key}/${_params}`;
	const { data } = await HttpService.get<
		ICommonTypes.IApiResponse<ICommonTypes.IGetPetsResponse>
	>(url);
	return data;
};

export function useGetPets(id: string) {
	return useQuery({
		queryKey: [ApiEndpoints.GetPet, id],
		queryFn: getPets,
		enabled: !!id,
	});
}

export default useGetPets;
