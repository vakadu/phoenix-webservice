"use client"

import { Fragment, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { Dialog, Transition } from '@headlessui/react';
import { useSelector } from 'react-redux';

import { ModalTypes } from '@webservices/primitives';
import { PemilyRootState, closeModal, usePemilyAppDispatch, MODAL_VIEW } from '@webservices/slices';
import { useRouterQuery } from '@webservices/hooks';

const ConfirmationModal = dynamic(() => import('./confirmation-modal/confirmation'));

/* eslint-disable-next-line */
export interface ModalViewsProps {
	bottomSheet?: boolean;
};

function renderModalContent(view: MODAL_VIEW | string) {
	switch (view) {
		case ModalTypes.CONFIRMATION_MODAL:
			return <ConfirmationModal/>;
		default:
			return null;
	}
}

export function Modal(props: ModalViewsProps) {
	const { pathname, params } = useRouterQuery();
	const dispatch = usePemilyAppDispatch();
	const modalData = useSelector((state: PemilyRootState) => state.modal);	

	const handleClose = useCallback(() => {
		dispatch(closeModal())
	}, []);

	useEffect(() => {		
		handleClose();
	  }, [pathname, params, handleClose])

	return (
		<Transition appear show={modalData.isOpen} as={Fragment}>
			<Dialog
				as="section"
				className="fixed inset-0 z-50 h-full w-full overflow-y-auto overflow-x-hidden text-center"
				onClose={handleClose}
			>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<Dialog.Overlay as='section' className="fixed inset-0 z-40 cursor-pointer bg-gray-700 bg-opacity-60 backdrop-blur" />
				</Transition.Child>

				{/* FOR CENTERING MODAL */}
				<span className="inline-block h-full align-middle" aria-hidden="true">
					&#8203;
				</span>

				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0 scale-105"
					enterTo="opacity-100 scale-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100 scale-100"
					leaveTo="opacity-0 scale-105"
				>
					<section className={`relative z-50 text-left align-middle ${modalData.bottomSheet ? '!absolute bottom-0 w-full' : 'inline-block w-full'}`}>
						{modalData.view && renderModalContent(modalData.view)}
					</section>
				</Transition.Child>
			</Dialog>
		</Transition>
	);
}

export default Modal;
