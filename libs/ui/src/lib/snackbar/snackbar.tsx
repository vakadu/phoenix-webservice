'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Transition } from '@headlessui/react';

import { PemilyRootState, closeSnackbar } from '@webservices/slices';

/* eslint-disable-next-line */
export interface SnackbarProps {}

export function Snackbar(props: SnackbarProps) {
	const dispatch = useDispatch();
	const {
		message,
		open,
		duration,
		showCloseButton = true,
		actionButton,
		btnText = 'close',
	} = useSelector((state: PemilyRootState) => state.snackbar);

	useEffect(() => {
		let timer: NodeJS.Timeout;
		if (open) {
			timer = setTimeout(() => {
				dispatch(closeSnackbar());
			}, duration);
		}
		return () => {
			if (timer) clearTimeout(timer);
		};
	}, [open, duration, dispatch]);

	const handleSnackbar = () => {
		dispatch(closeSnackbar());
	};

	const handleAction = () => {
		actionButton?.();
	};

	if (!open) return null;

	return (
		<Transition
			show={open}
			enter="transition-opacity ease-linear duration-300"
			enterFrom="opacity-0"
			enterTo="opacity-100"
			leave="transition-opacity ease-linear duration-300"
			leaveFrom="opacity-100"
			leaveTo="opacity-0"
			className="fixed bottom-12 lg:bottom-32 left-1/2 lg:left-[14%] w-full px-12 md:min-w-[350px] md:max-w-[350px] transform -translate-x-1/2"
		>
			<section className="px-8 lg:px-12 py-8 bg-[#323232] rounded-6 flex justify-between items-center">
				<p className="text-white text-14 font-medium">{message}</p>
				{showCloseButton && (
					<button onClick={handleSnackbar} className="text-white ml-12 text-24">
						&times;
					</button>
				)}
				{!showCloseButton && (
					<button
						onClick={btnText === 'close' ? handleSnackbar : handleAction}
						className="text-brand ml-12 text-12 font-semibold py-8"
					>
						{btnText}
					</button>
				)}
			</section>
		</Transition>
	);
}

export default Snackbar;
