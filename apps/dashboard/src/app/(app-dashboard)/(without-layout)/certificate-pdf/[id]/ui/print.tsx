'use client';

import { usePetCertificateVaccination, useUploadMedicalRecord } from '@webservices/api';
import { createFormDataForDocument } from '@webservices/helpers';
import { useRouterQuery } from '@webservices/hooks';
import { ImagePlaceholder } from '@webservices/ui';

export default function Print() {
	const { query, params } = useRouterQuery();
	const petId = query?.id as string;
	const heading = params.get('type');

	const { data, isPending } = usePetCertificateVaccination({ type: heading as string, petId });
	const { petAndParentDetail } = data?.data?.certificateData || {};
	const parentDetails = petAndParentDetail?.parent;

	const { mutateAsync: uploadMedicalRecord, isPending: uploadMedicalRecordPending } =
		useUploadMedicalRecord({
			petId: petId as string,
		});

	const handlePdf = async () => {
		const htmltopdf = await require('html2pdf.js');
		var opt = {
			filename: 'myfile.pdf',
			// html2canvas: { scale: 2, letterRendering: true },
			// jsPDF: { unit: 'pt', format: 'legal', orientation: 'portrait' },
			// pagebreak: { before: '.page-break', mode: 'css' },

			image: { type: 'jpeg', quality: 1 },
			pagebreak: { avoid: 'tr', mode: 'css', before: '#page-break', after: '1cm' },
			html2canvas: { scale: 2, useCORS: true, letterRendering: true },
			jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait', putTotalPages: true },
		};
		let element = document.querySelector('#pdf');
		htmltopdf()
			.set(opt)
			.from(element)
			.toPdf()
			.output('blob')
			.then(async (pdfBlob: any) => {
				let formData;
				formData = createFormDataForDocument(pdfBlob, 'file', {
					type: heading,
					parentId: parentDetails?.parentId,
					clinicId: '',
				});
				htmltopdf().set(opt).from(element).save();
				try {
					const response = (await uploadMedicalRecord(
						formData,
					)) as ICommonTypes.IApiResponse<IClinicTypes.IMedicalRecord>;
				} catch (err) {}
			});
	};

	return (
		<div className="fixed right-24 bottom-24 cursor-pointer">
			<div
				className="relative bg-white rounded-full w-[52px] h-[52px] flex items-center justify-center"
				onClick={handlePdf}
			>
				<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
				<ImagePlaceholder src="/images/print.svg" containerClasses="w-[42px] h-[42px]" />
			</div>
		</div>
	);
}
