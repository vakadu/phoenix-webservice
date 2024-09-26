'use client';

import { useState } from 'react';

import { useGetPetById } from '@webservices/api';
import { useRouterQuery } from '@webservices/hooks';
import { ButtonWrapper } from '@webservices/ui';
import { RightIcon } from '@webservices/icons';

const AboutPet = () => {
	const { query, router, params } = useRouterQuery();
	const parentId = params.get('parentId');
	const { data } = useGetPetById(query?.id as string);
	const { gender, dob, breed, type, name } = data?.data?.pet || {};
	const containerClass =
		'shoadow-base px-16 flex flex-col items-center justify-center py-12 rounded-8 min-w-[130px] gap-6 bg-white';
	const [show, setShow] = useState(false);

	return (
		<div>
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
			{/* <div className="mt-32">
				<ButtonWrapper
					onClick={() =>
						router.push(`/medical-records?petId=${query?.id}&parentId=${parentId}`)
					}
					className="mb-24 border border-grey-border1 px-12 bg-white w-[320px] h-[54px] rounded-8 flex items-center justify-between"
				>
					<span className="text-14 font-medium">Medical Records</span>
					<RightIcon />
				</ButtonWrapper>
				<ButtonWrapper
					onClick={() =>
						router.push(`/vaccination-records?petId=${query?.id}&parentId=${parentId}`)
					}
					className="mb-24 border border-grey-border1 px-12 bg-white w-[320px] h-[54px] rounded-8 flex items-center justify-between"
				>
					<span className="text-14 font-medium">Vaccination Records</span>
					<RightIcon />
				</ButtonWrapper>
				<ButtonWrapper
					onClick={() =>
						router.push(`/follow-up?petId=${query?.id}&parentId=${parentId}`)
					}
					className="mb-24 border border-grey-border1 px-12 bg-white w-[320px] h-[54px] rounded-8 flex items-center justify-between"
				>
					<span className="text-14 font-medium">Follow Ups</span>
					<RightIcon />
				</ButtonWrapper>
			</div> */}
		</div>
	);
};

export default AboutPet;
