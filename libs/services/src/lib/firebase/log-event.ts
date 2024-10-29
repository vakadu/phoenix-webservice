import { logEvent as eventLog } from 'firebase/analytics';

import { analytics } from './firebase';
import { PemilyRootState, pemilyStore } from '@webservices/slices';
import { getBrowserType } from '@webservices/helpers';

const logEvent = ({ name, events }: { name: string; events?: { [key: string]: any } }) => {
	const authState = (pemilyStore.getState() as PemilyRootState).auth;
	const browserType = getBrowserType();
	const defaultEvents = {
		userId: authState.userId,
		mobile: authState.mobile,
		name: authState.name,
		active: authState.active,
		gender: authState.gender,
		role: authState.role,
		browser: browserType,
	};

	if (analytics) {
		eventLog(analytics, name, {
			...defaultEvents,
			...events,
		});
	}
};

export { logEvent };
