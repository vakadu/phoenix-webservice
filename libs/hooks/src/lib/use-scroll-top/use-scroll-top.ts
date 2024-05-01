'use client';

import { useState, useEffect } from 'react';

export function useScrollTop(threshold = 300) {
	const [showScrollTopButton, setShowScrollTopButton] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			if (window.pageYOffset > threshold) {
				setShowScrollTopButton(true);
			} else {
				setShowScrollTopButton(false);
			}
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [threshold]);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	const scrollToBottom = () => {
		window.scrollTo({
			top: document.documentElement.scrollHeight,
			behavior: 'smooth',
		});
	};

	return { showScrollTopButton, scrollToTop, scrollToBottom };
}

export default useScrollTop;
