'use client';

import { memo, useState } from 'react';
import { format } from 'date-fns';
import { useDispatch } from 'react-redux';

import { DeleteIcon, PdfIcon } from '@webservices/icons';
import ButtonWrapper from '../../button-wrapper/button-wrapper';
import { closeModal, openModal } from '@webservices/slices';
import { ModalTypes, USER_EVENTS } from '@webservices/primitives';
import { useUpdateMedicalRecord } from '@webservices/api';
import { logEvent } from '@webservices/services';
import useDocumentDownlaod from '../hooks/use-download-document';
import { certificateData } from '@webservices/constants';
import { toZonedTime } from 'date-fns-tz';

interface IRecordItem {
	record: IClinicTypes.IMedicalRecord;
	refetch: () => void;
	activeFilter: string;
}

function RecordItem({ record, refetch, activeFilter }: IRecordItem) {
	const dispatch = useDispatch();
	const { url } = useDocumentDownlaod({ url: record.url });
	const { mutate: updateMedicalRecord } = useUpdateMedicalRecord({
		id: record?._id,
		refetch,
		handleClose: closeModal,
	});
	const [showModal, setShowModal] = useState(false);

	const onDelete = () => {
		const commentData = {
			type: activeFilter,
			active: false,
		};
		logEvent({
			name: USER_EVENTS.MEDICAL_RECORD_DELETE,
			events: { filter: activeFilter, url, recordId: record._id, type: 'medical-records' },
		});
		updateMedicalRecord(commentData);
	};

	const handleDelete = () => {
		logEvent({
			name: USER_EVENTS.MEDICAL_RECORD_DELETE_MODAL,
			events: { filter: activeFilter, url, recordId: record._id, type: 'medical-records' },
		});
		dispatch(
			openModal({
				isOpen: true,
				view: ModalTypes.CONFIRMATION_MODAL,
				confirmationTitle: 'Delete Record',
				confirmationHeading: 'Are you sure you want to delete the record?',
				onHandleConfirm: onDelete,
				center: true,
			}),
		);
	};

	const handleDownload = () => {
		logEvent({
			name: USER_EVENTS.MEDICAL_RECORD_DOWNLAOD,
			events: { filter: activeFilter, url, recordId: record._id, type: 'medical-records' },
		});
	};

	const handleModalClose = () => {
		setShowModal(false);
	};

	const handleModalOpen = () => {
		setShowModal(true);
	};

	const getCertificateLabel = (value: string) => {
		const certificate = certificateData.find((cert) => cert.value === value);
		return certificate ? certificate.label : '';
	};


	return (
		<div className="grid grid-cols-2 gap-12 bg-white mb-12 rounded-8 shadow-base px-16 py-12">
			<div className="col-span-1 w-[500px]">
				<div className="flex gap-12 ">
					<PdfIcon width={85} height={72} />
					<div className="flex flex-col gap-6">
						<p className="text-16 font-semibold">{record.pet.name} ({getCertificateLabel(record?.type)})</p>
						<p className="text-14">{record?.parent?.name}</p>
					</div>
				</div>
				<p className="text-12 mt-8">
					Uploaded on: {format(toZonedTime(record?.createdAtUTC, 'Asia/Kolkata'), 'do MMMM yyyy')}
				</p>
			</div>
			<div className="col-span-1 flex items-center justify-end gap-24">
				<a
					target="_blank"
					href={url as string}
					rel="noreferrer"
					onClick={handleDownload}
					className="font-bold text-14 text-primary-1 flex items-center justify-center underline decoration-primary-1"
				>
					View/Print
				</a>
				<ButtonWrapper
					onClick={handleDelete}
					className="w-[32px] h-[32px] flex items-center justify-center"
				>
					<DeleteIcon className="text-red-1" />
				</ButtonWrapper>
			</div>
		</div>
	);
}

export default memo(RecordItem);
