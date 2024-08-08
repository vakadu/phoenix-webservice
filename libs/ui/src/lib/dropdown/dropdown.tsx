import { ReactNode } from 'react';
import { Menu, Transition, MenuButton, MenuItems } from '@headlessui/react';

export function Dropdown({ label, children }: { label: string | ReactNode; children: ReactNode }) {
	return (
		<section className="relative inline-block">
			<Menu as="section" className="block w-full px-4 py-2 relative">
				<MenuButton className="block w-full">
					<span className="">{label}</span>
				</MenuButton>
				<Transition>
					<MenuItems
						as="section"
						anchor="bottom start"
						className="w-[220px] !fixed !top-[74px] origin-top-right right-0 bg-white shadow-dropdown rounded-8"
					>
						{children && children}
					</MenuItems>
				</Transition>
			</Menu>
		</section>
	);
}

export default Dropdown;
