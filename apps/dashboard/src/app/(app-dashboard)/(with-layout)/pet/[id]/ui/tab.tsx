'use client';

import { Tab } from '@headlessui/react';

import { PrescriptionIcon } from '@webservices/icons';
import { USER_EVENTS } from '@webservices/primitives';
import { logEvent } from '@webservices/services';

export default function TabItem({ tab, title }: { tab: string; title: string }) {
	const tabClass =
		'data-[selected]:font-semibold focus:outline-none cursor-pointer text-center data-[selected]:border-b-2 data-[selected]:border-purple flex items-center gap-8 pb-6 ';

	const handleTab = (tab: string) => {
		logEvent({
			name: USER_EVENTS.PET_PROFILE_TABS,
			events: {
				tab,
			},
		});
	};

	return (
		<Tab onClick={() => handleTab(tab)} className={tabClass}>
			{({ selected }) => (
				<>
					<PrescriptionIcon
						className={selected ? 'text-purple' : ''}
						width={18}
						height={18}
					/>
					<span className={`${selected ? 'text-purple' : ''} text-14`}>{title}</span>
				</>
			)}
		</Tab>
	);
}
