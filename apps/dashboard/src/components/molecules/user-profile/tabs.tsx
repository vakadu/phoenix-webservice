'use client';

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';

import { PrescriptionIcon } from '@webservices/icons';
import PersonalDetailsForm from '../../molecules/user-profile/personal-details';
import AddressForm from '../../molecules/user-profile/address';
import BusinessForm from '../../molecules/user-profile/business-details';
import Contact from '../../molecules/user-profile/contact';

export default function UserTabs() {
	const tabClass =
		'data-[selected]:font-semibold focus:outline-none cursor-pointer text-center data-[selected]:border-b-2 data-[selected]:border-purple flex items-center gap-8 pb-6 ';

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
