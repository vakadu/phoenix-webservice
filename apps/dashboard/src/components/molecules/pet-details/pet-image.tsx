'use client';

import { useGetPetById, useGetPetProfileImage, useUpdatePetImage } from '@webservices/api';
import { createFormDataForImage } from '@webservices/helpers';
import { useRouterQuery } from '@webservices/hooks';
import { ButtonWrapper, ImagePlaceholder } from '@webservices/ui';

const PetImage = () => {
	const { query } = useRouterQuery();
	const { data } = useGetPetProfileImage(query?.id as string);
	const { data: petData } = useGetPetById(query?.id as string);
	const { type } = petData?.data?.pet || {};
	const { mutate: updatePetImage } = useUpdatePetImage(query?.id as string);

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const formData = createFormDataForImage(file, 'file');
			updatePetImage(formData);
		}
	};

	return (
		<div className="">
			<div>
				{data?.data?.profileUrl && data?.data?.profileUrl !== '' ? (
					<ImagePlaceholder
						src={data?.data?.profileUrl as string}
						containerClasses={`w-full h-[175px]`}
						imageClasses={`rounded-10`}
					/>
				) : (
					<ImagePlaceholder
						src={type === 'CAT' ? '/images/Cat.png' : '/images/Dog.png'}
						containerClasses={`w-full h-[175px]`}
						imageClasses="rounded-10 object-cover"
					/>
				)}
			</div>
			<label className="cursor-pointer z-10 bg-primary-1 flex items-center justify-center shadow-base mt-24 h-[54px] rounded-8">
				<input type="file" onChange={onChange} className="w-full hidden" />
				<ButtonWrapper>
					<span className="text-white font-black tracking-[-0.41px]">Upload</span>
				</ButtonWrapper>
			</label>
		</div>
	);
};

export default PetImage;
