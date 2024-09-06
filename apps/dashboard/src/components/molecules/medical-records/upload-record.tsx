import { useUploadMedicalRecord } from '@webservices/api';
import Upload from '../../atoms/upload';
import { createFormDataForDocument, createFormDataForImage } from '@webservices/helpers';

const UploadRecord = ({
	parentId,
	petId,
	btnTxt,
	activeClinicId,
	activeRecord,
	handleSidebar,
	selectedDate,
}: {
	parentId: string;
	petId: string;
	btnTxt: string;
	activeClinicId: string;
	activeRecord: string;
	handleSidebar: (s: boolean) => void;
	selectedDate: string;
}) => {
	const { mutate: uploadMedicalRecord, isPending } = useUploadMedicalRecord({
		petId,
		activeRecord,
		handleSidebar,
		selectedDate,
	});

	const handleClick = (uploadFile: ICommonTypes.IUploadType) => {
		const { file } = uploadFile;
		let formData;
		if (file.type === 'application/pdf') {
			formData = createFormDataForDocument(file, 'file', {
				type: activeRecord,
				parentId: parentId,
				clinicId: activeClinicId,
			});
		} else {
			formData = createFormDataForImage(file, 'file', {
				type: activeRecord,
				parentId: parentId,
				clinicId: activeClinicId,
			});
		}
		uploadMedicalRecord(formData);
	};

	return (
		<section className="h-full">
			<Upload isLoading={isPending} handleClick={handleClick} btnTxt={btnTxt} />
		</section>
	);
};

export default UploadRecord;
