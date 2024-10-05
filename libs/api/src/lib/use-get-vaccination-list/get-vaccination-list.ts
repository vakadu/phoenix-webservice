import { QueryFunctionContext, useQuery } from '@tanstack/react-query';

import { ApiEndpoints } from '@webservices/primitives';
import { HttpService } from '@webservices/services';

const getVaccinationList = async ({ queryKey }: QueryFunctionContext<[string]>) => {
	const [_key] = queryKey;
	const { data } = await HttpService.get<
		ICommonTypes.IApiResponse<{ vaccination: { label: string; value: string }[] }>
	>(_key);
	return data;
};

export function useGetVaccinationList() {
	return useQuery({
		queryKey: [ApiEndpoints.VaccinationList],
		queryFn: getVaccinationList,
	});
}

export default useGetVaccinationList;
