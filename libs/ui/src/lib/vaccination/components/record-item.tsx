'use client';

import { memo, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { useDispatch } from 'react-redux';
import DatePicker from 'react-datepicker';

import { BellIcon, DeleteIcon, EditIcon } from '@webservices/icons';
import ButtonWrapper from '../../button-wrapper/button-wrapper';
import { openModal } from '@webservices/slices';
import { ModalTypes } from '@webservices/primitives';
import { useSendVaccinationRemainder, useUpdateVaccinationRecord } from '@webservices/api';
import ImagePlaceholder from '../../image-placeholder/image-placeholder';

interface IRecordItem {
	record: IClinicTypes.IVaccinationRecord;
	refetch: () => void;
	activeFilter: string;
}

function Record({ record, refetch, activeFilter }: IRecordItem) {
	const tempVaccine = record?.vaccinationDate ? parseISO(record?.vaccinationDate as string) : '';
	const vaccineDate = tempVaccine && format(tempVaccine, 'do MMM yy');
	const tempUpcoming = record?.vaccinatedOnDate
		? parseISO(record?.vaccinatedOnDate as string)
		: '';
	const upcomingDate = tempUpcoming !== '' && format(tempUpcoming, 'do MMM yy');
	const notificationDisbaled = record?.notificationCount >= 3;
	const dispatch = useDispatch();
	const { mutate: vaccinationRemainder, isPending } = useSendVaccinationRemainder({
		refetch,
	});
	const { mutate: updateVaccination } = useUpdateVaccinationRecord({
		refetch,
	});
	const [editDate, setEditDate] = useState(new Date());

	const handleRemainder = () => {
		const payload = {
			parentMobile:
				typeof record?.parent.mobile === 'string'
					? Number(record?.parent.mobile)
					: record?.parent.mobile,
			petName: record?.pet?.name,
			clinicName: record?.clinic?.name,
			nextVaccinationDate: record?.vaccinationDate,
			vaccineName: record?.vaccineName,
			id: record?._id,
		};
		vaccinationRemainder(payload);
	};

	const onDelete = () => {
		const payload = {
			id: record?._id,
			active: false,
		};
		updateVaccination(payload);
	};

	const handleDelete = () => {
		dispatch(
			openModal({
				isOpen: true,
				view: ModalTypes.CONFIRMATION_MODAL,
				confirmationTitle: 'Delete Vaccination Record',
				confirmationHeading: 'Are you sure you want to record?',
				onHandleConfirm: onDelete,
				center: true,
			})
		);
	};

	const handleEdit = (date: any) => {
		const payload = {
			id: record._id,
			active: record.active,
			vaccinatedOnDate: format(date, 'yyyy-MM-dd'),
		};
		updateVaccination(payload);
	};

	return (
		<div className="grid grid-cols-3 gap-12 bg-white mb-12 rounded-8 shadow-base px-16 py-12">
			<div className="flex gap-16 col-span-1">
				<ImagePlaceholder
					src="/images/vaccination-record.svg"
					containerClasses="w-[85px] h-[72px]"
				/>
				<div>
					<p className="text-18 font-semibold">{record?.pet?.name}</p>
					<p className="text-14">{record?.parent?.name}</p>
				</div>
			</div>
			<div className="col-span-1">
				<div className="flex justify-between items-center gap-12">
					<p className="text-14 leading-24 font-semibold">
						Vaccination: {record.vaccineName}
					</p>
					<div>
						<DatePicker
							selected={editDate}
							onChange={handleEdit}
							customInput={
								<div className="w-[32px] h-[32px] flex items-center justify-center cursor-pointer">
									<EditIcon />
								</div>
							}
						/>
					</div>
				</div>
				<p className="leading-32 text-14">
					Vaccinated On: {record?.vaccinatedOnDate ? upcomingDate : '(Not Updated)'}
				</p>
				<p className="leading-24  text-14">Due On: {vaccineDate}</p>
			</div>
			<div className="col-span-1 flex justify-end items-center edit-calender">
				<div className="flex items-end gap-6">
					<ButtonWrapper
						disabled={notificationDisbaled || isPending}
						onClick={handleRemainder}
						className="bg-primary-1 flex items-center justify-center px-12 h-[32px] rounded-10 gap-6"
						isLoading={isPending}
					>
						<BellIcon width={16} height={16} color="#FFF" />
						<span className="text-14 text-white">Notify</span>
					</ButtonWrapper>
					<span className="text-12 font-medium">{record.notificationCount}/3 sent</span>
				</div>
				<ButtonWrapper
					onClick={handleDelete}
					className="w-[42px] h-[42px] flex items-center justify-center"
				>
					<DeleteIcon className=" text-red-1" />
				</ButtonWrapper>
			</div>
		</div>
	);
}

export default memo(Record);
