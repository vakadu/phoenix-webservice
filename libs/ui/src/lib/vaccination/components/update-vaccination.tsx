import { memo, useState } from 'react';
import Select, { SingleValue } from 'react-select';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';

import Modal from '../../modal/modal';
import { useGetDropdownList, useUpdateVaccinationRecord } from '@webservices/api';
import { customSelectBoxStyles } from '@webservices/helpers';
import Button from '../../button/button';

interface OptionType {
	value: string;
	label: string;
}

function UpdateVaccination({
	isOpen,
	handleClose,
	refetch,
	id,
}: {
	isOpen: boolean;
	handleClose: () => void;
	refetch: () => void;
	id: string;
}) {
	const { data } = useGetDropdownList('REPEAT_AFTERS');
	const [selected, setSelected] = useState<SingleValue<OptionType>>(null);
	const [selectedDate, setSelectedDate] = useState<any>(null);
	const { mutateAsync: updateVaccination, isPending } = useUpdateVaccinationRecord({
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
			vaccinatedOnDate: format(selectedDate, 'yyyy-MM-dd'),
			repeatAfter: selected?.value,
		};
		const response = await updateVaccination(payload);
		if (response?.status === 'SUCCESS') {
			handleClose();
		}
	};

	return (
		<Modal isOpen={isOpen} handleClose={handleClose}>
			<div className="bg-white p-24 rounded-8">
				<div className="text-24 font-semibold border-b border-b-grey-divider pb-16">
					Update the Vaccination
				</div>
				<div className="mt-16 grid grid-cols-2 gap-24">
					<div className="col-span-1">
						<label className="text-14 leading-24 block">
							Choose Vaccine Complete Date
						</label>
						<DatePicker
							selected={selectedDate}
							onChange={onChange}
							disabledKeyboardNavigation
						/>
					</div>
					<div className="col-span-1">
						<label className="text-14 leading-24">Repeat same Vaccine after</label>
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
					<span>Update Vaccination</span>
				</Button>
			</div>
		</Modal>
	);
}

export default memo(UpdateVaccination);
