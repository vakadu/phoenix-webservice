'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import { ImagePlaceholder } from '@webservices/ui';

const data = [
	{
		id: 0,
		img: '/images/feature-1.png',
		heading: 'Pet Profile Creation',
		subHeading:
			'Users can create profiles for their pets, including basic details like name, breed, age, and photos.',
	},
	{
		id: 0,
		img: '/images/feature-2.png',
		heading: 'Pet Profile Creation',
		subHeading:
			'Users can create profiles for their pets, including basic details like name, breed, age, and photos.',
	},
];

const Features = () => {
	return (
		<section id="features" className="px-16 lg:px-[244px] relative overflow-hidden">
			<h2 className="text-[36px] leading-[44px] font-medium text-center my-24">
				Bring Your clinic to one Mobile App
			</h2>
			<Swiper
				navigation
				pagination
				modules={[Navigation, Pagination]}
				className="features pb-68"
			>
				{data?.map((feature) => {
					return (
						<SwiperSlide key={feature.id}>
							<section className="grid lg:grid-cols-2 gap-54">
								<ImagePlaceholder
									containerClasses="w-full h-[280px] lg:h-[480px] col-span-1"
									src={feature.img}
									imageClasses="object-contain"
								/>
								<section className="col-span-1 flex flex-col justify-center">
									<h4 className="font-medium text-24 leading-[44px] text-center lg:text-left">
										{feature.heading}
									</h4>
									<p className="text-16 leading-20 mt-12 text-center lg:text-left">
										{feature.subHeading}
									</p>
								</section>
							</section>
						</SwiperSlide>
					);
				})}
			</Swiper>
			{/* <img alt="" src="/images/section-bg.png" className="absolute" /> */}
		</section>
	);
};

export default Features;
