'use client';

import { useCallback } from 'react';

import { useGetPets } from '@webservices/api';
import { CategoryLoader } from '@webservices/ui';
import Pet from '../../atoms/pet';
import { useRecordSidebar } from '../../../context/record-sidebar-context';

const PetsList = ({ parentId }: { parentId: string }) => {
	const { data, isPending } = useGetPets(parentId as string);
	const { handleActivePet, handleActiveType, recordType } = useRecordSidebar();

	const handlePet = useCallback((pet: ICommonTypes.IPet) => {
		if (recordType === 'medical') {
			handleActivePet(pet.petId);
			handleActiveType('upload');
		} else if (recordType === 'vaccination') {
			handleActivePet(pet.petId);
			handleActiveType('vaccination');
		} else if (recordType === 'followup') {
			handleActivePet(pet.petId);
			handleActiveType('followup');
		}
	}, []);

	if (isPending) {
		return <CategoryLoader rows={3} columns={2} coverHeight={140} />;
	}

	return (
		<section className="grid grid-cols-2 gap-16">
			{data?.data?.pets?.map((pet) => {
				return <Pet handlePet={handlePet} key={pet.petId} pet={pet} />;
			})}
		</section>
	);
};

export default PetsList;
