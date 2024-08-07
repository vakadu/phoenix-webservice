import { Menu, Transition } from '@headlessui/react';

export function Dropdown() {
	return (
		<section className={`relative ${wrapperClass}`}>
			<Menu as="div" className={`block w-full ${className}`}>
				<Menu.Button className="block w-full">
					<div className={labelClass}>{label}</div>
				</Menu.Button>
			</Menu>
		</section>
	);
}

export default Dropdown;
