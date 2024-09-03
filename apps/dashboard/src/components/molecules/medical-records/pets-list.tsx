'use client';

import { useCallback } from 'react';

import { useGetPets } from '@webservices/api';
import { CategoryLoader } from '@webservices/ui';
import Pet from '../../atoms/pet';
import { useRecordSidebar } from '../../../context/record-sidebar-context';

const PetsList = ({ parentId }: { parentId: string }) => {
	const { data, isPending } = useGetPets(parentId as string);
	const { handleActivePet, handleActiveType } = useRecordSidebar();

	const handlePet = useCallback((pet: ICommonTypes.IPet) => {
		handleActivePet(pet.petId);
		handleActiveType('upload');
	}, []);

	if (isPending) {
		return <CategoryLoader rows={3} columns={2} coverHeight={140} />;
	}

	return (
		<section className="grid grid-cols-2 gap-16 px-16">
			{data?.data?.pets?.map((pet) => {
				return <Pet handlePet={handlePet} key={pet.petId} pet={pet} />;
			})}
		</section>
	);
};

export default PetsList;
