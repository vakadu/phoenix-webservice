'use client';

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import dynamic from 'next/dynamic';

import { PrescriptionIcon } from '@webservices/icons';
import Loading from '../../atoms/loading';
import { useSelector } from 'react-redux';
import { PemilyRootState } from '@webservices/slices';
import { Roles } from '@webservices/primitives';

const PersonalDetailsForm = dynamic(() => import('../../molecules/user-profile/personal-details'), {
	loading: () => <Loading />,
});

const AddressForm = dynamic(() => import('../../molecules/user-profile/address'), {
	loading: () => <Loading />,
});

const BusinessForm = dynamic(() => import('../../molecules/user-profile/business-details'), {
	loading: () => <Loading />,
});

const Contact = dynamic(() => import('../../molecules/user-profile/contact'), {
	loading: () => <Loading />,
});

export default function UserTabs() {
	const tabClass =
		'data-[selected]:font-semibold focus:outline-none cursor-pointer text-center data-[selected]:border-b-2 data-[selected]:border-purple flex items-center gap-8 pb-6 ';
	const authState = useSelector((state: PemilyRootState) => state.auth);

	return (
		<div className="col-span-2 bg-white py-32 px-16 rounded-[16px]">
			<TabGroup className="flex-1 overflow-hidden px-16">
				<TabList className="flex gap-32">
					<Tab className={tabClass}>
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
					{authState.role === Roles.Clinic && (
						<Tab className={tabClass}>
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
						<Tab className={tabClass}>
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
					<Tab className={tabClass}>
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
					<TabPanel>
						<PersonalDetailsForm />
					</TabPanel>
					<TabPanel>
						<AddressForm />
					</TabPanel>
					<TabPanel>
						<BusinessForm />
					</TabPanel>
					<TabPanel>
						<Contact />
					</TabPanel>
				</TabPanels>
			</TabGroup>
		</div>
	);
}
