import { ChangeEvent, memo } from 'react';

import { CloseIcon, SearchIcon } from '@webservices/icons';
import ButtonWrapper from '../../button-wrapper/button-wrapper';

function Search({
	value,
	onChange,
	onClear,
}: {
	value: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	onClear: () => void;
}) {
	return (
		<div className="focus-within:ring-2 focus-within:ring-primary-1 focus-within:ring-offset-2 bg-white rounded-8 flex items-center px-16 py-12">
			<div className="flex-1 items-center flex">
				<SearchIcon className="w-18 h-18" />
				<input
					value={value}
					onChange={onChange}
					className="focus:outline-none w-full rounded-8 pl-12"
					placeholder="Search for Parents, pets..."
				/>
			</div>
			{value.length > 0 && (
				<ButtonWrapper
					onClick={onClear}
					className="w-16 h-16 bg-black-1 rounded-full flex items-center justify-center"
				>
					<CloseIcon className="text-white" />
				</ButtonWrapper>
			)}
		</div>
	);
}

export default memo(Search);
