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
}: {
	parentId: string;
	petId: string;
	btnTxt: string;
	activeClinicId: string;
	activeRecord: string;
	handleSidebar: (s: boolean) => void;
}) => {
	const { mutate: uploadMedicalRecord } = useUploadMedicalRecord({
		petId,
		activeRecord,
		handleSidebar,
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
			<Upload handleClick={handleClick} btnTxt={btnTxt} />
		</section>
	);
};

export default UploadRecord;
