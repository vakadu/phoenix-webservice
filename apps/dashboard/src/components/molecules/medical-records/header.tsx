'use client';

import { Button, DaysItem } from '@webservices/ui';
import { UploadIcon } from '@webservices/icons';
import { firstCharCapital } from '@webservices/helpers';
import FilterItem, { FilterIcon, FilterLabel } from '../../atoms/filter-item';
import { medicalRecordsFilters } from '@webservices/constants';
import { useRecordSidebar } from '../../../context/record-sidebar-context';

const Header = () => {
	const {
		showSidebar,
		handleActiveType,
		handleSidebar,
		activeRecord,
		handleFilter,
		selectedDate,
		handleDate,
	} = useRecordSidebar();

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
		<section className="px-16 mt-6 sticky top-[74px] z-[10] bg-white py-8 mx-12 shadow-base rounded-8">
			<section className="">
				<DaysItem selectedDate={selectedDate as string} handleDate={handleDate} />
				<section className="flex justify-between items-center mt-12">
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
