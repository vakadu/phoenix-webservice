import { useSelector } from 'react-redux';
import { useMemo } from 'react';

import { PemilyRootState } from '@webservices/slices';
import { Dropdown, ImagePlaceholder } from '@webservices/ui';
import { MenuItem } from '@headlessui/react';
import { useGetUser, useGetUserProfileUrl } from '@webservices/api';
import { DownIcon } from '@webservices/icons';

const ProfileLabel = (name: string, id: string) => {
	const { data: profileData } = useGetUserProfileUrl(id as string);

	return (
		<section className="flex items-center gap-12">
			<ImagePlaceholder
				containerClasses="w-32 h-32"
				imageClasses="rounded-full shadow-base2"
				src={profileData?.data?.profileUrl as string}
			/>
			<span className="text-14">{name}</span>
			<DownIcon />
		</section>
	);
};

const Header = ({ sidebarClasses }: { sidebarClasses: string }) => {
	const authState = useSelector((state: PemilyRootState) => state.auth);
	const { data } = useGetUser(authState.userId as string);

	const menu = useMemo(() => {
		return [
			{
				label: 'Profile',
				icon: 'heroicons-outline:user',
				//   action: () => {
				//     router.push("/chat");
				//   },
			},
			{
				label: 'Logout',
				icon: 'heroicons-outline:login',
				//   action: () => {
				//     dispatch(handleLogout(false));
				//   },
			},
		];
	}, []);

	return (
		<header className="sticky top-0">
			<section className={`h-[72px] px-16 bg-white shadow-base flex ${sidebarClasses}`}>
				<section className="flex-1"></section>
				<section className="flex-1 flex justify-end items-center">
					<Dropdown
						label={ProfileLabel(
							data?.data?.user?.name as string,
							authState.userId as string
						)}
					>
						{menu.map((m, i) => {
							const isLast = menu.length - 1 === i;
							return (
								<MenuItem key={m.label}>
									<section
										className={`py-8 px-12 cursor-pointer hover:bg-primary-4 ${
											!isLast && 'border-b border-grey-divider'
										}`}
									>
										<span className="text-14">{m.label}</span>
									</section>
								</MenuItem>
							);
						})}
					</Dropdown>
				</section>
			</section>
		</header>
	);
};

export default Header;
