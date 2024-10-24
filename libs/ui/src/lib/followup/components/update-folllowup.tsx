import { memo, useState } from 'react';
import Select, { SingleValue } from 'react-select';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';

import Modal from '../../modal/modal';
import { useGetDropdownList, useUpdateFollowUpRecord } from '@webservices/api';
import { customSelectBoxStyles } from '@webservices/helpers';
import Button from '../../button/button';

interface OptionType {
	value: string;
	label: string;
}

function UpdateFollowup({
	isOpen,
	handleClose,
	refetch,
	id,
	active,
}: {
	isOpen: boolean;
	handleClose: () => void;
	refetch: () => void;
	id: string;
	active: boolean;
}) {
	const { data } = useGetDropdownList('REPEAT_AFTERS');
	const [selected, setSelected] = useState<SingleValue<OptionType>>(null);
	const [selectedDate, setSelectedDate] = useState<any>(null);
	const { mutateAsync: updateFollowup, isPending } = useUpdateFollowUpRecord({
		refetch,
	});

	const handleChange = (option: SingleValue<OptionType>) => {
		setSelected(option);
	};

	const onChange = (date: any) => {
		setSelectedDate(date);
	};

	const handleSubmit = async () => {
		const payload = {
			id,
			followUpCompleteDate: format(selectedDate, 'yyyy-MM-dd'),
			repeatAfter: selected?.value,
			active,
		};
		const response = await updateFollowup(payload);
		if (response?.status === 'SUCCESS') {
			handleClose();
		}
	};

	return (
		<Modal isOpen={isOpen} handleClose={handleClose}>
			<div className="bg-white p-24 rounded-8">
				<div className="text-24 font-semibold border-b border-b-grey-divider pb-16">
					Update the Followup
				</div>
				<div className="mt-16 grid grid-cols-2 gap-24">
					<div className="col-span-1">
						<label className="text-14 leading-24 block">
							Choose Followup Complete Date
						</label>
						<DatePicker
							selected={selectedDate}
							onChange={onChange}
							disabledKeyboardNavigation
						/>
					</div>
					<div className="col-span-1">
						<label className="text-14 leading-24">Repeat same Followup after</label>
						<Select
							options={data?.data?.dropdown}
							className="h-[52px] react-select-container"
							classNamePrefix="react-select"
							styles={customSelectBoxStyles}
							onChange={handleChange}
							value={selected}
						/>
					</div>
				</div>
				<Button
					onClick={handleSubmit}
					disabled={!selected || !selectedDate || isPending}
					isLoading={isPending}
					className="mt-24"
				>
					<span>Update Followup</span>
				</Button>
			</div>
		</Modal>
	);
}

export default memo(UpdateFollowup);
