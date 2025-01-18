'use client';

import { Button, ImagePlaceholder } from '@webservices/ui';
import { useState } from 'react';
import { useVaccinationExcel } from './api/analytics';
import { usePemilyAppSelector } from '@webservices/slices';
import { Roles } from '@webservices/primitives';

const months = [
	{ value: 1, label: 'January' },
	{ value: 2, label: 'February' },
	{ value: 3, label: 'March' },
	{ value: 4, label: 'April' },
	{ value: 5, label: 'May' },
	{ value: 6, label: 'June' },
	{ value: 7, label: 'July' },
	{ value: 8, label: 'August' },
	{ value: 9, label: 'September' },
	{ value: 10, label: 'October' },
	{ value: 11, label: 'November' },
	{ value: 12, label: 'December' },
];

const years = [
	{ value: 2024, label: '2024' },
	{ value: 2025, label: '2025' },
];

const lists = [
	{
		l1: 'Transparency',
		l2: 'Your data belongs to you, and we take pride in making it accessible.',
	},
	{
		l1: 'Security',
		l2: 'Your data is secure. Avoid multiple downloads and sharing with untrusted sources.',
	},
	{
		l1: 'Notifications',
		l2: 'Admins receive WhatsApp alerts for every download.',
	},
	{
		l1: 'User-Friendly',
		l2: 'Data is available in a simple and easy-to-use Excel format.',
	},
	{
		l1: 'Growth-Focused',
		l2: 'Gain monthly insights to support growth and better planning.',
	},
];

export default function Page() {
	const [month, setMonth] = useState(1);
	const [year, setYear] = useState(2025);
	const { mutateAsync: vaccinationExcel, isPending } = useVaccinationExcel();
	const auth = usePemilyAppSelector((state) => state.auth);

	const handleSubmit = async () => {
		const payload = {
			type: 'VACCINATION',
			year,
			month,
		};
		const response = await vaccinationExcel(payload);
		if (response.status === 'SUCCESS' && response?.data?.signedUrl) {
			window.location.href = response.data.signedUrl;
			setYear(2025);
			setMonth(1);
		}
	};

	return (
		<section className="bg-white rounded-8">
			<div className="grid grid-cols-5">
				<div className="col-span-2 p-16">
					<h1 className="text-[30px] font-semibold">Data For Your Growth & Trust</h1>
					<ul className="pl-6 space-y-2 text-gray-800 py-16">
						{lists.map((list, i) => (
							<li key={i} className="list-none relative pl-12 leading-18 py-6">
								<span className="absolute left-0 top-12 w-6 h-6 rounded-full bg-black-1" />
								<span className="text-[16px] font-semibold">{list?.l1}: </span>
								<span className="text-[14px]">{list?.l2}</span>
							</li>
						))}
					</ul>
					<div className="mt-24">
						<div className="grid grid-cols-2 gap-24">
							<div className="col-span-1 flex flex-col gap-6">
								<label className="text-12 font-medium">Select Year</label>
								<select
									value={year}
									onChange={(e) => setYear(Number(e.target.value))}
									className="border border-grey-light rounded-8 py-8 px-6 outline-none text-14"
								>
									{years.map((year) => {
										return (
											<option key={year.value} value={year.value}>
												{year.label}
											</option>
										);
									})}
								</select>
							</div>
							<div className="col-span-1 flex flex-col gap-6">
								<label className="text-12 font-medium">Select Month</label>
								<select
									value={month}
									onChange={(e) => setMonth(Number(e.target.value))}
									className="border border-grey-light rounded-8 py-8 px-6 outline-none text-14"
								>
									{months.map((month) => {
										return (
											<option key={month.value} value={month.value}>
												{month.label}
											</option>
										);
									})}
								</select>
							</div>
						</div>
						<Button
							disabled={isPending || auth.role === Roles.Staff}
							isLoading={isPending}
							onClick={handleSubmit}
							className="mt-24 w-full"
						>
							<span className="text-[20px] font-semibold">Download</span>
						</Button>
					</div>
				</div>
				<div className="col-span-3">
					<ImagePlaceholder
						containerClasses="w-full h-full"
						imageClasses="object-cover"
						src="/images/home-bg.jpg"
					/>
				</div>
			</div>
		</section>
	);
}
