import { ChangeEvent, memo } from 'react';

import { CloseIcon, DownArrowIcon, SearchIcon, UpArrowIcon } from '@webservices/icons';
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
		<div className="focus-within:ring-2 focus-within:ring-primary-1 focus-within:ring-offset-2 bg-white rounded-8">
			<div className="flex items-center px-16 py-12">
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
			<div className="bg-primary-3 rounded-bl-8 rounded-br-8 py-8 px-16 flex justify-between items-center gap-12">
				<div className="flex gap-6">
					<span className="text-14">Navigate</span>
					<div className="w-24 h-24 p-4 bg-white rounded-8 flex justify-center items-center border border-grey-divider">
						<UpArrowIcon className="w-18 h-18" />
					</div>
					<div className="w-24 h-24 p-4 bg-white rounded-8 flex justify-center items-center border border-grey-divider">
						<DownArrowIcon />
					</div>
				</div>
				<div className="flex gap-6 items-center">
					<span className="text-14">Close</span>
					<div className="px-4 bg-white rounded-8 flex justify-center items-center border border-grey-divider">
						<span className="text-12">esc</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default memo(Search);
