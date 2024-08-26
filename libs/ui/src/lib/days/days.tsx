'use client';

import { useEffect, useState } from 'react';
import { format, addDays, isToday, isTomorrow } from 'date-fns';
import Calender from 'react-calendar';

import ButtonWrapper from '../button-wrapper/button-wrapper';
import { CalenderIcon } from '@webservices/icons';

interface IDaysProps {
	defaultDays?: number;
	selectedDate: string;
	setSelectedDate: (d: string) => void;
	showCalenderIcon?: boolean;
}

export function Days({
	defaultDays = 6,
	selectedDate,
	setSelectedDate,
	showCalenderIcon = true,
}: IDaysProps) {
	const daysArray = Array.from({ length: defaultDays }, (_, i) => i);
	const [daysHeader, setDaysData] = useState<ICommonTypes.IDayItem[]>([]);
	const [showCalender, setCalender] = useState(false);

	useEffect(() => {
		setDaysHeaderData(selectedDate);
	}, []);

	const handleDate = (date: string) => {
		setSelectedDate(date);
	};

	const handleDateChange = (date: any) => {
		const tempDate = format(date, 'yyyy-MM-dd');
		setSelectedDate(tempDate);
		setCalender(false);
		setDaysHeaderData(tempDate);
	};

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

	return (
		<section className="flex justify-between items-center">
			<section className="gap-16 flex justify-center items-center">
				{daysHeader.map((day, i) => {
					const split = day.displayDate.split(' ');
					const active = selectedDate === day.fullDate;
					console.log(selectedDate, day);

					return (
						<ButtonWrapper
							className={`shadow-base rounded-8 py-12 w-[140px] ${
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

			{showCalenderIcon && (
				<section className="relative">
					<ButtonWrapper onClick={() => setCalender(!showCalender)}>
						<CalenderIcon />
					</ButtonWrapper>
					{showCalender && (
						<section className="absolute right-0">
							<Calender
								className="mt-[4px] bg-white"
								value={selectedDate}
								onChange={handleDateChange}
								maxDate={new Date()}
							/>
						</section>
					)}
				</section>
			)}
		</section>
	);
}

export default Days;
