import { CloseIcon } from '@webservices/icons';
import { ButtonWrapper } from '@webservices/ui';
import { memo } from 'react';

interface SearchProps {
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	value: string;
	handleClear: () => void;
	placeholder?: string;
}

const Search = ({ handleChange, value, handleClear, placeholder = '' }: SearchProps) => {
	return (
		<section className="relative mb-12 flex-1">
			<input
				className="bg-white text-16 leading-16 h-[56px] pl-12 pr-[42px] transition duration-300 ease-in-out border focus:ring-2 focus:shadow-sm outline-none focus:border-none
                focus:outline-none focus:ring-opacity-90 rounded-8 w-full focus:ring-brand border-grey-divider"
				placeholder={placeholder}
				onChange={handleChange}
				value={value}
			/>
			{value.length > 0 && (
				<ButtonWrapper
					onClick={handleClear}
					className="!absolute right-12 top-1/2 -translate-y-1/2 bg-black-1 w-24 h-24 rounded-full flex justify-center items-center"
				>
					<CloseIcon className="text-white" width={14} height={14} />
				</ButtonWrapper>
			)}
		</section>
	);
};

export default memo(Search);
