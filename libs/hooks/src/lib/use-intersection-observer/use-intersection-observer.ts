"use client"

import { useState, useEffect, useRef } from 'react';

export function useIntersectionObserver() {
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const ref = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				setIsVisible(entry.isIntersecting);
			},
			{
				threshold: 0.1
			}
		);
	
		if (ref.current) {
		  	observer.observe(ref.current);
		}
	
		return () => {
			if (ref.current) {
				observer.unobserve(ref.current);
			}
		};
	}, [ref]);

	return [ref, isVisible] as const;
}

export default useIntersectionObserver;
