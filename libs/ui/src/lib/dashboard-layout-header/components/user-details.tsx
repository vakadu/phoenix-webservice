'use client';

import { useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { LogoutIcon, UserIcon, UserOutlineIcon } from '@webservices/icons';
import { openModal } from '@webservices/slices';
import { ModalTypes } from '@webservices/primitives';
import { useRouterQuery } from '@webservices/hooks';
import { pemilyyLogout } from '@webservices/helpers';
import Dropdown from '../../dropdown/dropdown';
import { MenuItem } from '@headlessui/react';
import ButtonWrapper from '../../button-wrapper/button-wrapper';

export default function UserDetails() {
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
							onHandleConfirm: () => pemilyyLogout(),
						})
					);
				},
			},
		];
	}, []);

	return (
		<div className="flex-1 flex justify-end items-center">
			<Dropdown
				label={
					<div className="w-32 h-32 flex justify-center items-center cursor-pointer">
						<UserOutlineIcon />
					</div>
				}
				menuClasses="w-[180px] top-[32px]"
			>
				{menu.map((item) => {
					return (
						<MenuItem key={item.label}>
							<ButtonWrapper
								className="flex py-12 px-12 gap-12 items-center"
								onClick={item.action}
							>
								{item.icon}
								<span className="text-14 font-medium">{item?.label}</span>
							</ButtonWrapper>
						</MenuItem>
					);
				})}
			</Dropdown>
		</div>
	);
}
