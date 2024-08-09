import { pemilyStore, resetUser } from '@webservices/slices';

export const logout = () => {
	localStorage.removeItem('persist:root');
	pemilyStore.dispatch(resetUser());
};
