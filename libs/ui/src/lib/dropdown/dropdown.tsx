import { ReactNode } from 'react';
import { Menu, Transition, MenuButton, MenuItems } from '@headlessui/react';

export function Dropdown({
	label,
	children,
	menuClasses,
}: {
	label: string | ReactNode;
	children: ReactNode;
	menuClasses?: string;
}) {
	return (
		<section className="relative">
			<Menu as="section" className="block w-full py-2 relative">
				<MenuButton className="block w-full">
					<div className="">{label}</div>
				</MenuButton>
				<Transition>
					<MenuItems
						as="section"
						anchor="bottom start"
						className={`!fixed bg-white shadow-dropdown rounded-8 z-[99] ${menuClasses}`}
					>
						{children && children}
					</MenuItems>
				</Transition>
			</Menu>
		</section>
	);
}

export default Dropdown;
