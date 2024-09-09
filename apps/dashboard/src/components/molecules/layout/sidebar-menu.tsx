import Link from 'next/link';

import { useSidebar } from '@webservices/hooks';
import { UserIcon } from '@webservices/icons';
import { ImagePlaceholder } from '@webservices/ui';

const menu = [
	{
		link: 'medical-records',
		path: '/images/medical-records.png',
		text: 'Medical Records',
		type: 'image',
	},
	{
		link: 'vaccination-records',
		path: '/images/vaccination-records.png',
		text: 'Vaccination Records',
		type: 'image',
	},
	{
		link: 'follow-up',
		path: '/images/follow-ups.png',
		text: 'Follow Ups',
		type: 'image',
	},
	{
		link: 'user-profile',
		path: <UserIcon className="text-primary-1" width={32} height={32} />,
		text: 'Profile',
		type: 'icon',
	},
];

const SidebarMenu = ({ menuHover }: { menuHover: boolean }) => {
	const { collapsed } = useSidebar();
	const isCollapsed = menuHover || !collapsed;
	return (
		<ul className="mt-[52px] flex flex-col gap-24">
			{menu.map((item) => {
				return (
					<li key={item.link}>
						<Link
							className={`flex ${
								isCollapsed ? 'px-16 gap-12 items-center' : 'justify-center'
							}`}
							href={`/${item.link}`}
						>
							{item?.type === 'icon' ? (
								item?.path
							) : (
								<ImagePlaceholder
									containerClasses="w-32 h-32"
									src={item.path as string}
								/>
							)}
							{isCollapsed && <span className="truncate flex-1">{item?.text}</span>}
						</Link>
					</li>
				);
			})}
		</ul>
	);
};

export default SidebarMenu;
