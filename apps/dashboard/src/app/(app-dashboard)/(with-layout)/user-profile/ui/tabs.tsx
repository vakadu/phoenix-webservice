'use client';

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';

import { PrescriptionIcon } from '@webservices/icons';
import { PemilyRootState } from '@webservices/slices';
import { Roles, USER_EVENTS } from '@webservices/primitives';
import { Loading } from '@webservices/ui';
import { logEvent } from '@webservices/services';

const PersonalDetailsForm = dynamic(() => import('./personal-details'), {
	loading: () => <Loading />,
});

const AddressForm = dynamic(() => import('./address'), {
	loading: () => <Loading />,
});

const BusinessForm = dynamic(() => import('./business-details'), {
	loading: () => <Loading />,
});

const Contact = dynamic(() => import('./contact'), {
	loading: () => <Loading />,
});

export default function UserTabs() {
	const tabClass =
		'data-[selected]:font-semibold focus:outline-none cursor-pointer text-center data-[selected]:border-b-2 data-[selected]:border-purple flex items-center gap-8 pb-6 ';
	const authState = useSelector((state: PemilyRootState) => state.auth);

	const handleTab = (tab: string) => {
		logEvent({
			name: USER_EVENTS.USER_PROFILE_TAB,
			events: {
				tab,
			},
		});
	};

	return (
		<div className="col-span-2 bg-white py-32 px-16 rounded-[16px]">
			<TabGroup className="flex-1 overflow-hidden px-16">
				<TabList className="flex gap-32">
					{authState.role === Roles.Clinic && (
						<Tab onClick={() => handleTab('personal')} className={tabClass}>
							{({ selected }) => (
								<>
									<PrescriptionIcon
										className={selected ? 'text-purple' : ''}
										width={18}
										height={18}
									/>
									<span className={`${selected ? 'text-purple' : ''} text-14`}>
										Personal Details
									</span>
								</>
							)}
						</Tab>
					)}
					{authState.role === Roles.Clinic && (
						<Tab onClick={() => handleTab('prmiary-address')} className={tabClass}>
							{({ selected }) => (
								<>
									<PrescriptionIcon
										className={selected ? 'text-purple' : ''}
										width={18}
										height={18}
									/>
									<span className={`${selected ? 'text-purple' : ''} text-14`}>
										Primary Address
									</span>
								</>
							)}
						</Tab>
					)}
					{authState.role === Roles.Clinic && (
						<Tab onClick={() => handleTab('business-details')} className={tabClass}>
							{({ selected }) => (
								<>
									<PrescriptionIcon
										className={selected ? 'text-purple' : ''}
										width={18}
										height={18}
									/>
									<span className={`${selected ? 'text-purple' : ''} text-14`}>
										Business Details
									</span>
								</>
							)}
						</Tab>
					)}
					<Tab onClick={() => handleTab('contact-us')} className={tabClass}>
						{({ selected }) => (
							<>
								<PrescriptionIcon
									className={selected ? 'text-purple' : ''}
									width={18}
									height={18}
								/>
								<span className={`${selected ? 'text-purple' : ''} text-14`}>
									Contact Us
								</span>
							</>
						)}
					</Tab>
				</TabList>
				<TabPanels className="mt-32">
					{authState.role === Roles.Clinic && (
						<TabPanel>
							<PersonalDetailsForm />
						</TabPanel>
					)}
					{authState.role === Roles.Clinic && (
						<TabPanel>
							<AddressForm />
						</TabPanel>
					)}
					{authState.role === Roles.Clinic && (
						<TabPanel>
							<BusinessForm />
						</TabPanel>
					)}
					<TabPanel>
						<Contact />
					</TabPanel>
				</TabPanels>
			</TabGroup>
		</div>
	);
}
