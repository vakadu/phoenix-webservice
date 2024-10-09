import { ReactNode } from 'react';

import ButtonWrapper from '../button-wrapper/button-wrapper';

interface IFilterItemProps {
	active: boolean;
	value: string;
	children: ReactNode;
}

export const FilterIcon = ({ active, children }: { active: boolean; children: ReactNode }) => {
	return (
		<span
			className={`w-[29px] h-[29px] border  rounded-full flex items-center justify-center bg-white ${
				active ? 'border-white' : 'border-purple'
			}`}
		>
			{children}
		</span>
	);
};

export const FilterLabel = ({ active, children }: { active: boolean; children: ReactNode }) => {
	return (
		<span className={`${active ? 'text-white' : 'text-black'} text-14 font-semibold`}>
			{children}
		</span>
	);
};

export function FilterItem({ active, value, children }: IFilterItemProps) {
	return (
		<ButtonWrapper
			className={`flex gap-8 items-center  px-8 rounded-full shadow-base min-w-[142px] py-8 ${
				active ? 'bg-purple' : 'bg-white'
			}`}
			key={value}
			data-id={value}
		>
			{children}
		</ButtonWrapper>
	);
}

export default FilterItem;
