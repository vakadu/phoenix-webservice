'use client';

import { memo, useState } from 'react';
import { format } from 'date-fns';
import { useDispatch } from 'react-redux';
import dynamic from 'next/dynamic';

import PreviewImage from './preview-image';
import useDocumentDownlaod from '../hooks/use-download-document.hook';
import { DeleteIcon, DownloadIcon, EditIcon, NotesIcon } from '@webservices/icons';
import ButtonWrapper from '../../button-wrapper/button-wrapper';
import { closeModal, openModal } from '@webservices/slices';
import { ModalTypes } from '@webservices/primitives';
import { useUpdateMedicalRecord } from '@webservices/api';
import Loading from '../../loading/loading';

const CommentModal = dynamic(() => import('./comment-modal'), {
	loading: () => <Loading />,
});

interface IRecordItem {
	record: IClinicTypes.IMedicalRecord;
	refetch: () => void;
	activeFilter: string;
}

function Record({ record, refetch, activeFilter }: IRecordItem) {
	const { imgType, url } = useDocumentDownlaod({ url: record.url });
	const dispatch = useDispatch();
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
		updateMedicalRecord(commentData);
	};

	const handleDelete = () => {
		dispatch(
			openModal({
				isOpen: true,
				view: ModalTypes.CONFIRMATION_MODAL,
				confirmationTitle: 'Delete Record',
				confirmationHeading: 'Are you sure you want to delete the record?',
				onHandleConfirm: onDelete,
				center: true,
			})
		);
	};

	const handleModalClose = () => {
		setShowModal(false);
	};

	const handleModalOpen = () => {
		setShowModal(true);
	};

	return (
		<div className="grid grid-cols-3 gap-12 bg-white mb-12 rounded-8 shadow-base px-16 py-12">
			<CommentModal
				isOpen={showModal}
				id={record?._id}
				comment={record.comment as string}
				handleClose={handleModalClose}
				refetch={refetch}
				activeFilter={activeFilter}
			/>
			<div className="col-span-1">
				<div className="flex gap-12 ">
					<PreviewImage imgType={imgType} url={url as string} />
					<div className="flex flex-col gap-6">
						<p className="text-18 font-semibold">{record.pet.name}</p>
						<p className="text-14">{record?.parent?.name}</p>
					</div>
				</div>
				<p className="text-12 mt-8">
					Uploaded on: {format(new Date(record?.createdAtIST), 'do MMMM yyyy')}
				</p>
			</div>
			<div className="col-span-1">
				<div className="flex justify-between">
					<div className="flex gap-6 items-center">
						<NotesIcon />
						<span className="text-14">Notes</span>
					</div>
					<ButtonWrapper
						onClick={handleModalOpen}
						className="w-32 h-32 flex justify-center items-center"
					>
						<EditIcon />
					</ButtonWrapper>
				</div>
				<span className="text-14">{record?.comment}</span>
			</div>
			<div className="col-span-1 flex items-center justify-end gap-24">
				<a
					target="_blank"
					href={url as string}
					rel="noreferrer"
					className="w-[32px] h-[32px] flex items-center justify-center"
				>
					<DownloadIcon />
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

export default memo(Record);
