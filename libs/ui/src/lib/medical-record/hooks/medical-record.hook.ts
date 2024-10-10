import { useState } from 'react';

import { useRouterQuery } from '@webservices/hooks';
import { createFormDataForDocument, createFormDataForImage } from '@webservices/helpers';
import { useGetMedicalRecords, useUploadMedicalRecord } from '@webservices/api';

export default function useMedicalRecord() {
	const [activeFilter, setActiveFilter] = useState('PRESCRIPTION');
	const [showSidebar, setShowSidebar] = useState(false);
	const { query, params } = useRouterQuery();
	const petId = query?.id as string;
	const parentId = params.get('parentId');
	const { mutateAsync: uploadMedicalRecord, isPending: uploadMedicalRecordPending } =
		useUploadMedicalRecord({
			petId: petId as string,
		});
	const { refetch: refetchRecords } = useGetMedicalRecords({
		type: activeFilter,
		...(petId ? { petId } : { date: '' }),
	});

	const handleUploadClick = async (
		uploadFile: ICommonTypes.IUploadType,
		setFiles: (files: []) => void
	) => {
		const { file } = uploadFile;
		let formData;
		if (file.type === 'application/pdf') {
			formData = createFormDataForDocument(file, 'file', {
				type: activeFilter,
				parentId: parentId,
				clinicId: '',
			});
		} else {
			formData = createFormDataForImage(file, 'file', {
				type: activeFilter,
				parentId: parentId,
				clinicId: '',
			});
		}
		const response = (await uploadMedicalRecord(
			formData
		)) as ICommonTypes.IApiResponse<IClinicTypes.IMedicalRecord>;
		if (response.status === 'SUCCESS') {
			setShowSidebar(false);
			setFiles([]);
			refetchRecords();
		}
	};

	return {
		activeFilter,
		setActiveFilter,
		petId,
		parentId,
		setShowSidebar,
		showSidebar,
		handleUploadClick,
		uploadMedicalRecordPending,
	};
}
