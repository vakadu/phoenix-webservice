/* eslint-disable react/no-unescaped-entities */
import { RightLongIcon } from '@webservices/icons';
import { Button } from '@webservices/ui';
import React from 'react';

const Booking = () => {
	return (
		<section className="bg-grey-bg py-[64px] px-16 lg:px-[244px] flex flex-col justify-center items-center">
			<h1 className="text-[48px] leading-[64px] lg:text-[64px] lg:leading-[76px] text-center font-medium">
				Book Smarter, Care Better: Your Pet's Appointment, Just a Paw Click Away!
			</h1>
			<Button className="mt-42 gap-8">
				<span>Book Appointment</span>
				<RightLongIcon width={16} height={16} />
			</Button>
		</section>
	);
};

export default Booking;
