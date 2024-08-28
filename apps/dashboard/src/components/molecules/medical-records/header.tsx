'use client';

import { format } from 'date-fns';
import { useState } from 'react';

import { Button, Days } from '@webservices/ui';
import { UploadIcon } from '@webservices/icons';
import { firstCharCapital } from '@webservices/helpers';
import FilterItem, { FilterIcon, FilterLabel } from '../../atoms/filter-item';
import { useFilter } from '../../../context/filter-context';
import { medicalRecordsFilters } from '@webservices/constants';

const Header = () => {
	const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
	const filterRecords = useFilter();

	const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
		event.stopPropagation();
		const buttonElement = (event.target as HTMLElement).closest('button');
		const id = buttonElement?.getAttribute('data-id') as string;
		if (id) {
			filterRecords?.handleRecord(id);
		}
	};

	return (
		<section className="px-16 pt-24">
			<section className="sticky top-0">
				<Days selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
				<section className="flex justify-between items-center mt-32">
					<section onClick={handleClick} className="flex gap-12">
						{medicalRecordsFilters.map((record) => {
							const active = filterRecords?.activeRecord === record.value;
							return (
								<FilterItem active={active} value={record.value} key={record.id}>
									<FilterIcon active={active}>{record.icon()}</FilterIcon>
									<FilterLabel active={active}>{record.label}</FilterLabel>
								</FilterItem>
							);
						})}
					</section>
					<Button variant="ghost" className="min-w-[230px]">
						<UploadIcon height={28} />
						<span className="font-semibold">
							Upload {firstCharCapital(filterRecords?.activeRecord as string)}
						</span>
					</Button>
				</section>
			</section>
		</section>
	);
};

export default Header;
