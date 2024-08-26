'use client';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { PemilyRootState } from '@webservices/slices';
import { useRouterQuery } from '@webservices/hooks';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
	const authState = useSelector((state: PemilyRootState) => state.auth);
	const { router } = useRouterQuery();

	useEffect(() => {
		if (authState.loggedIn) {
			router.push('/medical-records');
		}
	}, [authState.loggedIn, router]);

	return <>{children}</>;
};

export default AuthLayout;
