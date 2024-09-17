'use client';

import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ParsedUrlQuery } from 'querystring';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UseRouterQuery {
	query: ParsedUrlQuery;
	back: () => void;
	router: any;
	pathname: string;
}

export function useRouterQuery() {
	const router = useRouter() as any;

	return {
		query: useParams(),
		router,
		back: router.back,
		pathname: usePathname(),
		params: useSearchParams(),
	};
}

export default useRouterQuery;
