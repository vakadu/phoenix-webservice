'use client';

import { Button } from '@webservices/ui';
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

const Filters = () => {
	const {
		showSidebar,
		handleActiveType,
		handleSidebar,
		activeRecord,
		handleFilter,
		recordType,
		handleActiveParent,
		handleActivePet,
	} = useRecordSidebar();
	const { params, query } = useRouterQuery();
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
		if (query?.id && parentId) {
			handleActiveParent(parentId);
			handleActivePet(query?.id as string);
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
		<div className="">
			<div className="flex justify-between items-center mt-12">
				<div onClick={handleClick} className="flex gap-12">
					{filters.map((record) => {
						const active = activeRecord === record.value;
						return (
							<FilterItem active={active} value={record.value} key={record.id}>
								<FilterIcon active={active}>{record.icon()}</FilterIcon>
								<FilterLabel active={active}>{record.label}</FilterLabel>
							</FilterItem>
						);
					})}
				</div>
				{!query?.id && (
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
				)}
			</div>
		</div>
	);
};

export default Filters;
