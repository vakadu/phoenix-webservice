import { useState } from 'react';
import { format } from 'date-fns';
import dynamic from 'next/dynamic';
import { useDispatch } from 'react-redux';

import { useUpdateMedicalRecord } from '@webservices/api';
import { ButtonWrapper } from '@webservices/ui';
import { DeleteIcon, DownloadIcon, EditIcon, NotesIcon } from '@webservices/icons';
import { useRecordSidebar } from '../../context/record-sidebar-context';
import { closeModal, openModal } from '@webservices/slices';
import { ModalTypes } from '@webservices/primitives';
import PreviewImage from './preview-image';
import useDocumentDownlaod from '../../hooks/download-document';

const CommentModal = dynamic(() => import('../molecules/medical-records/comment'), {
	loading: () => <p>Loading...</p>,
});

const MedicalRecord = ({ record }: { record: IClinicTypes.IMedicalRecord }) => {
	const [show, setModal] = useState(false);
	const { activeRecord, selectedDate } = useRecordSidebar();
	const { mutate: updateMedicalRecord } = useUpdateMedicalRecord({
		id: record?._id,
		type: activeRecord,
		date: selectedDate,
		handleClose: closeModal,
	});
	const { url, imgType } = useDocumentDownlaod({ url: record.url });
	const dispatch = useDispatch();

	const onDelete = () => {
		const commentData = {
			type: activeRecord,
			active: false,
		};
		updateMedicalRecord(commentData);
	};

	const handleDelete = () => {
		dispatch(
			openModal({
				isOpen: true,
				view: ModalTypes.CONFIRMATION_MODAL,
				confirmationTitle: 'Delete Record',
				confirmationHeading: 'Are you sure you want to record?',
				onHandleConfirm: onDelete,
			})
		);
	};

	return (
		<section className="grid grid-cols-3 bg-white mb-12 rounded-8 shadow-base px-16 py-12">
			<CommentModal
				comment={record.comment as string}
				isOpen={show}
				handleClose={() => setModal(false)}
				id={record?._id}
			/>
			<section className="flex gap-12 col-span-1">
				<PreviewImage imgType={imgType} url={url as string} />
				<div className="flex flex-col gap-6">
					<p className="text-18 font-semibold">{record.pet.name}</p>
					<p className="text-14">{record?.parent?.name}</p>
					<p className="text-14">
						Uploaded on: {format(new Date(record?.createdAtIST), 'do MMMM yyyy')}
					</p>
				</div>
			</section>
			<section className="col-span-1">
				<div className="flex justify-between">
					<div className="flex gap-6 items-center">
						<NotesIcon />
						<span className="text-14">Notes</span>
					</div>
					<ButtonWrapper
						onClick={() => setModal(true)}
						className="w-42 h-42 flex justify-center items-center"
					>
						<EditIcon />
					</ButtonWrapper>
				</div>
				<span className="text-14">{record?.comment}</span>
			</section>
			<section className="col-span-1 flex items-center justify-end gap-24">
				<a
					target="_blank"
					href={url as string}
					className="w-[42px] h-[42px] flex items-center justify-center"
				>
					<DownloadIcon />
				</a>
				<ButtonWrapper
					onClick={handleDelete}
					className="w-[42px] h-[42px] flex items-center justify-center"
				>
					<DeleteIcon />
				</ButtonWrapper>
			</section>
		</section>
	);
};

export default MedicalRecord;
