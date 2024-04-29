"use client"

import { Fragment, useEffect, ReactNode } from 'react';
import { Dialog, Transition } from '@headlessui/react';

import { useRouterQuery } from '@webservices/hooks';

/* eslint-disable-next-line */
export interface ModalProps {
	isOpen: boolean;
	children: ReactNode;
	handleClose: () => void;
	isCenter?: boolean;
};

export function Modal(props: ModalProps) {
	const { isOpen, children, handleClose, isCenter = true } = props;
	const { pathname, params } = useRouterQuery();

	useEffect(() => {		
		handleClose();
	}, [pathname, params])

	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog
				as="section"
				className="fixed inset-0 z-50 h-full w-full overflow-y-auto overflow-x-hidden"
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
				{
					isCenter &&
						<span className="inline-block h-full align-middle" aria-hidden="true">
							&#8203;
						</span>
				}

				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0 scale-105"
					enterTo="opacity-100 scale-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100 scale-100"
					leaveTo="opacity-0 scale-105"
				>
					{/* <section className="relative z-50 text-left align-middle inline-block w-full"> */}
						{children}
					{/* </section> */}
				</Transition.Child>
			</Dialog>
		</Transition>
	);
}

export default Modal;
