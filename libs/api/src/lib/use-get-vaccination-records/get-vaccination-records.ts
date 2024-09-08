import { QueryFunctionContext, useQuery } from '@tanstack/react-query';

import { ApiEndpoints } from '@webservices/primitives';
import { HttpService } from '@webservices/services';

const getVaccinationRecords = async ({
	queryKey,
}: QueryFunctionContext<[string, string, string | undefined, string | undefined]>) => {
	const [_key, type, petId, date] = queryKey;
	let url = `${process.env.NEXT_PUBLIC_BASE_PATH}/${_key}?`;
	if (type !== '') {
		url += `searchType=${type}`;
	}
	if (petId) {
		url += `&petId=${petId}`;
	}
	if (date) {
		url += `&vaccinationDate=${date}`;
	}
	const { data } = await HttpService.get<
		ICommonTypes.IApiResponse<IClinicTypes.IClinicVaccinationRecordsApiResponse>
	>(url);
	return data;
};

export function useGetVaccinationRecords({
	type,
	petId,
	date,
}: {
	type: string;
	petId?: string;
	date?: string;
}) {
	return useQuery({
		queryKey: [ApiEndpoints.ClinicVaccinationRecords, type, petId, date],
		queryFn: getVaccinationRecords,
	});
}

export default useGetVaccinationRecords;
