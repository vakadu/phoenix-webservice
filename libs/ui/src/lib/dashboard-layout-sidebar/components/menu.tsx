import Link from 'next/link';
import classNames from 'classnames';

import { PetParentIcon, UserIcon } from '@webservices/icons';
import ImagePlaceholder from '../../image-placeholder/image-placeholder';
import { useRouterQuery } from '@webservices/hooks';
import { logEvent } from '@webservices/services';
import { USER_EVENTS } from '@webservices/primitives';

const menu = [
	{
		link: '/medical-records',
		icon: '/images/medical-records.png',
		text: 'Medical Records',
		type: 'image',
	},
	{
		link: '/vaccination-records',
		icon: '/images/vaccination-records.png',
		text: 'Vaccination Records',
		type: 'image',
	},
	{
		link: '/follow-up',
		icon: '/images/follow-ups.png',
		text: 'Follow Ups',
		type: 'image',
	},
	{
		link: '/pet-parents',
		icon: <PetParentIcon className="text-primary-1" width={24} height={24} />,
		text: 'Pet Parents',
		type: 'icon',
	},
	{
		link: '/user-profile',
		icon: <UserIcon width={24} height={24} />,
		text: 'Profile',
		type: 'icon',
	},
];

export default function NavMenu() {
	const { pathname } = useRouterQuery();

	const handleEvents = (link: string) => {
		logEvent({ name: USER_EVENTS.SIDE_MENU_CLICK, events: { path: link } });
	};

	return (
		<nav className="flex-1 mt-32">
			<ul className="flex flex-col gap-24">
				{menu.map((item) => {
					const active = item.link === pathname;

					return (
						<li key={item.text}>
							<Link
								className={classNames(
									'flex gap-12',
									active ? 'bg-white shadow-base py-12 px-12 rounded-8' : ''
								)}
								href={item.link}
								onClick={() => handleEvents(item.link)}
							>
								{item?.type === 'icon' ? (
									item?.icon
								) : (
									<ImagePlaceholder
										containerClasses="w-24 h-24"
										src={item.icon as string}
									/>
								)}
								<span className="text-14 font-medium">{item.text}</span>
							</Link>
						</li>
					);
				})}
			</ul>
		</nav>
	);
}
