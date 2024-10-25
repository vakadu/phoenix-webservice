'use client';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { PemilyRootState } from '@webservices/slices';
import { useIsMobile, useRouterQuery } from '@webservices/hooks';
import MobileOnly from '../../core/ui/mobile-only';
import { routes } from '../../core/routes';
import { RouteList } from '../../core/routes/constants';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
	const authState = useSelector((state: PemilyRootState) => state.auth);
	const { router } = useRouterQuery();
	const { isDesktop } = useIsMobile();

	useEffect(() => {
		if (authState.loggedIn) {
			router.push(routes.get(RouteList.MEDICAL_RECORDS));
		}
	}, [authState.loggedIn, router]);

	if (!isDesktop) {
		return <MobileOnly />;
	}

	return <>{children}</>;
};

export default AuthLayout;
