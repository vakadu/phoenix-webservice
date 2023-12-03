import React from 'react';
import { useInView } from '@webservices/hooks';

/* eslint-disable-next-line */
export interface LazyLoadProps {
	children: React.ReactNode;
}

export function LazyLoad(props: LazyLoadProps) {
	const { children } = props;
	const { ref, inView } = useInView({
        threshold: 0,
        triggerOnce: true
    });	

	return <section ref={ref}>{inView && children}</section>;
}

export default LazyLoad;
