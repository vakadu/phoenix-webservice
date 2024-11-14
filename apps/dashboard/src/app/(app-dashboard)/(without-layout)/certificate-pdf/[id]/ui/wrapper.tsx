'use client';

import { useMemo } from 'react';
import { PDFDownloadLink } from '@alexandernanberg/react-pdf-renderer';

import { usePetCertificateVaccination } from '@webservices/api';
import { useRouterQuery } from '@webservices/hooks';
import { Loading } from '@webservices/ui';
import CertificatePdf from './pdf';

export default function Wrapper() {
	const { query, params } = useRouterQuery();
	const petId = query?.id as string;
	const heading = params.get('type');
	const { data, isPending } = usePetCertificateVaccination({ type: 'VACCINATION', petId });
	const { clinicData, petAndParentDetail, vaccinations } = data?.data?.certificateData || {};

	const parentDetails = petAndParentDetail?.parent;
	const petDetails = petAndParentDetail;

	const renderTitle = useMemo(() => {
		switch (heading) {
			case 'ARV_CERTIFICATE':
				return 'ARV VACCINATION CERTIFICATE';
			default:
				return null;
		}
	}, []);

	if (isPending) {
		return (
			<div className="h-screen flex items-center justify-center">
				<Loading />
			</div>
		);
	}

	return (
		<div>
			<CertificatePdf clinicData={clinicData as IClinicTypes.IClinicData} />
			<PDFDownloadLink
				document={<CertificatePdf clinicData={clinicData as IClinicTypes.IClinicData} />}
				fileName="somename.pdf"
			>
				<div>donalod</div>
			</PDFDownloadLink>
		</div>
	);
}
