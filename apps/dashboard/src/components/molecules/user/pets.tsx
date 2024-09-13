'use client';

import { useCallback } from 'react';

import { useGetPets } from '@webservices/api';
import { ButtonWrapper, CategoryLoader } from '@webservices/ui';
import Pet from '../../atoms/pet';
import { useRouterQuery } from '@webservices/hooks';
import { PlusIcon } from '@webservices/icons';

const Pets = ({ id }: { id: string }) => {
	const { router } = useRouterQuery();
	const { data, isPending } = useGetPets(id as string);

	const handlePet = useCallback((pet: ICommonTypes.IPet) => {
		router.push(`/pet/${pet.petId}`);
	}, []);

	if (isPending) {
		return (
			<div className="px-24">
				<CategoryLoader rows={2} columns={2} coverHeight={140} />
			</div>
		);
	}

	return (
		<section className="px-24 grid grid-cols-2 gap-24 mb-32">
			{data?.data?.pets?.map((pet) => {
				return <Pet handlePet={handlePet} key={pet.petId} pet={pet} />;
			})}
			<ButtonWrapper className="w-full h-[175px] border-[2px] border-dashed border-primary-1 rounded-8 flex items-center justify-center cursor-pointer">
				<section className="w-[58px] h-[58px] bg-primary-1 flex items-center justify-center rounded-full">
					<PlusIcon className="text-white" />
				</section>
			</ButtonWrapper>
		</section>
	);
};

export default Pets;
