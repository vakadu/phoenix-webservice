import { Fragment, ReactNode } from 'react';
import { Portal, Transition } from '@headlessui/react';

export function Sidebar({
	children,
	isOpen,
	handleClose,
}: {
	children: ReactNode;
	isOpen: boolean;
	handleClose: () => void;
}) {
	return (
		<Portal>
			<div
				className={`fixed right-0 top-0 w-[400px]
         bg-white h-screen z-[9999] shadow-base2
          transition-all duration-150
          ${isOpen ? 'translate-x-0 opacity-100 visible' : 'translate-x-full opacity-0 invisible'}
        `}
			>
				{children}
			</div>
			<Transition as={Fragment} show={isOpen}>
				<div
					className="overlay bg-gray-700 bg-opacity-0 backdrop-blur  fixed inset-0 z-[999]"
					onClick={handleClose}
				></div>
			</Transition>
		</Portal>
	);
}

export default Sidebar;
