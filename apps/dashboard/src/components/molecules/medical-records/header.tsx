'use client';

import { Button, DaysCalender, DaysHeader, DaysItem } from '@webservices/ui';
import { CalenderIcon, UploadIcon } from '@webservices/icons';
import { firstCharCapital } from '@webservices/helpers';
import FilterItem, { FilterIcon, FilterLabel } from '../../atoms/filter-item';
import { useRecordFilter } from '../../../context/record-filter-context';
import { medicalRecordsFilters } from '@webservices/constants';
import { useRecordDate } from '../../../context/record-date-context';
import { useRecordSidebar } from '../../../context/record-sidebar-context';

const Header = () => {
	const filterRecords = useRecordFilter();
	const filterDate = useRecordDate();
	const sidebar = useRecordSidebar();

	const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
		event.stopPropagation();
		const buttonElement = (event.target as HTMLElement).closest('button');
		const id = buttonElement?.getAttribute('data-id') as string;
		if (id) {
			filterRecords?.handleRecord(id);
		}
	};

	const handleSidebar = () => {
		sidebar?.handleSidebar(!sidebar.showSidebar);
		sidebar?.handleActiveType('pet-parents');
	};

	return (
		<section className="px-16 pt-24">
			<section className="sticky top-0">
				<DaysItem>
					<DaysHeader
						selectedDate={filterDate?.recordSelectedDate as string}
						handleDate={filterDate?.handleRecordSelectedDate as () => void}
					/>
					<DaysCalender>
						<CalenderIcon />
					</DaysCalender>
				</DaysItem>
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
					<Button onClick={handleSidebar} variant="ghost" className="min-w-[230px]">
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
