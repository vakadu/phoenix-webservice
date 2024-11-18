'use client';

import {
	useDownloadDocument,
	usePetCertificateVaccination,
	useUploadMedicalRecord,
} from '@webservices/api';
import { useRouterQuery } from '@webservices/hooks';
import { ImagePlaceholder, Loading } from '@webservices/ui';
import useCertificate from 'libs/ui/src/lib/health-certificate/hooks/use-certificate';
import { useState } from 'react';

export default function Print() {
	const { query, params, back } = useRouterQuery();
	const petId = query?.id as string;
	const heading = params.get('type');
	const { mutateAsync: downloadDocument, isPending: getMedicalRecordPdfPending } =
		useDownloadDocument();
	const { refetch } = useCertificate({ activeFilter: heading as string, petId });

	const { data, isPending } = usePetCertificateVaccination({ type: heading as string, petId });
	const { petAndParentDetail, clinicData } = data?.data?.certificateData || {};
	const parentDetails = petAndParentDetail?.parent;
	const { mutateAsync: uploadMedicalRecord, isPending: uploadMedicalRecordPending } =
		useUploadMedicalRecord({
			petId: petId as string,
		});
	const disableButton = getMedicalRecordPdfPending || uploadMedicalRecordPending;

	const handlePdf = async () => {
		if (disableButton) return;
		try {
			const htmltopdf = await require('html2pdf.js');
			var opt = {
				filename: 'certificate.pdf',
				image: { type: 'jpeg', quality: 1 },
				pagebreak: { avoid: 'tr', mode: 'css', before: '#page-break', after: '1cm' },
				html2canvas: { scale: 2, useCORS: true, letterRendering: true, dpi: 300 },
				jsPDF: {
					unit: 'px',
					format: 'a4',
					orientation: 'portrait',
					putTotalPages: true,
					hotfixes: ['px_scaling'],
				},
			};
			let element = document.querySelector('#pdf');
			htmltopdf()
				.from(element)
				.set(opt)
				.toPdf()
				.output('blob')
				.then(async (pdfBlob: any) => {
					const pdfWithType: any = new Blob([pdfBlob], { type: 'application/pdf' });
					const formData = new FormData();
					formData.append('file', pdfWithType, `${heading}.pdf`);
					formData.append('type', heading as string);
					formData.append('parentId', parentDetails?.parentId as string);
					formData.append('clinicId', clinicData?.userId as string);
					try {
						const response: any = (await uploadMedicalRecord(
							formData,
						)) as ICommonTypes.IApiResponse<IClinicTypes.IMedicalRecord>;
						const payload = { key: response?.data?.medicalRecord?.url as string };
						const resp = await downloadDocument(payload);
						back();
						refetch();
						window.open(resp?.data?.signedUrl, '_blank');
					} catch (err) {
						console.error('Error:', err);
					}
				});
		} catch (err) {
			console.error('Error generating PDF:', err);
		} finally {
		}
	};

	return (
		<div className="fixed right-50 bottom-50 cursor-pointer flex flex-col items-center gap-4">
			<button
				className={`relative bg-white rounded-full w-[52px] h-[52px] flex items-center justify-center shadow-lg border border-gray-300 ${disableButton && 'cursor-not-allowed opacity-50'}`}
				onClick={handlePdf}
				disabled={disableButton}
			>
				{
					disableButton ? (
						<div className="absolute inset-0 flex items-center justify-center">
							<Loading />
						</div>
					) : (
						<>
							<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
							<ImagePlaceholder src="/images/print.svg" containerClasses="w-[32px] h-[32px]" />
						</>
					)
				}
			</button>
			<span className="text-14 font-bold text-primary-1 text-center">
				{disableButton ? 'Preparing...' : 'Click to Print'}
			</span>
		</div>
	);

}
