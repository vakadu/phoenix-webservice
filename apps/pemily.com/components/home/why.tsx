import Image from 'next/image';
import React from 'react';

const data = [
	{
		id: 0,
		icon: '/icons/remainders.svg',
		title: 'Vaccination Reminders',
		subtitle:
			'Effortlessly notifying pet parents via WhatsApp, text message, and app notification.',
	},
	{
		id: 1,
		icon: '/icons/records.svg',
		title: 'Vaccination History',
		subtitle:
			'Keep track of all pet vaccinations and receive timely reminders to send notifications to pet parents.',
	},
	{
		id: 2,
		icon: '/icons/vaccination.svg',
		title: 'Organized Medical Records',
		subtitle:
			"Streamline your clinic's operations by easily managing all client records with just a single tap.",
	},
];

const Why = () => {
	return (
		<section id="why" className="py-[68px] px-16 lg:px-80">
			<h2 className="text-[36px] leading-[44px] font-medium text-center mb-24">
				Why Pemilyy ?
			</h2>
			<section className="grid lg:grid-cols-3 gap-[54px] lg:gap-[100px]">
				{data?.map((sec) => {
					return (
						<section
							className="col-span-1 py-24 px-24 lg:px-[54px] shadow-bg1 flex rounded-6 flex-col justify-center items-center"
							key={sec.id}
						>
							<figure className="relative w-[50px] h-[50px]">
								<Image alt="" src={sec.icon} fill />
							</figure>
							<h5 className="text-28 text-center leading-[36px] font-bold py-12">
								{sec.title}
							</h5>
							<p className="text-center text-[#717171] text-14 leading-20">
								{sec.subtitle}
							</p>
						</section>
					);
				})}
			</section>
		</section>
	);
};

export default Why;
