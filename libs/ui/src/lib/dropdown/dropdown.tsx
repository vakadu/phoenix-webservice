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
		<div className="relative">
			<Menu as="div" className="block w-full py-2 relative">
				<MenuButton className="block w-full">
					<div className="">{label}</div>
				</MenuButton>
				<Transition>
					<MenuItems
						anchor="bottom start"
						className={`!fixed bg-white shadow-dropdown rounded-8 z-[99] ${menuClasses}`}
					>
						{children && children}
					</MenuItems>
				</Transition>
			</Menu>
		</div>
	);
}

export default Dropdown;
