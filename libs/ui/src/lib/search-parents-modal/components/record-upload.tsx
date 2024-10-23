import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch } from 'react-redux';

import { DeleteIcon, ImagePlaceholderIcon, PdfIcon } from '@webservices/icons';
import ImagePlaceholder from '../../image-placeholder/image-placeholder';
import ButtonWrapper from '../../button-wrapper/button-wrapper';
import Button from '../../button/button';
import {
	createFormDataForDocument,
	createFormDataForImage,
	firstCharCapital,
} from '@webservices/helpers';
import { useUploadMedicalRecord } from '@webservices/api';
import { closeModal } from '@webservices/slices';

export default function RecordUpload({
	filter,
	parentId,
	petId,
	refetch,
	activeClinic,
}: {
	filter: string;
	parentId: string;
	petId: string;
	refetch: () => void;
	activeClinic: string;
}) {
	const dispatch = useDispatch();
	const [files, setFiles] = useState<ICommonTypes.IUploadType[]>([]);
	const { mutateAsync: uploadMedicalRecord, isPending } = useUploadMedicalRecord({
		petId: petId as string,
	});

	const { getRootProps, getInputProps } = useDropzone({
		accept: {
			'image/*': [],
			'application/pdf': [],
		},
		onDrop: (acceptedFiles) => {
			const mappedFiles = acceptedFiles.map((acceptedFile, index) => {
				return {
					file: acceptedFile,
					preview:
						acceptedFile.type === 'application/pdf'
							? ''
							: URL.createObjectURL(acceptedFile),
					index: index.toString(),
				};
			});
			setFiles(mappedFiles);
		},
	});

	const handleUpload = async () => {
		const { file } = files[0];
		let formData;
		if (file.type === 'application/pdf') {
			formData = createFormDataForDocument(file, 'file', {
				type: filter,
				parentId: parentId,
				clinicId: activeClinic,
			});
		} else {
			formData = createFormDataForImage(file, 'file', {
				type: filter,
				parentId: parentId,
				clinicId: activeClinic,
			});
		}
		const response = (await uploadMedicalRecord(
			formData
		)) as ICommonTypes.IApiResponse<IClinicTypes.IMedicalRecord>;
		if (response.status === 'SUCCESS') {
			dispatch(closeModal());
			setFiles([]);
			refetch();
		}
	};

	return (
		<div className="mt-16 bg-white rounded-8">
			<div className="p-16">
				<h3 className="text-22 font-semibold leading-[24px]">
					Upload a photo of your Prescription
				</h3>
				<p className="text-18 mt-12">You can upload JPEG or PNG up to 2MB</p>
				<div className="flex justify-between items-end">
					{files.length === 0 && (
						<div
							{...getRootProps({
								className:
									'dropzone cursor-pointer h-[120px] border-[3px] border-[#12D18E] flex items-center justify-center flex-col rounded-[20px] mt-24 w-[220px]',
							})}
						>
							<input className="hidden border-grey-border1" {...getInputProps()} />
							<ImagePlaceholderIcon />
							<p className="pt-12 text-grey-3 text-12 text-center">
								Drop files here or click to upload.
							</p>
						</div>
					)}
					{files.length > 0 && (
						<div className="relative h-[120px] w-[220px]  mt-24">
							{files.map((file) => {
								return (
									<div
										key={file.index}
										className="h-[120px] w-[220px] border-[3px] border-[#12D18E] flex items-center justify-center flex-col rounded-[20px]"
									>
										{file.preview !== '' ? (
											<ImagePlaceholder
												src={file.preview}
												alt=""
												className="h-[92px] relative w-full"
												imageClasses="rounded-[20px] object-contain"
												onLoad={() => {
													URL.revokeObjectURL(file.preview);
												}}
											/>
										) : (
											<PdfIcon width={92} height={92} />
										)}
									</div>
								);
							})}
							{files.length > 0 && (
								<ButtonWrapper
									onClick={() => setFiles([])}
									className="!absolute top-3 right-3 w-32 h-32  flex items-center justify-center border border-grey-2 bg-white rounded-tr-[20px]"
								>
									<DeleteIcon className="text-red-1" />
								</ButtonWrapper>
							)}
						</div>
					)}
					<Button
						onClick={handleUpload}
						disabled={files.length === 0 || isPending}
						isLoading={isPending}
					>
						<span className="font-black tracking-[-0.41px]">
							Upload {firstCharCapital(filter)}
						</span>
					</Button>
				</div>
			</div>
		</div>
	);
}
