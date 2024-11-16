'use client';

import { useDownloadDocument, usePetCertificateVaccination, useUploadMedicalRecord } from '@webservices/api';
import { useRouterQuery } from '@webservices/hooks';
import { ImagePlaceholder } from '@webservices/ui';

export default function Print() {
	const { query, params, back } = useRouterQuery();
	const petId = query?.id as string;
	const heading = params.get('type');
	const { mutateAsync: downloadDocument } = useDownloadDocument();

	const { data, isPending } = usePetCertificateVaccination({ type: heading as string, petId });
	const { petAndParentDetail, clinicData } = data?.data?.certificateData || {};
	const parentDetails = petAndParentDetail?.parent;

	const { mutateAsync: uploadMedicalRecord, isPending: uploadMedicalRecordPending } =
		useUploadMedicalRecord({
			petId: petId as string,
		});

	const handlePdf = async () => {
		const htmltopdf = await require('html2pdf.js');
		var opt = {
			filename: 'certificate.pdf',
			image: { type: 'jpeg', quality: 1 },
			pagebreak: { avoid: 'tr', mode: 'css', before: '#page-break', after: '1cm' },
			html2canvas: { scale: 2, useCORS: true, letterRendering: true, dpi: 300 },
			jsPDF: { unit: 'px', format: 'a4', orientation: 'portrait', putTotalPages: true, hotfixes: ["px_scaling"] },
		};
		let element = document.querySelector('#pdf');
		htmltopdf()
			.from(element)
			.set(opt)
			.toPdf()
			.output('blob')
			.then(async (pdfBlob: any) => {
				// Ensure the Blob type is explicitly set to 'application/pdf'
				const pdfWithType: any = new Blob([pdfBlob], { type: 'application/pdf' });
				const formData = new FormData();
				formData.append('file', pdfWithType, `${heading}.pdf`); // Ensure .pdf extension
				formData.append('type', heading as string);
				formData.append('parentId', parentDetails?.parentId as string);
				formData.append('clinicId', clinicData?.userId as string);
				try {
					const response: any = (await uploadMedicalRecord(
						formData,
					)) as ICommonTypes.IApiResponse<IClinicTypes.IMedicalRecord>;
					const payload = { key: response?.data?.medicalRecord?.url as string };
					const resp = await downloadDocument(payload);
					back()
					// Open the PDF in a new tab
					window.open(resp?.data?.signedUrl, '_blank');
				} catch (err) { }
			});
	};

	return (
		<div className="fixed right-50 bottom-50 cursor-pointer flex flex-col items-center">
			<div
				className="relative bg-white rounded-full w-[52px] h-[52px] flex items-center justify-center"
				onClick={handlePdf}
			>
				<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
				<ImagePlaceholder src="/images/print.svg" containerClasses="w-[42px] h-[42px]" />
			</div>
			<div className="mt-6 font-bold text-14 text-primary-1">Click For Print</div>
		</div>
	);
}
