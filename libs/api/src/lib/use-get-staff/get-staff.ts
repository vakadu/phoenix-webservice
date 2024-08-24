import { QueryFunctionContext, useQuery } from '@tanstack/react-query';

import { ApiEndpoints } from '@webservices/primitives';
import { HttpService } from '@webservices/services';

const staffList = async ({ queryKey }: QueryFunctionContext<[string]>) => {
	const [_key] = queryKey;
	const url = `${process.env.NEXT_PUBLIC_BASE_PATH}/${_key}?`;
	const { data } = await HttpService.get<
		ICommonTypes.IApiResponse<IClinicTypes.IClinicStaffResponse>
	>(url);
	return data;
};

export function useGetStaff() {
	return useQuery({
		queryKey: [ApiEndpoints.StaffList],
		queryFn: staffList,
	});
}

export default useGetStaff;
