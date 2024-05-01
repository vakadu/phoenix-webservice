import Image from 'next/image';

const data = [
	{
		id: 1,
		img: '/images/clinic-appointment.png',
		heading: 'Clinic Appointment',
		descriptoin:
			'Through partnerships with accredited pet clinics, we offer a spectrum of services from routine check-ups to specialized treatments',
	},
	{
		id: 2,
		img: '/images/video-appointment.png',
		heading: 'Video Appointment',
		descriptoin:
			'Our user-friendly platform empowers you to effortlessly discover and connect with the finest pet clinics in your vicinity',
	},
	{
		id: 3,
		img: '/images/grooming.png',
		heading: 'Grooming',
		descriptoin:
			'Behind Pemilyy is a team of devoted individuals who comprehend the unique bond between pets and their parents',
	},
];

const Services = () => {
	return (
		<section id="services" className="py-[68px] px-16 lg:px-80">
			<h2 className="text-[36px] leading-[44px] font-medium text-center mb-24">
				Our Services
			</h2>
			<section className="grid lg:grid-cols-3 gap-32 lg:gap-16">
				{data?.map((service) => {
					return (
						<section
							className="col-span-1 transition-all flex flex-col items-center justify-center relative hover:shadow-1 hover:cursor-pointer"
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
							<section className="bg-white shadow-1 w-full py-20 rounded-bl-[12px] rounded-br-[12px]">
								<h4 className="text-brand text-20 leading-28 font-medium text-center">
									{service.heading}
								</h4>
							</section>
						</section>
					);
				})}
			</section>
		</section>
	);
};

export default Services;
