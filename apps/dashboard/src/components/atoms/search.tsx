import { CloseIcon } from '@webservices/icons';
import { ButtonWrapper } from '@webservices/ui';
import { memo } from 'react';

interface SearchProps {
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	value: string;
	handleClear: () => void;
}

const Search = ({ handleChange, value, handleClear }: SearchProps) => {
	return (
		<section className="relative mb-12">
			<input
				className="bg-white text-16 leading-16 h-[52px] pl-12 pr-[42px] transition duration-300 ease-in-out border focus:ring-2 focus:shadow-sm outline-none focus:border-none
                focus:outline-none focus:ring-opacity-90 rounded-8 w-full focus:ring-brand border-grey-divider"
				placeholder="Search for Per Parents..."
				onChange={handleChange}
				value={value}
			/>
			<ButtonWrapper
				onClick={handleClear}
				className="!absolute right-12 top-1/2 -translate-y-1/2"
			>
				<CloseIcon width={16} height={16} />
			</ButtonWrapper>
		</section>
	);
};

export default memo(Search);
