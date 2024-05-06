import Image from 'next/image';

const data = [
	{
		id: 1,
		img: '/images/personalize.jpeg',
		heading: 'Personalized Setup',
		descriptoin:
			'When you add your clients, your clinic automatically becomes the default setting.',
	},
	{
		id: 2,
		img: '/images/organized.jpeg',
		heading: 'Organized Clinic',
		descriptoin:
			'Easily manage all aspects of your clinic like appointments, medical records, vaccination history, doctors and more.',
	},
	{
		id: 3,
		img: '/images/app.jpeg',
		heading: 'All-in-One App',
		descriptoin: 'Enjoy the convenience of having everything you need in a single app.',
	},
];

const Services = () => {
	return (
		<section id="services" className="py-[68px] px-16 lg:px-80">
			<h2 className="text-[36px] leading-[44px] font-medium text-center my-24">
				How We Support You
			</h2>
			<section className="grid lg:grid-cols-3 gap-32 lg:gap-16">
				{data?.map((service) => {
					return (
						<section
							className="col-span-1 transition-all flex flex-col items-center justify-center relative"
							key={service.id}
						>
							<figure className="relative w-full h-[286px]">
								<Image
									src={service.img}
									alt={service.heading}
									fill
									className="object-cover rounded-tl-[12px] rounded-tr-[12px]"
								/>
							</figure>
							<section className="bg-white flex-1 shadow-1 w-full px-16 py-20 rounded-bl-[12px] rounded-br-[12px]">
								<h4 className="text-brand text-20 leading-28 font-medium text-center pb-12">
									{service.heading}
								</h4>
								<p className="text-16 font-medium leading-21 text-center">
									{service.descriptoin}
								</p>
							</section>
						</section>
					);
				})}
			</section>
		</section>
	);
};

export default Services;
