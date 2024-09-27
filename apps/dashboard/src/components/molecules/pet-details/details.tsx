'use client';

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import dynamic from 'next/dynamic';

import { PrescriptionIcon } from '@webservices/icons';
import Loading from '../../atoms/loading';
import { useState } from 'react';
import { RecordSidebarProvider } from '../../../context/record-sidebar-context';
import UploadBtn from './upload-btn';

const MedicalRecords = dynamic(() => import('./medical-records'), {
	loading: () => <Loading />,
});

const VaccinationRecords = dynamic(() => import('./vaccination-records'), {
	loading: () => <Loading />,
});

const Followup = dynamic(() => import('./follow-up'), {
	loading: () => <Loading />,
});

export default function PetTabs() {
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [activeRecord, setActiveRecord] = useState('medical');
	const tabClass =
		'data-[selected]:font-semibold focus:outline-none cursor-pointer text-center data-[selected]:border-b-2 data-[selected]:border-purple flex items-center gap-8 pb-6 ';

	const onChange = (index: number) => {
		if (index === 0) {
			setActiveRecord('medical');
		} else if (index === 1) {
			setActiveRecord('vaccination');
		} else if (index === 2) {
			setActiveRecord('followup');
		}
		setSelectedIndex(index);
	};

	return (
		<RecordSidebarProvider record={activeRecord}>
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
										<span
											className={`${selected ? 'text-purple' : ''} text-14`}
										>
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
										<span
											className={`${selected ? 'text-purple' : ''} text-14`}
										>
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
										<span
											className={`${selected ? 'text-purple' : ''} text-14`}
										>
											Follow Ups
										</span>
									</>
								)}
							</Tab>
						</div>
						<UploadBtn record={activeRecord} />
					</TabList>
					<TabPanels className="mt-6">
						<TabPanel>
							<MedicalRecords />
						</TabPanel>
						<TabPanel>
							<VaccinationRecords />
						</TabPanel>
						<TabPanel>
							<Followup />
						</TabPanel>
					</TabPanels>
				</TabGroup>
			</div>
		</RecordSidebarProvider>
	);
}
