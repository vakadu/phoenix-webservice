'use client';

import { useEffect, useCallback } from 'react';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { useSelector } from 'react-redux';

import { ModalTypes } from '@webservices/primitives';
import { PemilyRootState, closeModal, usePemilyAppDispatch, MODAL_VIEW } from '@webservices/slices';
import { useRouterQuery } from '@webservices/hooks';
import ConfirmationModal from '../confirmation-modal/confirmation-modal';

/* eslint-disable-next-line */
export interface ModalViewsProps {}

function renderModalContent(view: MODAL_VIEW | string) {
	switch (view) {
		case ModalTypes.CONFIRMATION_MODAL:
			return <ConfirmationModal />;
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
			as="section"
			className="relative z-[12] focus:outline-none"
			onClose={handleClose}
			open={modalData.isOpen}
		>
			<DialogBackdrop
				as="section"
				className="fixed inset-0 bg-gray-700 bg-opacity-60 backdrop-blur"
			/>
			<section className="fixed inset-0 z-10 w-screen overflow-y-auto">
				<section className="flex min-h-full items-center justify-center p-4">
					<DialogPanel
						as="section"
						transition
						className="w-full max-w-2xl rounded-8 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
					>
						<section className="relative z-50 text-left align-middle inline-block w-full">
							{modalData.view && renderModalContent(modalData.view)}
						</section>
					</DialogPanel>
				</section>
			</section>
		</Dialog>
	);
}

export default ModalView;
