import { QueryFunctionContext, useQuery } from '@tanstack/react-query';

import { ApiEndpoints } from '@webservices/primitives';
import { HttpService } from '@webservices/services';

const getDropdownList = async ({ queryKey }: QueryFunctionContext<[string, string]>) => {
	const [_key, _params] = queryKey;
	const { data } = await HttpService.get<
		ICommonTypes.IApiResponse<{ dropdown: { label: string; value: string }[] }>
	>(`${process.env.NEXT_PUBLIC_BASE_PATH}/${_key}/${_params}`);
	return data;
};

export function useGetDropdownList(key: string) {
	return useQuery({
		queryKey: [ApiEndpoints.DropdownList, key],
		queryFn: getDropdownList,
	});
}

export default useGetDropdownList;
