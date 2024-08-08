import { QueryFunctionContext, useQuery } from '@tanstack/react-query';

import { ApiEndpoints } from '@webservices/primitives';
import { HttpService } from '@webservices/services';

const getUser = async ({ queryKey }: QueryFunctionContext<[string, string]>) => {
	const [_key, _params] = queryKey;
	const { data } = await HttpService.get<ICommonTypes.IApiResponse<IUserTypes.IGetUserResponse>>(
		`${process.env.NEXT_PUBLIC_BASE_PATH}/${_key}/${_params}`
	);
	return data;
};

export function useGetUser(id: string) {
	return useQuery({
		queryKey: [ApiEndpoints.UserId, id],
		queryFn: getUser,
	});
}
