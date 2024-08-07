'use client';

import { useSidebar } from '@webservices/hooks';
import { useState } from 'react';
import Logo from './logo';

const Sidebar = () => {
	const [menuHover, setMenuHover] = useState(false);
	const { collapsed } = useSidebar();
	return (
		<nav
			onMouseEnter={() => setMenuHover(true)}
			onMouseLeave={() => setMenuHover(false)}
			className={`${
				collapsed ? 'w-[72px]' : 'w-[248px]'
			} fixed h-screen top-0 z-[999] bg-white shadow-base transition-width duration-200 ease-ease1 ${
				menuHover ? '!w-[248px]' : ''
			}`}
		>
			<Logo menuHover={menuHover} />
		</nav>
	);
};

export default Sidebar;
