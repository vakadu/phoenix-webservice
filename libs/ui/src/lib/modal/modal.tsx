'use client';

import { useEffect, ReactNode } from 'react';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';

import { useRouterQuery } from '@webservices/hooks';

/* eslint-disable-next-line */
export interface ModalProps {
	isOpen: boolean;
	children: ReactNode;
	handleClose: () => void;
}

export function Modal(props: ModalProps) {
	const { isOpen, children, handleClose } = props;
	const { pathname, params } = useRouterQuery();

	useEffect(() => {
		handleClose();
	}, [pathname, params]);

	return (
		<Dialog className="relative z-[999] focus:outline-none" onClose={handleClose} open={isOpen}>
			<DialogBackdrop className="fixed inset-0 bg-gray-700 bg-opacity-60 backdrop-blur" />
			<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
				<div className="flex min-h-full items-center justify-center p-4">
					<DialogPanel
						as="div"
						transition
						className="w-full max-w-3xl rounded-8 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
					>
						<div className="relative z-[999] text-left align-middle inline-block w-full">
							{children}
						</div>
					</DialogPanel>
				</div>
			</div>
		</Dialog>
	);
}

export default Modal;
