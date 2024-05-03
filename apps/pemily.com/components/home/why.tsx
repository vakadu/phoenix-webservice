import Image from 'next/image';
import React from 'react';

const data = [
	{
		id: 0,
		icon: '',
		title: 'Sample title 1',
		subtitle:
			'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
	},
	{
		id: 1,
		icon: '',
		title: 'Sample title 2',
		subtitle:
			'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
	},
	{
		id: 2,
		icon: '',
		title: 'Sample title 3',
		subtitle:
			'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
	},
	{
		id: 3,
		icon: '',
		title: 'Sample title 4',
		subtitle:
			'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
	},
	{
		id: 4,
		icon: '',
		title: 'Sample title 5',
		subtitle:
			'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
	},
];

const Why = () => {
	return (
		<section id="services" className="py-[68px] px-16 lg:px-80">
			<h2 className="text-[36px] leading-[44px] font-medium text-center mb-24">
				Why Pemilyy ?
			</h2>
			<section className="grid lg:grid-cols-3 gap-32">
				{data?.map((sec) => {
					return (
						<section
							className="col-span-1 py-24 px-32 shadow-bg1 flex rounded-6 flex-col justify-center items-center"
							key={sec.id}
						>
							<figure className="relative w-[65px] h-[56px]">
								<Image alt="" src={sec.icon} fill />
							</figure>
							<h5 className="text-28 leading-[36px] font-bold py-12">{sec.title}</h5>
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
