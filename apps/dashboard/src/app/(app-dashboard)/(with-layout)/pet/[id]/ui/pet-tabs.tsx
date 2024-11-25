import { TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';

import { Followup, MedicalRecord, Vaccination, HealthCertificate } from '@webservices/ui';
import TabItem from './tab';

export default function PetTabs() {
	return (
		<div className="col-span-3 bg-white py-32 px-16 rounded-[16px]">
			<TabGroup className="flex-1 overflow-hidden px-16">
				<TabList className="flex justify-between items-center">
					<div className="flex gap-32">
						<TabItem tab="medical-records" title="Medical Records" />
						<TabItem tab="vaccinations" title="Vaccination Records" />
						<TabItem tab="follow-ups" title="Follow Ups" />
						<TabItem tab="health-certificate" title="Health Certificate" />
					</div>
				</TabList>
				<TabPanels className="mt-6">
					<TabPanel>
						<MedicalRecord />
					</TabPanel>
					<TabPanel>
						<Vaccination />
					</TabPanel>
					<TabPanel>
						<Followup />
					</TabPanel>
					<TabPanel>
						<HealthCertificate />
					</TabPanel>
				</TabPanels>
			</TabGroup>
		</div>
	);
}
