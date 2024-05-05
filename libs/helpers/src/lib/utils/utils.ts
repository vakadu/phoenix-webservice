export const shimmer = () => `
<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
  <rect width="100" height="100" style="fill:rgb(211,211,211);" />
</svg>`;

export const toBase64 = (str: string) =>
	typeof window === 'undefined' ? Buffer.from(str).toString('base64') : window.btoa(str);

export const formatPrice = (num: number) => {
	return new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 21 }).format(num);
};

export const stickyNav = () => {
	const offset = window.scrollY;
	const sticky = document.querySelectorAll('.header');
	sticky.forEach((stick) => {
		if (stick) {
			if (offset > 100) {
				stick.classList.add('header-in', 'sticky-header');
			} else {
				stick.classList.remove('header-in', 'sticky-header');
			}
		}
	});
};
