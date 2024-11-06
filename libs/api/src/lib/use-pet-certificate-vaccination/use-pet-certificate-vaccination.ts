import { QueryFunctionContext, useQuery } from '@tanstack/react-query';

import { ApiEndpoints } from '@webservices/primitives';
import { HttpService } from '@webservices/services';

const getPetCertificateVaccination = async ({
	queryKey,
}: QueryFunctionContext<[string, string, string | undefined]>) => {
	const [_key, type, petId] = queryKey;
	let url = `${process.env.NEXT_PUBLIC_BASE_PATH}/${_key}/${petId}/${type}`;
	const { data } =
		await HttpService.get<ICommonTypes.IApiResponse<IClinicTypes.ICertificateApiResponse>>(url);
	return data;
};

export function usePetCertificateVaccination({ type, petId }: { type: string; petId: string }) {
	return useQuery({
		queryKey: [ApiEndpoints.VaccinationCertificate, type, petId],
		queryFn: getPetCertificateVaccination,
	});
}

export default usePetCertificateVaccination;
