"use client"

import { Menu, Transition } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';

import { DownIcon } from '@webservices/icons';
import ButtonWrapper from '../button-wrapper/button-wrapper';

/* eslint-disable-next-line */

type MenuItem = {
	label: string;
	icon: ReactNode;
	containerClass?: string;
	textClass?: string;
	onClick: () => void;
};

export interface DropdownProps {
	menuItems: MenuItem[];
	text: ReactNode;
	containerClass: string;
	itemClass?: string;
}

export function Dropdown(props: DropdownProps) {
	const { menuItems, text, containerClass, itemClass } = props;

	return (
		<Menu as="section" className={`relative inline-block text-left ${containerClass}`}>
			<Menu.Button className="flex items-center">
				{ text }
				<DownIcon className="" aria-hidden="true" />
			</Menu.Button>
			<Transition
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<Menu.Items className={`absolute flex flex-col right-0 mt-2 origin-top-right divide-y divide-grey-border rounded-6 bg-white shadow-lg focus:outline-none ${itemClass}`}>
					{menuItems.map((item, index) => (
						<Menu.Item key={index}>
							{({ active }) => (
								<ButtonWrapper 
									className="py-12 px-12 w-full text-left flex"
									onClick={item.onClick}
								>
									{ item.icon }
									<span className="ml-8 text-14">{item.label}</span>
								</ButtonWrapper>
							)}
						</Menu.Item>
					))}
				</Menu.Items>
			</Transition>
		</Menu>
	);
}

export default Dropdown;
