'use client';

import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

import { PemilyRootState } from '@webservices/slices';
import { useIsMobile, useRouterQuery } from '@webservices/hooks';
import MobileOnly from '../../components/atoms/mobile-only';
import { DashboardLayoutHeader, DashboardLayoutSidebar } from '@webservices/ui';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
	const authState = useSelector((state: PemilyRootState) => state.auth);
	const { router, pathname } = useRouterQuery();
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
			<DashboardLayoutSidebar />
			<motion.div
				key={pathname}
				initial="pageInitial"
				animate="pageAnimate"
				exit="pageExit"
				variants={{
					pageInitial: {
						opacity: 0,
						y: 50,
					},
					pageAnimate: {
						opacity: 1,
						y: 0,
					},
					pageExit: {
						opacity: 0,
						y: -50,
					},
				}}
				transition={{
					type: 'tween',
					ease: 'easeInOut',
					duration: 0.5,
				}}
			>
				<div className={`${sidebarClasses} min-h-[calc(100vh-72px)]`}>{children}</div>
			</motion.div>
		</section>
	);
};

export default DashboardLayout;
