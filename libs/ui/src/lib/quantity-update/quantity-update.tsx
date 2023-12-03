import { MinusIcon, PlusIcon } from '@webservices/icons';
import Spinner from '../spinner/spinner';

/* eslint-disable-next-line */
export interface QuantityUpdateProps {
	onDecrease: () => void;
	onIncrease: () => void;
	quantity: number;
	decreaseDisabled: boolean;
	increaseDisabled: boolean;
	loading?: boolean;
}

export function QuantityUpdate(props: QuantityUpdateProps) {
	const { onDecrease, onIncrease, quantity, decreaseDisabled, increaseDisabled, loading = false } = props;
	return (
		<section className='flex items-center border border-grey-border h-32 md:h-42 max-w-[180px] rounded-tl-6 rounded-tr-6 rounded-bl-6 rounded-br-6 mt-12'>
			<button
				className={`w-[32px] md:w-[42px] md:flex-1 flex items-center justify-center h-full ${decreaseDisabled ? 'bg-grey-bg' : ''}`}
				onClick={onDecrease}
				disabled={decreaseDisabled}
			>
				<MinusIcon className='w-16 md:w-18'/>
			</button>
			<span className='text-14 md:text-16 w-[42px] md:w-[56px] md:flex-1 flex items-center justify-center border-l border-r border-grey-border h-full'>
				{ loading ? <Spinner spinnerClass='!w-16 !h-16'/> : quantity }
			</span>
			<button
				className={`w-[32px] md:w-[42px] md:flex-1 flex items-center justify-center h-full ${(increaseDisabled) ? 'bg-grey-bg' : ''}`}
				onClick={onIncrease}
				disabled={increaseDisabled}
			>
				<PlusIcon className='w-16 md:w-18'/>
			</button>
		</section>
	);
}

export default QuantityUpdate;
