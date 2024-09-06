'use client';

import { ReactNode, useEffect, useState } from 'react';
import { format, addDays, isToday, isTomorrow } from 'date-fns';

import ButtonWrapper from '../button-wrapper/button-wrapper';

export function DaysHeader({
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

	return (
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
							<span className="text-24 font-medium">{split[0] + ' ' + split[1]}</span>
							<span>{split[2]}</span>
						</section>
					</ButtonWrapper>
				);
			})}
		</section>
	);
}

export function DaysCalender({ children }: { children: ReactNode }) {
	return (
		<section className="relative">
			<ButtonWrapper>{children}</ButtonWrapper>
			{/* {showCalender && (
				<section className="absolute right-0">
					<Calender
						className="mt-[4px] bg-white"
						value={selectedDate}
						onChange={handleDateChange}
						maxDate={new Date()}
					/>
				</section>
			)} */}
		</section>
	);
}

export function DaysItem({ children }: { children: ReactNode }) {
	return <section className="flex justify-between items-center">{children}</section>;
}

export default DaysItem;
