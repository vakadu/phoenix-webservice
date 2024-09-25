'use client';

import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ParsedUrlQuery } from 'querystring';

export interface UseRouterQuery {
	query: ParsedUrlQuery;
	back: () => void;
	router: any;
	pathname: string;
}

export function useRouterQuery() {
	const router = useRouter() as any;
	const searchParams = useSearchParams();
	const pathName = usePathname();

	const updateQueryParams = ({ key, value }: { key: string; value: string }) => {
		const currentParams = new URLSearchParams(searchParams.toString());
		currentParams.set(key, value);
		router.replace(`${pathName}?${currentParams.toString()}`, { scroll: true });
	};

	return {
		query: useParams(),
		router,
		back: router.back,
		pathname: pathName,
		params: searchParams,
		updateQueryParams,
	};
}

export default useRouterQuery;
