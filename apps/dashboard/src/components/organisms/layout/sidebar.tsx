import Logo from '../../molecules/layout/logo';
import SidebarMenu from '../../molecules/layout/sidebar-menu';

const Sidebar = () => {
	return (
		<nav
			className="w-[272px] fixed h-screen top-0 z-[11] transition-width duration-200 ease-ease1"
			// className={`${
			// 	collapsed ? 'w-[72px]' : 'w-[248px]'
			// } fixed h-screen top-0 z-[11] bg-white shadow-base transition-width duration-200 ease-ease1 ${
			// 	menuHover ? '!w-[248px]' : ''
			// }`}
		>
			<section className="relative h-full flex flex-col py-24">
				<section className="flex-1">
					<Logo />
					<SidebarMenu />
				</section>
				{/* <section
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
				</section> */}
			</section>
		</nav>
	);
};

export default Sidebar;
