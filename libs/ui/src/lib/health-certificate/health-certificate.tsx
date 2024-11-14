'use client';

import { useEffect, useState } from 'react';
import Select, { SingleValue } from 'react-select';
import Link from 'next/link';

import { certificateData } from '@webservices/constants';
import { customSelectBoxStyles } from '@webservices/helpers';
import Certificate from './components/records';
import useCertificate from './hooks/use-certificate';
import { useRouterQuery } from '@webservices/hooks';

interface OptionType {
	value: string;
	label: string;
}

export function HealthCertificate() {
	const [selectedRecord, setRecord] = useState<SingleValue<OptionType>>(certificateData?.[0]);
	const { query } = useRouterQuery();
	const petId = query?.id as string;

	const { refetch } = useCertificate({ activeFilter: selectedRecord?.value as string });

	useEffect(() => {
		refetch();
	}, []);

	const handleChange = (option: SingleValue<OptionType>) => {
		setRecord(option);
	};

	return (
		<div>
			<div className="flex justify-between items-center my-12">
				<div className="min-w-[320px]">
					<label className="text-14 leading-24">Choose a certificate</label>
					<Select
						options={certificateData}
						className="h-[52px] react-select-container"
						classNamePrefix="react-select"
						styles={customSelectBoxStyles}
						onChange={handleChange}
						value={selectedRecord}
					/>
				</div>
				<Link
					className="bg-primary-1 px-16 py-12 rounded-8"
					href={`/certificate-pdf/${petId}?type=${selectedRecord?.value}`}
				>
					<span className="text-14 font-bold text-white">
						Upload {selectedRecord?.label}
					</span>
				</Link>
			</div>
			<Certificate activeFilter={selectedRecord?.value as string} />
		</div>
	);
}

export default HealthCertificate;
