'use client';

import { useState } from 'react';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';

import { PrescriptionIcon } from '@webservices/icons';
import { MedicalRecord } from '@webservices/ui';

export default function PetTabs() {
	const [selectedIndex, setSelectedIndex] = useState(0);
	const tabClass =
		'data-[selected]:font-semibold focus:outline-none cursor-pointer text-center data-[selected]:border-b-2 data-[selected]:border-purple flex items-center gap-8 pb-6 ';

	const onChange = (index: number) => {
		setSelectedIndex(index);
	};

	return (
		<div className="col-span-2 bg-white py-32 px-16 rounded-[16px]">
			<TabGroup
				selectedIndex={selectedIndex}
				onChange={onChange}
				className="flex-1 overflow-hidden px-16"
			>
				<TabList className="flex justify-between items-center">
					<div className="flex gap-32">
						<Tab className={tabClass}>
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
						<Tab className={tabClass}>
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
						<Tab className={tabClass}>
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
					{/* <UploadBtn record={activeRecord} /> */}
				</TabList>
				<TabPanels className="mt-6">
					<TabPanel>
						<MedicalRecord showDays />
					</TabPanel>
					<TabPanel></TabPanel>
					<TabPanel></TabPanel>
				</TabPanels>
			</TabGroup>
		</div>
	);
}
