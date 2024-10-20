'use client';

import { memo, useCallback, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import { useGetPets } from '@webservices/api';
import CategoryLoader from '../../category-loader/category-loader';
import Pet from './pet';

function PetsList({ activeParent }: { activeParent: string }) {
	const { data, isPending } = useGetPets(activeParent as string);
	const petsData = data?.data?.pets || [];
	const [activePet, setActivePet] = useState('');

	const handlePet = useCallback(
		(pet: ICommonTypes.IPet) => {
			setActivePet(pet.petId);
		},
		[activePet]
	);

	if (isPending) {
		return (
			<div className="pt-16 ml-[48px] text-14 font-medium">
				<CategoryLoader rows={1} />
			</div>
		);
	}

	if (petsData.length <= 0) {
		return <div className="pt-16 ml-[48px] text-14 font-medium">No Pets found.</div>;
	}

	return (
		<div className="pt-16 ml-[48px]">
			<Swiper
				navigation
				pagination
				modules={[Navigation]}
				className="pet"
				slidesPerView={5}
				spaceBetween={6}
			>
				{petsData?.map((pet) => {
					const active = activePet === pet.petId;
					return (
						<SwiperSlide key={pet.petId}>
							<Pet
								handlePet={handlePet}
								pet={pet}
								height="h-[92px]"
								containerStyles={active ? 'bg-white p-8 shadow-base' : 'p-8'}
							/>
						</SwiperSlide>
					);
				})}
			</Swiper>
		</div>
	);
}

export default memo(PetsList);
