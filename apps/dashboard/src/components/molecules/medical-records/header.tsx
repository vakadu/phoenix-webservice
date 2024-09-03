'use client';

import { Button, DaysCalender, DaysHeader, DaysItem } from '@webservices/ui';
import { CalenderIcon, UploadIcon } from '@webservices/icons';
import { firstCharCapital } from '@webservices/helpers';
import FilterItem, { FilterIcon, FilterLabel } from '../../atoms/filter-item';
import { medicalRecordsFilters } from '@webservices/constants';
import { useRecordSidebar } from '../../../context/record-sidebar-context';
import { useRecordHeader } from '../../../context/record-header-context';

const Header = () => {
	const { showSidebar, handleActiveType, handleSidebar } = useRecordSidebar();
	const { activeRecord, handleFilter, selectedDate, handleDate } = useRecordHeader();
	console.log(activeRecord, handleFilter);

	const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
		event.stopPropagation();
		const buttonElement = (event.target as HTMLElement).closest('button');
		const id = buttonElement?.getAttribute('data-id') as string;
		if (id) {
			handleFilter(id);
		}
	};

	const onSidebarChange = () => {
		handleSidebar(!showSidebar);
		handleActiveType('pet-parents');
	};

	return (
		<section className="px-16 pt-24">
			<section className="sticky top-0">
				<DaysItem>
					<DaysHeader selectedDate={selectedDate as string} handleDate={handleDate} />
					<DaysCalender>
						<CalenderIcon />
					</DaysCalender>
				</DaysItem>
				<section className="flex justify-between items-center mt-32">
					<section onClick={handleClick} className="flex gap-12">
						{medicalRecordsFilters.map((record) => {
							const active = activeRecord === record.value;
							return (
								<FilterItem active={active} value={record.value} key={record.id}>
									<FilterIcon active={active}>{record.icon()}</FilterIcon>
									<FilterLabel active={active}>{record.label}</FilterLabel>
								</FilterItem>
							);
						})}
					</section>
					<Button
						onClick={onSidebarChange}
						variant="ghost"
						className="min-w-[230px] rounded-10 gap-16"
					>
						<UploadIcon height={32} width={24} />
						<span className="font-black tracking-[-0.41px]">
							Upload {firstCharCapital(activeRecord as string)}
						</span>
					</Button>
				</section>
			</section>
		</section>
	);
};

export default Header;
