'use client';

import { useState } from 'react';

import { useGetPetById } from '@webservices/api';
import { useRouterQuery } from '@webservices/hooks';
import AddEditPet from '../../atoms/add-edit-pet.atom';

const AboutPet = () => {
	const { query } = useRouterQuery();
	const { data } = useGetPetById(query?.id as string);
	const { gender, dob, breed, type, name } = data?.data?.pet || {};
	const containerClass =
		'shoadow-base px-16 flex flex-col items-center justify-center py-12 rounded-8 min-w-[130px] gap-6 bg-white';
	const [show, setShow] = useState(false);

	return (
		<div>
			<AddEditPet
				open={show}
				petId={query?.id as string}
				modalType="edit"
				handleClose={() => setShow(false)}
			/>
			<div className="flex gap-12 mb-24 items-end">
				<h2 className="text-32 font-semibold">{name}</h2>
				<span
					onClick={() => setShow(true)}
					className="relative bottom-6 text-14 border-b border-primary-1 text-primary-1 cursor-pointer"
				>
					Edit
				</span>
			</div>
			<div className="flex gap-32">
				<div className={containerClass}>
					<span className="block text-16 font-medium">
						{gender === 'M' ? 'Male' : 'Female'}
					</span>
					<span className="block text-14 text-grey-text3">Sex</span>
				</div>
				<div className={containerClass}>
					<span className="block text-16 font-medium">{dob}</span>
					<span className="block text-14 text-grey-text3">Birth</span>
				</div>
				<div className={containerClass}>
					<span className="block text-16 font-medium">{breed}</span>
					<span className="block text-14 text-grey-text3">Breed</span>
				</div>
				<div className={containerClass}>
					<span className="block text-16 font-medium">{type}</span>
					<span className="block text-14 text-grey-text3">Type</span>
				</div>
			</div>
		</div>
	);
};

export default AboutPet;
