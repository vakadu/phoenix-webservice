'use client';

import { Button, DaysItem } from '@webservices/ui';
import { UploadIcon } from '@webservices/icons';
import { firstCharCapital } from '@webservices/helpers';
import FilterItem, { FilterIcon, FilterLabel } from '../../atoms/filter-item';
import {
	follwupFilters,
	medicalRecordsFilters,
	vaccinationClinicFilters,
} from '@webservices/constants';
import { useRecordSidebar } from '../../../context/record-sidebar-context';
import { useRouterQuery } from '@webservices/hooks';

const Header = () => {
	const {
		showSidebar,
		handleActiveType,
		handleSidebar,
		activeRecord,
		handleFilter,
		selectedDate,
		handleDate,
		recordType,
		handleActiveParent,
		handleActivePet,
	} = useRecordSidebar();
	const { params } = useRouterQuery();
	const petId = params.get('petId') || undefined;
	const parentId = params.get('parentId') || undefined;
	const filters =
		recordType === 'medical'
			? medicalRecordsFilters
			: recordType === 'vaccination'
			? vaccinationClinicFilters
			: follwupFilters;

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
		if (petId && parentId) {
			handleActiveParent(parentId);
			handleActivePet(petId);
			if (recordType === 'vaccination') {
				handleActiveType('vaccination');
			} else if (recordType === 'followup') {
				handleActiveType('followup');
			} else {
				handleActiveType('upload');
			}
		} else {
			handleActiveType('pet-parents');
		}
	};

	return (
		<section className="px-16 mt-6 sticky top-[74px] z-[3] bg-white py-8 shadow-base rounded-8">
			<section className="">
				{!petId && <DaysItem selectedDate={selectedDate} handleDate={handleDate} />}
				<section className="flex justify-between items-center mt-12">
					<section onClick={handleClick} className="flex gap-12">
						{filters.map((record) => {
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
						{recordType === 'medical' && (
							<>
								<UploadIcon height={32} width={24} />
								<span className="font-black tracking-[-0.41px]">
									Upload {firstCharCapital(activeRecord as string)}
								</span>
							</>
						)}
						{recordType === 'vaccination' && (
							<span className="font-black tracking-[-0.41px]">Add Vaccination</span>
						)}
						{recordType === 'followup' && (
							<span className="font-black tracking-[-0.41px]">Add Followup</span>
						)}
					</Button>
				</section>
			</section>
		</section>
	);
};

export default Header;
