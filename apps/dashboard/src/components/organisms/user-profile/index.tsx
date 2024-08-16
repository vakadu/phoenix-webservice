import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';

import Contact from '../../molecules/user-profile/contact';
import ProfileImage from '../../molecules/user-profile/profile-image';
import { PrescriptionIcon } from '@webservices/icons';
import PersonalDetailsForm from '../../molecules/user-profile/personal-details';
import AddressForm from '../../molecules/user-profile/address';
import BusinessForm from '../../molecules/user-profile/business-details';
import DoctorsList from '../../molecules/user-profile/doctors-list';

const UserProfile = () => {
	const tabClass =
		'rounded-full bg-white data-[selected]:font-semibold py-16 px-24 focus:outline-none data-[selected]:bg-purple data-[selected]:text-white min-w-[160px] cursor-pointer text-center border border-purple flex gap-12 items-center justify-center';

	return (
		<section className="">
			<ProfileImage />
			<section className="flex px-24 py-16 gap-32 mt-[124px]">
				<TabGroup as="section" className="flex-1 overflow-hidden">
					<TabList as="section" className="flex gap-24">
						<Tab as="section" className={tabClass}>
							<PrescriptionIcon width={18} height={18} />
							<span className="text-14">Personal Details</span>
						</Tab>
						<Tab as="section" className={tabClass}>
							<PrescriptionIcon width={18} height={18} />
							<span className="text-14">Primary Address</span>
						</Tab>
						<Tab as="section" className={tabClass}>
							<PrescriptionIcon width={18} height={18} />
							<span className="text-14">Business Details</span>
						</Tab>
						<Tab as="section" className={tabClass}>
							<PrescriptionIcon width={18} height={18} />
							<span className="text-14">My Doctors</span>
						</Tab>
						<Tab as="section" className={tabClass}>
							<PrescriptionIcon width={18} height={18} />
							<span className="text-14">My Staff</span>
						</Tab>
						<Tab as="section" className={tabClass}>
							<PrescriptionIcon width={18} height={18} />
							<span className="text-14">Contact Us</span>
						</Tab>
					</TabList>
					<TabPanels as="section" className="px-16 mt-32">
						<TabPanel as="section">
							<PersonalDetailsForm />
						</TabPanel>
						<TabPanel as="section">
							<AddressForm />
						</TabPanel>
						<TabPanel as="section">
							<BusinessForm />
						</TabPanel>
						<TabPanel as="section">
							<DoctorsList />
						</TabPanel>
						<TabPanel as="section">Content 3</TabPanel>
						<TabPanel as="section">
							<Contact />
						</TabPanel>
					</TabPanels>
				</TabGroup>
			</section>
		</section>
	);
};

export default UserProfile;
