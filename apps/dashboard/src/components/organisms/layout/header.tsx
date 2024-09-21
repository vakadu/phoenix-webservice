import { useDispatch } from 'react-redux';
import { useMemo } from 'react';
import { MenuItem } from '@headlessui/react';

import { openModal } from '@webservices/slices';
import { ButtonWrapper, Dropdown, ImagePlaceholder } from '@webservices/ui';
import { useGetUserProfileUrl } from '@webservices/api';
import { DownIcon, LogoutIcon, UserIcon, UserOutlineIcon } from '@webservices/icons';
import { ModalTypes } from '@webservices/primitives';
import { useRouterQuery } from '@webservices/hooks';
import { logout } from '../../../helpers';

const ProfileLabel = (name: string, id: string) => {
	const { data: profileData } = useGetUserProfileUrl(id as string);

	return (
		<section className="flex items-center gap-12">
			{profileData?.data?.profileUrl && profileData?.data?.profileUrl !== '' ? (
				<ImagePlaceholder
					containerClasses="w-32 h-32"
					imageClasses="rounded-full shadow-base2 object-cover"
					src={profileData?.data?.profileUrl as string}
				/>
			) : (
				<UserIcon width={32} height={32} />
			)}

			<span className="text-14">{name}</span>
			<DownIcon />
		</section>
	);
};

const Header = ({ sidebarClasses }: { sidebarClasses: string }) => {
	const dispatch = useDispatch();
	const { router } = useRouterQuery();

	const menu = useMemo(() => {
		return [
			{
				label: 'Profile',
				icon: <UserIcon width={16} height={16} />,
				action: () => {
					router.push('/user-profile');
				},
			},
			{
				label: 'Logout',
				icon: <LogoutIcon width={16} height={16} />,
				action: () => {
					dispatch(
						openModal({
							isOpen: true,
							view: ModalTypes.CONFIRMATION_MODAL,
							confirmationTitle: 'Logout',
							confirmationHeading: 'Are you sure you want to logout?',
							onHandleConfirm: () => logout(),
						})
					);
				},
			},
		];
	}, []);

	return (
		<header className="sticky top-0 z-[10]">
			<section className={`h-[72px] px-16 flex ${sidebarClasses}`}>
				<div className="flex-1"></div>
				<div className="flex-1 flex justify-end items-center">
					<Dropdown
						label={
							<ButtonWrapper className="w-32 h-32 flex justify-center items-center">
								<UserOutlineIcon />
							</ButtonWrapper>
						}
						menuClasses="!top-[54px] origin-top-right right-16 w-[220px] "
					>
						{menu.map((m, i) => {
							const isLast = menu.length - 1 === i;
							return (
								<MenuItem key={m.label}>
									<section
										className={`py-12 px-12 cursor-pointer hover:bg-grey-2 flex gap-12 items-center ${
											!isLast && 'border-b border-grey-divider'
										}`}
										onClick={m.action}
									>
										{m.icon}
										<span className="text-14">{m.label}</span>
									</section>
								</MenuItem>
							);
						})}
					</Dropdown>
				</div>
			</section>
		</header>
	);
};

export default Header;
