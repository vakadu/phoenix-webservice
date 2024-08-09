import { useDispatch, useSelector } from 'react-redux';

import { closeModal, PemilyRootState } from '@webservices/slices';
import Button from '../button/button';
import ButtonWrapper from '../button-wrapper/button-wrapper';
import { CloseIcon } from '@webservices/icons';

export function ConfirmationModal() {
	const dispatch = useDispatch();
	const modalState = useSelector((state: PemilyRootState) => state.modal);

	const handleClose = () => {
		dispatch(closeModal());
	};

	const handleConfirm = () => {
		if (modalState.onHandleConfirm) {
			modalState.onHandleConfirm();
		}
		handleClose();
	};

	return (
		<section className="bg-white rounded-8">
			<header className="py-18 px-16 flex justify-between border-b border-grey-divider">
				<h2 className="text-18 font-semibold">{modalState.confirmationTitle}</h2>
				<ButtonWrapper onClick={handleClose}>
					<CloseIcon width={16} height={16} />
				</ButtonWrapper>
			</header>
			<p className="px-16 pt-24">{modalState.confirmationHeading}</p>
			<footer className="py-24 px-16 border-grey-divider flex justify-end gap-24">
				<ButtonWrapper onClick={handleClose}>Cancel</ButtonWrapper>
				{modalState.onHandleConfirm && <Button onClick={handleConfirm}>Confirm</Button>}
			</footer>
		</section>
	);
}

export default ConfirmationModal;
