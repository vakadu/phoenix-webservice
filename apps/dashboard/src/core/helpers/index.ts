import { pemilyStore, resetUser } from '@webservices/slices';
import { format } from 'date-fns';

export const logout = () => {
	localStorage.removeItem('persist:root');
	pemilyStore.dispatch(resetUser());
};

export const convertDates = (dates: Date[] | Date) => {
	const isArray = Array.isArray(dates);
	if (isArray) {
		const mappedDates = dates.map((date) => {
			return format(date, 'yyyy-MM-dd');
		});
		return mappedDates;
	} else {
		return format(dates, 'yyyy-MM-dd');
	}
};
