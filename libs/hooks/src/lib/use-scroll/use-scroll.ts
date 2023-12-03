"use client"

import { useState, useEffect, useRef } from 'react';
import throttle from 'lodash.throttle';

type ScrollData = {
	previousScrollTop: number;
	currentScrollTop: number;
};

export function useScroll(callback: (data: ScrollData) => void) {
	const [_, setScrollPosition] = useState<number>(0);
	const previousScrollTopRef = useRef<number>(0);

	const handleDocumentScrollThrottled = throttle(handleDocumentScroll, 250);

	useEffect(() => {
		window.addEventListener('scroll', handleDocumentScrollThrottled);
		
		return () => {
			window.removeEventListener('scroll', handleDocumentScrollThrottled);
		};
	}, [handleDocumentScrollThrottled]);

	function handleDocumentScroll() {
		const { scrollTop: currentScrollTop } = document.documentElement || document.body;

		setScrollPosition(currentScrollTop);

		const previousScrollTop = previousScrollTopRef.current;
		previousScrollTopRef.current = currentScrollTop;

		callback({ previousScrollTop, currentScrollTop });
	}
}

export default useScroll;
