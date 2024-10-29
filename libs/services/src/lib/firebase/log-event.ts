import { logEvent as eventLog } from 'firebase/analytics';

import { analytics } from './firebase';
import { PemilyRootState, pemilyStore } from '@webservices/slices';
import { getBrowserType } from '@webservices/helpers';

type IEventParams = {
	name: string;
	events?: Record<string, any>;
};

const logEvent = ({ name, events }: { name: string; events?: { [key: string]: any } }) => {
	const authState = (pemilyStore.getState() as PemilyRootState).auth;
	const browserType = getBrowserType();
	let defaultEvents: Record<string, any> = {
		browser: browserType,
		mode: process.env.mode || 'unknown',
	};

	if (authState.loggedIn) {
		defaultEvents = {
			...defaultEvents,
			userId: authState.userId,
			mobile: authState.mobile,
			name: authState.name,
			active: authState.active,
			gender: authState.gender,
			role: authState.role,
		};
	} else {
		defaultEvents = {
			...defaultEvents,
			userId: crypto.randomUUID(),
		};
	}

	if (analytics) {
		eventLog(analytics, name, {
			...defaultEvents,
			...events,
		});
	}
};

export { logEvent };
