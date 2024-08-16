import { QueryFunctionContext, useQuery } from '@tanstack/react-query';

import { ApiEndpoints } from '@webservices/primitives';
import { HttpService } from '@webservices/services';

const getClinicDoctors = async ({ queryKey }: QueryFunctionContext<[string]>) => {
	const [_key] = queryKey;
	const url = `${process.env.NEXT_PUBLIC_BASE_PATH}/${_key}?`;
	const { data } = await HttpService.get<
		ICommonTypes.IApiResponse<IClinicTypes.IClinicDoctorResponse>
	>(url);
	return data;
};

export function useGetDoctors() {
	return useQuery({
		queryKey: [ApiEndpoints.DoctorsClinic],
		queryFn: getClinicDoctors,
	});
}

export default useGetDoctors;
