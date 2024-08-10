import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';

import ProfileForm from '../../molecules/user-profile/profile-form';
import Contact from '../../molecules/user-profile/contact';
import ProfileImage from '../../molecules/user-profile/profile-image';

const UserProfile = () => {
	return (
		<section className="flex px-24 py-16 gap-24">
			<TabGroup as="section" className="flex-1">
				<TabList as="section" className="flex gap-12">
					<Tab
						as="section"
						className="rounded-full data-[selected]:font-semibold py-16 px-24 focus:outline-none data-[selected]:bg-primary-1 data-[selected]:text-white min-w-[160px] cursor-pointer text-center"
					>
						My Profile
					</Tab>
					<Tab
						as="section"
						className="rounded-full data-[selected]:font-semibold py-16 px-24 focus:outline-none data-[selected]:bg-primary-1 data-[selected]:text-white min-w-[160px] cursor-pointer text-center"
					>
						Doctors
					</Tab>
					<Tab
						as="section"
						className="rounded-full data-[selected]:font-semibold py-16 px-24 focus:outline-none data-[selected]:bg-primary-1 data-[selected]:text-white min-w-[160px] cursor-pointer text-center"
					>
						Staff
					</Tab>
					<Tab
						as="section"
						className="rounded-full data-[selected]:font-semibold py-16 px-24 focus:outline-none data-[selected]:bg-primary-1 data-[selected]:text-white min-w-[160px] cursor-pointer text-center"
					>
						Contact Us
					</Tab>
				</TabList>
				<TabPanels as="section" className="px-16 mt-32">
					<TabPanel as="section">
						<ProfileForm />
					</TabPanel>
					<TabPanel as="section">Content 2</TabPanel>
					<TabPanel as="section">Content 3</TabPanel>
					<TabPanel as="section">
						<Contact />
					</TabPanel>
				</TabPanels>
			</TabGroup>
			<ProfileImage />
		</section>
	);
};

export default UserProfile;
