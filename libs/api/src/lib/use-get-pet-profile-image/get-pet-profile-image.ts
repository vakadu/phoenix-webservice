import { useQuery, QueryFunctionContext } from '@tanstack/react-query';

import { ApiEndpoints } from '@webservices/primitives';
import { HttpService } from '@webservices/services';

const getProfileUrl = async ({ queryKey }: QueryFunctionContext<[string, string]>) => {
	const [_key, _params] = queryKey;
	const { data } = await HttpService.get<ICommonTypes.IApiResponse<{ profileUrl: string }>>(
		`${process.env.NEXT_PUBLIC_BASE_PATH}/${_key}/${_params}`
	);
	return data;
};

export function useGetPetProfileImage(id: string) {
	return useQuery({
		queryKey: [ApiEndpoints.PetProfileUrl, id],
		queryFn: getProfileUrl,
	});
}

export default useGetPetProfileImage;
