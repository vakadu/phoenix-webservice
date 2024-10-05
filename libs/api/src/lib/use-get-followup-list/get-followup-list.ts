import { QueryFunctionContext, useQuery } from '@tanstack/react-query';

import { ApiEndpoints } from '@webservices/primitives';
import { HttpService } from '@webservices/services';

const getFollowupList = async ({ queryKey }: QueryFunctionContext<[string]>) => {
	const [_key] = queryKey;
	const { data } = await HttpService.get<
		ICommonTypes.IApiResponse<{ followup: { label: string; value: string }[] }>
	>(_key);
	return data;
};

export function useGetFollowupList() {
	return useQuery({
		queryKey: [ApiEndpoints.FollowupList],
		queryFn: getFollowupList,
	});
}

export default useGetFollowupList;
