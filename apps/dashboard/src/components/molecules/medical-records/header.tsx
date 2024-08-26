'use client';

import { format } from 'date-fns';
import { useState } from 'react';

import { Days } from '@webservices/ui';

const Header = () => {
	const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));

	return (
		<section className="px-16 pt-24">
			<Days selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
		</section>
	);
};

export default Header;
