import { pemilyStore, resetUser } from '@webservices/slices';

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

export const phoneValidator = /^[6-9]\d{9}$/;

export const otpValidator = /^[0-9]{1,6}$/;

export const pemilyyLogout = () => {
	localStorage.removeItem('persist:root');
	pemilyStore.dispatch(resetUser());
};

export const createFormDataForImage = (
	photo: File,
	keyName: string,
	body?: Record<string, any>
) => {
	const data = new FormData();
	data.append(keyName, photo);

	if (body) {
		for (const key in body) {
			if (Object.prototype.hasOwnProperty.call(body, key)) {
				const value = body[key];
				// Append only non-null, non-undefined, non-empty values
				if (value !== null && value !== undefined && value !== '') {
					data.append(key, value);
				}
			}
		}
	}

	return data;
};

export const createFormDataForDocument = (
	document?: File,
	keyName?: string | null,
	body?: Record<string, any>
) => {
	const data = new FormData();
	if (keyName && document) {
		data.append(keyName, document);
	}

	if (body) {
		for (const key in body) {
			if (Object.prototype.hasOwnProperty.call(body, key)) {
				const value = body[key];
				// Check if the value is not null, undefined, or an empty string
				if (value !== null && value !== undefined && value !== '') {
					data.append(key, value);
				}
			}
		}
	}

	return data;
};

export const firstCharCapital = (str: string) => {
	if (str && str !== '') {
		const first = str.slice(0, 1).toUpperCase();
		const remaining = str.slice(1).toLowerCase();

		return first + remaining;
	}

	return '';
};

export const debounce = <T extends (...args: any[]) => void>(func: T, delay: number) => {
	let timer: NodeJS.Timeout | undefined;
	return (...args: Parameters<T>) => {
		if (timer) clearTimeout(timer);
		timer = setTimeout(() => {
			func(...args);
		}, delay);
	};
};
