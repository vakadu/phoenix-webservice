import Image from 'next/image';
import React from 'react';

const PetOwners = () => {
	return (
		<section className="grid lg:grid-cols-5 lg:gap-[64px] bg-grey-bg py-[102px] lg:py-[64px] px-16 lg:px-[144px]">
			<section className="col-span-2">
				<h3 className="text-[36px] leading-[44px] font-medium text-center lg:text-left">
					<span>Helping pet</span> <span className="text-brand">owners around India</span>
				</h3>
				<p className="text-16 leading-24 py-18 lg:pt-16 lg:pb-0 text-center lg:text-left">
					We reached here with our hard work and dedication
				</p>
			</section>
			<section className="col-span-3 grid grid-cols-2 gap-24 py-24 lg:py-0">
				<section className="col-span-1 gap-24 flex items-center">
					<figure className="w-48 h-48 relative">
						<Image
							src="/icons/members.svg"
							fill
							alt="pemilyy-members"
							className=" object-contain"
						/>
					</figure>
					<p>
						<span className="block text-28 leading-[36px] font-bold">2,000</span>
						<span className="text-16 leading-24">Members</span>
					</p>
				</section>
				<section className="col-span-1 gap-24 flex items-center">
					<figure className="w-48 h-48 relative">
						<Image
							src="/icons/bookings.svg"
							fill
							alt="pemilyy-members"
							className=" object-contain"
						/>
					</figure>
					<p>
						<span className="block text-28 leading-[36px] font-bold">10,000</span>
						<span className="text-16 leading-24">Bookings</span>
					</p>
				</section>
			</section>
		</section>
	);
};

export default PetOwners;
