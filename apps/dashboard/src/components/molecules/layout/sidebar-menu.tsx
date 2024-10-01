import Link from 'next/link';

import { PetParentIcon, UserIcon } from '@webservices/icons';
import { ImagePlaceholder } from '@webservices/ui';
import { useRouterQuery } from '@webservices/hooks';

const menu = [
	{
		link: '/medical-records',
		path: '/images/medical-records.png',
		text: 'Medical Records',
		type: 'image',
	},
	{
		link: '/vaccination-records',
		path: '/images/vaccination-records.png',
		text: 'Vaccination Records',
		type: 'image',
	},
	{
		link: '/follow-up',
		path: '/images/follow-ups.png',
		text: 'Follow Ups',
		type: 'image',
	},
	{
		link: '/pet-parents',
		path: <PetParentIcon className="text-primary-1" width={24} height={24} />,
		text: 'Pet Parents',
		type: 'icon',
	},
	{
		link: '/user-profile',
		path: <UserIcon width={24} height={24} />,
		text: 'Profile',
		type: 'icon',
	},
];

const SidebarMenu = () => {
	const { pathname } = useRouterQuery();

	return (
		<ul className="mt-[52px] flex flex-col gap-6">
			{menu.map((item) => {
				const active = item.link === pathname;

				return (
					<li
						className={`${
							active ? 'bg-white px-12 rounded-8 shadow-base' : ''
						} mx-16 py-12`}
						key={item.link}
					>
						<Link className="flex gap-12 items-center" href={`${item.link}`}>
							{item?.type === 'icon' ? (
								item?.path
							) : (
								<ImagePlaceholder
									containerClasses="w-24 h-24"
									src={item.path as string}
								/>
							)}
							<span
								className={`truncate flex-1 text-14 ${active ? 'font-medium' : ''}`}
							>
								{item?.text}
							</span>
						</Link>
					</li>
				);
			})}
		</ul>
	);
};

export default SidebarMenu;
