'use client';

import { useEffect, useState } from 'react';
import { format, addDays, isToday, isTomorrow } from 'date-fns';
import DatePicker from 'react-datepicker';

import ButtonWrapper from '../button-wrapper/button-wrapper';
import { CalenderIcon } from '@webservices/icons';
import { logEvent } from '@webservices/services';
import { USER_EVENTS } from '@webservices/primitives';

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
		logEvent({
			name: USER_EVENTS.CALENDER_ICON,
			events: { date: formatDate, type: 'medical-records' },
		});
		setDaysHeaderData(date);
		handleDate(formatDate);
	};

	return (
		<div className="flex items-center justify-between">
			<div className="gap-16 flex justify-center items-center">
				{daysHeader.map((day, i) => {
					const split = day.displayDate.split(' ');
					const active = selectedDate === day.fullDate;
					return (
						<ButtonWrapper
							className={`shadow-base rounded-8 py-6 w-[140px] ${
								active ? 'bg-brand text-white' : 'bg-white'
							}`}
							key={i.toString()}
							data-id={day.fullDate}
							onClick={() => handleDate(day.fullDate)}
						>
							<div className="flex flex-col">
								<span className="text-24 font-medium">
									{split[0] + ' ' + split[1]}
								</span>
								<span className="text-14">{split[2]}</span>
							</div>
						</ButtonWrapper>
					);
				})}
				<div className="calender">
					<DatePicker
						className="cursor-pointer w-auto"
						onChange={handleCalender}
						selected={new Date(selectedDate)}
						customInput={
							<div className=" flex-col shadow-base rounded-8 px-6 flex items-center justify-center py-8 bg-white">
								<CalenderIcon />
								<p className="text-12">Choose from Calender</p>
							</div>
						}
					/>
				</div>
			</div>
		</div>
	);
}

export default DaysItem;
