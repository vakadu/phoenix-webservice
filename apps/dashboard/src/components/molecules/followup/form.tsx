import { useState } from 'react';
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
import Select, { SingleValue } from 'react-select';

import { followupData } from '@webservices/constants';
import { CloseIcon, DownIcon } from '@webservices/icons';
import { Button, ButtonWrapper, Dropdown } from '@webservices/ui';
import {
	useCreateFollowUpRecords,
	useGetFollowRecords,
	useGetFollowupList,
} from '@webservices/api';
import { convertDates } from '../../../helpers';
import { useRecordSidebar } from '../../../context/record-sidebar-context';
import { customSelectBoxStyles } from '@webservices/helpers';

interface OptionType {
	value: string;
	label: string;
}

const FollowupForm = () => {
	const [selectedFollowup, setFollowup] = useState<SingleValue<OptionType>>(null);
	const [selectedDates, setSelectedDates] = useState<any[]>([]);
	const { activePetId, handleSidebar, activeParentId, activeRecord, selectedDate } =
		useRecordSidebar();
	const { mutateAsync: createFollowup } = useCreateFollowUpRecords();
	const { refetch } = useGetFollowRecords({ date: selectedDate });
	const { data } = useGetFollowupList();

	const onChange = (dates: any) => {
		setSelectedDates(dates);
	};

	const deleteDate = (date: Date) => {
		const newDates = [...selectedDates];
		const filteredDates = newDates.filter((d) => {
			return d.getTime() !== date.getTime();
		});
		setSelectedDates(filteredDates);
	};

	const handleSubmit = async () => {
		const dates = convertDates(selectedDates);
		const data = {
			petId: activePetId,
			parentId: activeParentId,
			followUpType: selectedFollowup?.value as string,
			followUpDates: dates as string[],
		};
		const response = (await createFollowup(
			data
		)) as ICommonTypes.IApiResponse<IClinicTypes.IFollowUpRecord>;
		if (response.status === 'SUCCESS') {
			refetch();
			handleSidebar(false);
		}
	};

	const handleChange = (option: SingleValue<OptionType>) => {
		setFollowup(option);
	};

	return (
		<section className="flex flex-col h-full">
			<h2 className="text-24 font-semibold">Add Follow-up Details</h2>
			<h6 className="text-14 mt-8 mb-24">We will remind you when follow-up is due</h6>
			<div className="flex-1">
				<div>
					<label className="text-14 leading-24">Choose a follow-up</label>
					<Select
						options={data?.data?.followup}
						className="h-[52px] react-select-container"
						classNamePrefix="react-select"
						styles={customSelectBoxStyles}
						onChange={handleChange}
						value={selectedFollowup}
					/>
				</div>
				<div className="mt-24">
					<label className="text-14 leading-24 block">Choose Date</label>
					<DatePicker
						selectedDates={selectedDates}
						selectsMultiple
						onChange={onChange}
						shouldCloseOnSelect={false}
						disabledKeyboardNavigation
					/>
					{selectedDates.length > 1 && (
						<div className="flex flex-wrap mt-12 gap-8">
							{selectedDates.map((date) => {
								const formattedDate = format(date, 'yyyy-MM-dd');
								return (
									<div
										className="flex border border-grey-3 px-8 py-6 rounded-10 gap-8"
										key={formattedDate}
									>
										<span className="text-12">{formattedDate}</span>
										<ButtonWrapper onClick={() => deleteDate(date)}>
											<CloseIcon />
										</ButtonWrapper>
									</div>
								);
							})}
						</div>
					)}
				</div>
			</div>
			<Button
				onClick={handleSubmit}
				disabled={!selectedFollowup || selectedDates.length <= 0}
			>
				<span className="font-black tracking-[-0.41px]">Add Follow-up</span>
			</Button>
		</section>
	);
};

export default FollowupForm;
