'use client';

import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { PemilyRootState } from '@webservices/slices';
import { useIsMobile, useRouterQuery } from '@webservices/hooks';
import Header from '../../components/organisms/layout/header';
import Sidebar from '../../components/organisms/layout/sidebar';
import MobileOnly from '../../components/atoms/mobile-only';
import { DashboardLayoutHeader } from '@webservices/ui';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
	const authState = useSelector((state: PemilyRootState) => state.auth);
	const { router } = useRouterQuery();
	const { isDesktop } = useIsMobile();

	useEffect(() => {
		if (!authState.loggedIn) {
			router.push('/');
		}
	}, [authState.loggedIn, router]);

	const sidebarClasses = useMemo(() => {
		return 'ml-[282px] transition-all duration-150 mr-16';
	}, []);

	if (!isDesktop) {
		return <MobileOnly />;
	}

	return (
		<section className="max-w-screen-2xl">
			<DashboardLayoutHeader />
			{/* <Header sidebarClasses={sidebarClasses} />
			<Sidebar /> */}
			<div className={`${sidebarClasses} min-h-[calc(100vh-72px)]`}>{children}</div>
		</section>
	);
};

export default DashboardLayout;
