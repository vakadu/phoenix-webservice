'use client';

import { useState, useEffect } from 'react';

export function useGetBrowserType() {
	const [browser, setBrowser] = useState<string | null>(null);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const userAgent = navigator.userAgent;

			if (/chrome|chromium|crios/i.test(userAgent)) {
				setBrowser('Chrome');
			} else if (/firefox|fxios/i.test(userAgent)) {
				setBrowser('Firefox');
			} else if (/safari/i.test(userAgent) && !/chrome|chromium|crios/i.test(userAgent)) {
				setBrowser('Safari');
			} else if (/edg/i.test(userAgent)) {
				setBrowser('Edge');
			} else if (/msie|trident/i.test(userAgent)) {
				setBrowser('Internet Explorer');
			} else {
				setBrowser('Other');
			}
		}
	}, []);

	return browser;
}

export default useGetBrowserType;
