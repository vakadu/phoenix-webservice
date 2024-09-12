'use client';

import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { PemilyRootState } from '@webservices/slices';
import { useRouterQuery, useSidebar } from '@webservices/hooks';
import Header from '../../components/organisms/layout/header';
import Sidebar from '../../components/organisms/layout/sidebar';
import { Roles } from '@webservices/primitives';
import { logout } from '../../helpers';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
	const authState = useSelector((state: PemilyRootState) => state.auth);
	const { router } = useRouterQuery();
	const { collapsed } = useSidebar();
	const roles = [Roles.Clinic, Roles.Staff];

	useEffect(() => {
		if (!authState.loggedIn) {
			router.push('/');
		} else if (!roles.includes(authState.role as Roles)) {
			logout();
			router.push('/');
		}
	}, [authState.loggedIn, router]);

	const sidebarClasses = useMemo(() => {
		return 'ml-[248px] transition-all duration-150';
	}, []);

	return (
		<section className="max-w-screen-2xl">
			<Header sidebarClasses={sidebarClasses} />
			<Sidebar />
			<section className={`${sidebarClasses} bg-grey-bg1 min-h-[calc(100vh-72px)]`}>
				{children}
			</section>
		</section>
	);
};

export default DashboardLayout;
