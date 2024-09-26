import { useGetMedicalRecords, useUploadMedicalRecord } from '@webservices/api';
import Upload from '../../atoms/upload';
import {
	createFormDataForDocument,
	createFormDataForImage,
	firstCharCapital,
} from '@webservices/helpers';
import { useRecordSidebar } from '../../../context/record-sidebar-context';

const UploadRecord = () => {
	const {
		activePetId,
		activeClinicId,
		handleSidebar,
		activeParentId,
		activeRecord,
		selectedDate,
	} = useRecordSidebar();
	console.log(activePetId);

	const btnTxt = `Upload ${firstCharCapital(activeRecord as string)}`;
	const { refetch } = useGetMedicalRecords({ type: activeRecord, date: selectedDate });
	const { mutateAsync: uploadMedicalRecord, isPending } = useUploadMedicalRecord({
		petId: activePetId,
	});

	const handleClick = async (uploadFile: ICommonTypes.IUploadType) => {
		const { file } = uploadFile;
		let formData;
		if (file.type === 'application/pdf') {
			formData = createFormDataForDocument(file, 'file', {
				type: activeRecord,
				parentId: activeParentId,
				clinicId: activeClinicId,
			});
		} else {
			formData = createFormDataForImage(file, 'file', {
				type: activeRecord,
				parentId: activeParentId,
				clinicId: activeClinicId,
			});
		}
		const response = (await uploadMedicalRecord(
			formData
		)) as ICommonTypes.IApiResponse<IClinicTypes.IMedicalRecord>;
		if (response.status === 'SUCCESS') {
			handleSidebar(false);
			refetch();
		}
	};

	return (
		<section className="h-full">
			<Upload isLoading={isPending} handleClick={handleClick} btnTxt={btnTxt} />
		</section>
	);
};

export default UploadRecord;
