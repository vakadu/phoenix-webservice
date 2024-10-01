'use client';

import { useEffect, useCallback } from 'react';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { useSelector } from 'react-redux';
import dynamic from 'next/dynamic';

import { ModalTypes } from '@webservices/primitives';
import { PemilyRootState, closeModal, usePemilyAppDispatch, MODAL_VIEW } from '@webservices/slices';
import { useRouterQuery } from '@webservices/hooks';
import Loading from '../loading/loading';

const ConfirmationModal = dynamic(() => import('../confirmation-modal/confirmation-modal'), {
	loading: () => <Loading />,
});

const AddEditParentModal = dynamic(() => import('../add-edit-parent/add-edit-parent'), {
	loading: () => <Loading />,
});

const AddEditPetModal = dynamic(() => import('../add-edit-pet/add-edit-pet'), {
	loading: () => <Loading />,
});

const LoadingModal = dynamic(() => import('../loading-modal/loading-modal'), {
	loading: () => <Loading />,
});

/* eslint-disable-next-line */
export interface ModalViewsProps {}

function renderModalContent(view: MODAL_VIEW | string) {
	switch (view) {
		case ModalTypes.CONFIRMATION_MODAL:
			return <ConfirmationModal />;
		case ModalTypes.ADD_EDIT_PARENT:
			return <AddEditParentModal />;
		case ModalTypes.ADD_EDIT_PET:
			return <AddEditPetModal />;
		case ModalTypes.LOADING_MODAL:
			return <LoadingModal />;
		default:
			return null;
	}
}

export function ModalView(props: ModalViewsProps) {
	const { pathname, params } = useRouterQuery();
	const dispatch = usePemilyAppDispatch();
	const modalData = useSelector((state: PemilyRootState) => state.modal);

	const handleClose = useCallback(() => {
		dispatch(closeModal());
	}, []);

	useEffect(() => {
		handleClose();
	}, [pathname, params, handleClose]);

	return (
		<Dialog
			className="relative z-[12] focus:outline-none"
			onClose={handleClose}
			open={modalData.isOpen}
		>
			<DialogBackdrop className="fixed inset-0 bg-gray-700 bg-opacity-60 backdrop-blur" />
			<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
				<div className="flex min-h-full items-center justify-center p-4">
					<DialogPanel
						transition
						className="w-full max-w-2xl rounded-8 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
					>
						<div className="relative z-50 text-left align-middle inline-block w-full">
							{modalData.view && renderModalContent(modalData.view)}
						</div>
					</DialogPanel>
				</div>
			</div>
		</Dialog>
	);
}

export default ModalView;
