'use client';

import { memo, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { useDispatch } from 'react-redux';
import dynamic from 'next/dynamic';

import { BellIcon, DeleteIcon } from '@webservices/icons';
import ButtonWrapper from '../../button-wrapper/button-wrapper';
import { openModal } from '@webservices/slices';
import { ModalTypes } from '@webservices/primitives';
import { useSendVaccinationRemainder, useUpdateVaccinationRecord } from '@webservices/api';
import ImagePlaceholder from '../../image-placeholder/image-placeholder';
import Loading from '../../loading/loading';

const UpdateVaccination = dynamic(() => import('./update-vaccination'), {
	loading: () => <Loading />,
});

interface IRecordItem {
	record: IClinicTypes.IVaccinationRecord;
	refetch: () => void;
	activeFilter: string;
}

function Record({ record, refetch }: IRecordItem) {
	const tempVaccine = record?.vaccinationDate ? parseISO(record?.vaccinationDate as string) : '';
	const vaccineDate = tempVaccine && format(tempVaccine, 'do MMM yy');
	const tempUpcoming = record?.vaccinatedOnDate
		? parseISO(record?.vaccinatedOnDate as string)
		: '';
	const upcomingDate = tempUpcoming !== '' && format(tempUpcoming, 'do MMM yy');
	const dispatch = useDispatch();
	const { mutate: vaccinationRemainder, isPending } = useSendVaccinationRemainder({
		refetch,
	});
	const { mutate: updateVaccination, isPending: updateLoading } = useUpdateVaccinationRecord({
		refetch,
	});
	const [open, setOpen] = useState(false);
	const notificationDisbaled =
		record?.notificationCount >= 3 ||
		isPending ||
		updateLoading ||
		typeof record?.vaccinatedOnDate === 'string';

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

	const handleEdit = () => {
		setOpen(true);
	};

	return (
		<div className="grid grid-cols-4 gap-24 bg-white mb-12 rounded-8 shadow-base px-16 py-12">
			<UpdateVaccination
				isOpen={open}
				handleClose={() => setOpen(false)}
				refetch={refetch}
				id={record._id}
			/>
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
			<div className="col-span-2 flex justify-between items-center">
				<div>
					<p className="text-14 leading-24 font-semibold">
						Vaccination: {record.vaccineName}
					</p>
					<p className="leading-32 text-14">
						Vaccinated On: {record?.vaccinatedOnDate ? upcomingDate : '(Not Updated)'}
					</p>
					<p className="leading-24  text-14">Due On: {vaccineDate}</p>
				</div>
				{record?.vaccinatedOnDate === null || !record?.vaccinatedOnDate ? (
					<ButtonWrapper
						onClick={handleEdit}
						className="flex items-center justify-center border border-primary-1 px-12 rounded-full py-6"
					>
						<span className="text-14 font-bold text-primary-1">Complete</span>
					</ButtonWrapper>
				) : (
					<span className="text-14 font-bold text-grey-text3">Completed</span>
				)}
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
