'use client';

import { useState } from 'react';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';

import { PrescriptionIcon } from '@webservices/icons';
import { Followup, MedicalRecord, Vaccination } from '@webservices/ui';
import { DashboardTypes, USER_EVENTS } from '@webservices/primitives';
import { logEvent } from '@webservices/services';

export default function PetTabs() {
	const [selectedIndex, setSelectedIndex] = useState(0);
	const tabClass =
		'data-[selected]:font-semibold focus:outline-none cursor-pointer text-center data-[selected]:border-b-2 data-[selected]:border-purple flex items-center gap-8 pb-6 ';
	// const { updateQueryParams } = useRouterQuery();

	// useEffect(() => {
	// 	updateQueryParams({ key: 'type', value: DashboardTypes.MedicalRecord });
	// }, []);

	const updateType = (index: number) => {
		switch (index) {
			case 0:
				return DashboardTypes.MedicalRecord;
			case 1:
				return DashboardTypes.Vaccination;
			case 2:
				return DashboardTypes.Followup;
			default:
				return DashboardTypes.MedicalRecord;
		}
	};

	const onChange = (index: number) => {
		setSelectedIndex(index);
		// updateQueryParams({ key: 'type', value: updateType(index) });
	};

	const handleTab = (tab: string) => {
		logEvent({
			name: USER_EVENTS.PET_PROFILE_TABS,
			events: {
				tab,
			},
		});
	};

	return (
		<div className="col-span-3 bg-white py-32 px-16 rounded-[16px]">
			<TabGroup
				selectedIndex={selectedIndex}
				onChange={onChange}
				className="flex-1 overflow-hidden px-16"
			>
				<TabList className="flex justify-between items-center">
					<div className="flex gap-32">
						<Tab onClick={() => handleTab('medical-records')} className={tabClass}>
							{({ selected }) => (
								<>
									<PrescriptionIcon
										className={selected ? 'text-purple' : ''}
										width={18}
										height={18}
									/>
									<span className={`${selected ? 'text-purple' : ''} text-14`}>
										Medical Records
									</span>
								</>
							)}
						</Tab>
						<Tab onClick={() => handleTab('vaccinations')} className={tabClass}>
							{({ selected }) => (
								<>
									<PrescriptionIcon
										className={selected ? 'text-purple' : ''}
										width={18}
										height={18}
									/>
									<span className={`${selected ? 'text-purple' : ''} text-14`}>
										Vaccination Records
									</span>
								</>
							)}
						</Tab>
						<Tab onClick={() => handleTab('follow-ups')} className={tabClass}>
							{({ selected }) => (
								<>
									<PrescriptionIcon
										className={selected ? 'text-purple' : ''}
										width={18}
										height={18}
									/>
									<span className={`${selected ? 'text-purple' : ''} text-14`}>
										Follow Ups
									</span>
								</>
							)}
						</Tab>
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
				</TabPanels>
			</TabGroup>
		</div>
	);
}
