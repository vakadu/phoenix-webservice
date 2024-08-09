import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';

import ProfileForm from './profile-form';

const UserProfileTabs = () => {
	return (
		<TabGroup className="bg-white px-24 py-16">
			<TabList className="flex gap-12">
				<Tab className="rounded-full data-[selected]:font-semibold py-16 px-24 focus:outline-none data-[selected]:bg-primary-1 data-[selected]:text-white min-w-[160px]">
					My Profile
				</Tab>
				<Tab className="rounded-full data-[selected]:font-semibold py-16 px-24 focus:outline-none data-[selected]:bg-primary-1 data-[selected]:text-white min-w-[160px]">
					Doctors
				</Tab>
				<Tab className="rounded-full data-[selected]:font-semibold py-16 px-24 focus:outline-none data-[selected]:bg-primary-1 data-[selected]:text-white min-w-[160px]">
					Staff
				</Tab>
				<Tab className="rounded-full data-[selected]:font-semibold py-16 px-24 focus:outline-none data-[selected]:bg-primary-1 data-[selected]:text-white min-w-[160px]">
					Contact Us
				</Tab>
			</TabList>
			<TabPanels className="px-16 mt-32">
				<TabPanel>
					<ProfileForm />
				</TabPanel>
				<TabPanel>Content 2</TabPanel>
				<TabPanel>Content 3</TabPanel>
			</TabPanels>
		</TabGroup>
	);
};

export default UserProfileTabs;
