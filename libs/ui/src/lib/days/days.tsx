'use client';

import { useEffect, useRef, useState } from 'react';
import { format, addDays, isToday, isTomorrow } from 'date-fns';

import ButtonWrapper from '../button-wrapper/button-wrapper';
import { CalenderIcon } from '@webservices/icons';
import DatePicker from 'react-datepicker';

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
	const dateInputRef = useRef<any>(null);

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

	const handleCalender = (e: any) => {
		const newDate = e.target.value;
		setDaysHeaderData(newDate);
		handleDate(newDate);
	};

	const openDatePicker = () => {
		if (dateInputRef.current) {
			dateInputRef.current.showPicker();
		}
	};

	return (
		<div className="flex items-center justify-between">
			<div className="gap-16 flex justify-center items-center">
				<div className="calender flex-col shadow-base rounded-8 px-6 flex items-center justify-center py-8">
					<DatePicker
						className="cursor-pointer w-auto"
						onChange={handleCalender}
						selected={new Date(selectedDate)}
						maxDate={new Date()}
						customInput={<CalenderIcon />}
					/>
					<p className="text-12">Choose from Calender</p>
				</div>

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
								<span>{split[2]}</span>
							</div>
						</ButtonWrapper>
					);
				})}
			</div>
		</div>
	);
}

export default DaysItem;
