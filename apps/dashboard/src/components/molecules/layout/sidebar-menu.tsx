import { useSidebar } from '@webservices/hooks';
import { UserIcon } from '@webservices/icons';
import Link from 'next/link';

const SidebarMenu = ({ menuHover }: { menuHover: boolean }) => {
	const { collapsed } = useSidebar();
	const isCollapsed = menuHover || !collapsed;
	return (
		<ul className="mt-[52px]">
			<li>
				<Link
					className={`flex ${
						isCollapsed ? 'px-16 gap-12 items-center' : 'justify-center'
					}`}
					href="/user-profile"
				>
					<UserIcon className="text-primary-1" width={32} height={32} />
					{isCollapsed && <span>Profile</span>}
				</Link>
			</li>
		</ul>
	);
};

export default SidebarMenu;
