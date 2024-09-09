import { MenuItem } from '@headlessui/react';
import { useState } from 'react';
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';

import { followupData } from '@webservices/constants';
import { CloseIcon, DownIcon } from '@webservices/icons';
import { Button, ButtonWrapper, Dropdown } from '@webservices/ui';
import { useCreateFollowUpRecords } from '@webservices/api';
import { convertDates } from '../../../helpers';

const Label = ({ selectedFollowup }: { selectedFollowup: string }) => {
	return (
		<div className="flex items-center gap-12 border border-grey-border1 w-full rounded-8 h-54 px-12 justify-between">
			<span className="text-14">
				{selectedFollowup !== '' ? selectedFollowup : 'Choose a Followup'}
			</span>
			<DownIcon />
		</div>
	);
};

const FollowupForm = ({
	parentId,
	petId,
	activeClinicId,
	handleSidebar,
	selectedDate,
	activeRecord,
}: {
	parentId: string;
	petId: string;
	activeClinicId: string;
	handleSidebar: (s: boolean) => void;
	selectedDate: string;
	activeRecord: string;
}) => {
	const [selectedFollowup, setFollowup] = useState('');
	const [selectedDates, setSelectedDates] = useState([new Date()]);
	const { mutate: createFollowup } = useCreateFollowUpRecords({
		handleSidebar,
		type: activeRecord,
		date: selectedDate,
	});

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

	const handleSubmit = () => {
		const dates = convertDates(selectedDates);
		const data = {
			petId,
			parentId,
			followUpType: selectedFollowup,
			followUpDates: dates as string[],
		};
		createFollowup(data);
	};

	return (
		<section className="flex flex-col h-full">
			<h2 className="text-24 font-semibold">Add Follow-up Details</h2>
			<h6 className="text-14 mt-8 mb-24">We will remind you when follow-up is due</h6>
			<div className="flex-1">
				<div>
					<label className="text-14 leading-24">Choose a follow-up</label>
					<Dropdown
						menuClasses="!max-h-[320px]"
						label={<Label selectedFollowup={selectedFollowup} />}
					>
						{followupData.map((followup) => {
							return (
								<MenuItem key={followup.key}>
									<p
										onClick={() => setFollowup(followup.key)}
										className={`px-12 py-12 cursor-pointer hover:bg-primary-3 ${
											selectedFollowup === followup.key ? 'bg-primary-3' : ''
										}`}
									>
										{followup.label}
									</p>
								</MenuItem>
							);
						})}
					</Dropdown>
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
			<Button onClick={handleSubmit} disabled={selectedFollowup === ''}>
				<span className="font-black tracking-[-0.41px]">Add Follow-up</span>
			</Button>
		</section>
	);
};

export default FollowupForm;
