import { useState } from 'react';
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
import Select, { SingleValue } from 'react-select';

import { CloseIcon } from '@webservices/icons';
import { Button, ButtonWrapper } from '@webservices/ui';
import {
	useCreateVaccinationRecords,
	useGetVaccinationList,
	useGetVaccinationRecords,
} from '@webservices/api';
import { convertDates } from '../../../helpers';
import { useRecordSidebar } from '../../../context/record-sidebar-context';
import { customSelectBoxStyles } from '@webservices/helpers';

interface OptionType {
	value: string;
	label: string;
}

const VaccinationForm = () => {
	const [selectedVaccine, setVaccine] = useState<SingleValue<OptionType>>(null);
	const [selectedDates, setSelectedDates] = useState<any[]>([]);
	const { activePetId, handleSidebar, activeParentId, activeRecord, selectedDate } =
		useRecordSidebar();
	const { mutateAsync: createVaccination } = useCreateVaccinationRecords();
	const { refetch } = useGetVaccinationRecords({ type: activeRecord, date: selectedDate });
	const { data } = useGetVaccinationList();

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
			vaccineName: selectedVaccine?.value as string,
			vaccinationDates: dates as string[],
		};
		const response = (await createVaccination(
			data
		)) as ICommonTypes.IApiResponse<IClinicTypes.IVaccinationRecord>;
		if (response.status === 'SUCCESS') {
			refetch();
			handleSidebar(false);
		}
	};

	const handleChange = (option: SingleValue<OptionType>) => {
		setVaccine(option);
	};

	return (
		<section className="flex flex-col h-full">
			<h2 className="text-24 font-semibold">Add Vaccination Details</h2>
			<h6 className="text-14 mt-8 mb-24">We will remind you when vaccination is due</h6>
			<div className="flex-1">
				<div>
					<label className="text-14 leading-24">Choose a vaccine</label>
					<Select
						options={data?.data?.vaccination}
						className="h-[52px] react-select-container"
						classNamePrefix="react-select"
						styles={customSelectBoxStyles}
						onChange={handleChange}
						value={selectedVaccine}
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
			<Button onClick={handleSubmit} disabled={!selectedVaccine || selectedDates.length <= 0}>
				<span className="font-black tracking-[-0.41px]">Add Vaccination</span>
			</Button>
		</section>
	);
};

export default VaccinationForm;
