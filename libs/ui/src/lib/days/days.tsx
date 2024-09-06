'use client';

import { useEffect, useState } from 'react';
import { format, addDays, isToday, isTomorrow } from 'date-fns';
import Calendar from 'react-calendar';

import ButtonWrapper from '../button-wrapper/button-wrapper';
import Modal from '../modal/modal';
import { CalenderIcon } from '@webservices/icons';

export function DaysItem({
	defaultDays = 6,
	selectedDate,
	handleDate,
}: {
	defaultDays?: number;
	selectedDate: string;
	handleDate: (d: string) => void;
}) {
	const daysArray = Array.from({ length: defaultDays }, (_, i) => i);
	const [daysHeader, setDaysData] = useState<ICommonTypes.IDayItem[]>([]);
	const [show, setShow] = useState(false);

	useEffect(() => {
		setDaysHeaderData(selectedDate);
	}, []);

	const setDaysHeaderData = (newDate: string) => {
		const daysData = daysArray.map((i) => {
			const date = addDays(new Date(newDate), i);
			let displayDate = format(date, 'd MMM EEE');
			if (isToday(date)) {
				displayDate = format(date, 'd MMM') + ' Today';
			} else if (isTomorrow(date)) {
				displayDate = format(date, 'd MMM') + ' Tomorrow';
			}

			return {
				displayDate,
				fullDate: format(date, 'yyyy-MM-dd'),
			};
		});
		setDaysData([...daysData]);
	};

	const handleCalender = (date: any) => {
		const formatDate = format(date, 'yyyy-MM-dd');
		setDaysHeaderData(date);
		handleDate(formatDate);
		setShow(false);
	};

	return (
		<section className="flex justify-between items-center">
			<Modal isOpen={show} handleClose={() => setShow(false)}>
				<section className="mx-auto max-w-2xl flex justify-center items-center">
					<div className="bg-white rounded-8 p-16">
						<h2 className="pb-16 text-18 font-semibold">Select a date</h2>
						<Calendar
							value={selectedDate}
							onChange={handleCalender}
							className="!shadow-none border-none"
						/>
					</div>
				</section>
			</Modal>
			<section className="gap-16 flex justify-center items-center">
				{daysHeader.map((day, i) => {
					const split = day.displayDate.split(' ');
					const active = selectedDate === day.fullDate;
					return (
						<ButtonWrapper
							className={`shadow-base rounded-8 py-6 w-[140px] ${
								active ? 'bg-brand text-white' : 'bg-white'
							}`}
							key={i.toString()}
							onClick={() => handleDate(day.fullDate)}
						>
							<section className="flex flex-col">
								<span className="text-24 font-medium">
									{split[0] + ' ' + split[1]}
								</span>
								<span>{split[2]}</span>
							</section>
						</ButtonWrapper>
					);
				})}
			</section>
			<section className="relative">
				<ButtonWrapper onClick={() => setShow(true)}>
					<CalenderIcon />
				</ButtonWrapper>
			</section>
		</section>
	);
}

export default DaysItem;
