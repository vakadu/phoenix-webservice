import { useState } from 'react';
import { format } from 'date-fns';

import { useRouterQuery } from '@webservices/hooks';
import { createFormDataForDocument, createFormDataForImage } from '@webservices/helpers';
import { useGetMedicalRecords, useUploadMedicalRecord } from '@webservices/api';
import { logEvent } from '@webservices/services';
import { USER_EVENTS } from '@webservices/primitives';

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
	const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
	const { refetch: refetchRecords } = useGetMedicalRecords({
		type: activeFilter,
		...(petId ? { petId } : { date: selectedDate }),
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

	const handleDate = (date: string) => {
		logEvent({ name: USER_EVENTS.DATE_CLICK, events: { date, type: 'medical-records' } });
		setSelectedDate(date);
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
		selectedDate,
		handleDate,
		refetchRecords,
	};
}
