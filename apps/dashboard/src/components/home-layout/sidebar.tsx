'use client';

import { useSidebar } from '@webservices/hooks';
import { useState } from 'react';

import Logo from './logo';
import { ButtonWrapper } from '@webservices/ui';
import { HideSidebarIcon, ShowSidebarIcon } from '@webservices/icons';

const Sidebar = () => {
	const [menuHover, setMenuHover] = useState(false);
	const { collapsed, setMenuCollapsed } = useSidebar();
	return (
		<nav
			onMouseEnter={() => setMenuHover(true)}
			onMouseLeave={() => setMenuHover(false)}
			className={`${
				collapsed ? 'w-[72px]' : 'w-[248px]'
			} fixed h-screen top-0 z-[9] bg-white shadow-base transition-width duration-200 ease-ease1 ${
				menuHover ? '!w-[248px]' : ''
			}`}
		>
			<section className="relative h-full flex flex-col py-24">
				<section className="flex-1">
					<Logo menuHover={menuHover} />
				</section>
				<section
					className={`flex px-16 ${
						!collapsed || menuHover ? 'justify-end' : 'justify-center'
					}`}
				>
					<ButtonWrapper
						onClick={() => setMenuCollapsed(!collapsed)}
						className="w-32 h-32"
					>
						{!collapsed || menuHover ? (
							<HideSidebarIcon width={32} height={32} />
						) : (
							<ShowSidebarIcon width={32} height={32} />
						)}
					</ButtonWrapper>
				</section>
			</section>
		</nav>
	);
};

export default Sidebar;
