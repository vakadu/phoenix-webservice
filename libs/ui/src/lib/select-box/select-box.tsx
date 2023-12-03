"use client"

import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';

import { TickIcon, UpDownIcon } from '@webservices/icons';

export interface SelectBoxProps {
	data: any;
	selected: any;
	handleChange: any;
	defaultOption: string;
};

export const SelectBox = (props: SelectBoxProps) => {
	const { selected, handleChange, data, defaultOption } = props;

	return (
		<Listbox as="section" value={selected} onChange={handleChange}>
			<section className="relative mt-1">
				<Listbox.Button as="button" className="relative w-full text-left px-12 py-6 border border-grey-stroke shadow-2 rounded-4">
					<span className="block truncate text-14 font-medium">{ selected?.name ? selected?.name : defaultOption }</span>
					<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
						<UpDownIcon
							className='w-16 h-16'
						/>
					</span>
				</Listbox.Button>
				<Transition
					as={Fragment}
					leave="transition ease-in duration-100"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<Listbox.Options className="absolute max-h-60 w-full overflow-auto bg-white z-10 shadow-2">
						{data.map((newData: any, idx: number) => (
							<Listbox.Option
								key={idx}
								style={{ paddingLeft: 24 }}
								className={({ active }) =>
									`relative cursor-pointer select-none py-12 ${
										active ? 'bg-grey-lighter' : ''
									}`
								}
								value={newData}
							>
								{({ selected }) => (
									<span className={`block text-14 truncate ${ selected ? 'font-medium text-brand' : 'font-normal' }`}>
										{newData.name}
									</span>
								)}
							</Listbox.Option>
						))}
					</Listbox.Options>
				</Transition>
			</section>
		</Listbox>
	)
}

export default SelectBox;
