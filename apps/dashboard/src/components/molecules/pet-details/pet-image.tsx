'use client';

import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import {
	useGetPetById,
	useGetPetProfileImage,
	useUpdatePetImage,
	useUploadUserProfile,
} from '@webservices/api';
import { ImagePlaceholder, TextInput } from '@webservices/ui';
import { CameraIcon, UserIcon } from '@webservices/icons';
import { createFormDataForImage } from '@webservices/helpers';
import { useRouterQuery } from '@webservices/hooks';

const PetImage = () => {
	const { query } = useRouterQuery();
	const { data: profileData } = useGetPetById(query?.id as string);
	const { data: profileImage } = useGetPetProfileImage(query?.id as string);
	const { profileUrl } = profileImage?.data || {};
	const { name, breed, gender, type, dob } = profileData?.data?.pet || {};
	const { mutate: updatePetImage } = useUpdatePetImage(query?.id as string);
	const { register, setValue } = useForm();

	useEffect(() => {
		setValue('name', name);
		setValue('breed', breed);
		setValue('gender', gender === 'M' ? 'Male' : 'Female');
		setValue('type', type === 'DOG' ? 'Dog' : 'Cat');
		setValue('dob', dob);
	}, [breed, dob, gender, name, setValue, type]);

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const formData = createFormDataForImage(file, 'file');
			updatePetImage(formData);
		}
	};

	return (
		<div className="col-span-1 bg-white rounded-[16px] shadow-base flex justify-center items-center flex-col py-32 px-16">
			<div>
				<div className=" rounded-full w-[168px] h-[168px] bg-white relative">
					{profileUrl && profileUrl !== '' ? (
						<ImagePlaceholder
							src={profileUrl as string}
							containerClasses="w-[160px] h-[160px] "
							imageClasses="rounded-full object-cover"
						/>
					) : (
						<ImagePlaceholder
							src={type === 'CAT' ? '/images/Cat.png' : '/images/Dog.png'}
							containerClasses="w-full h-[160px]"
							imageClasses="rounded-full object-cover"
						/>
					)}
					<label className="cursor-pointer w-[32px] h-[32px] z-3 rounded-full absolute bg-primary-1 flex items-center justify-center right-0 top-[26px] shadow-base3">
						<input type="file" onChange={onChange} className="w-full hidden" />
						<CameraIcon className="text-white" width={18} height={18} />
					</label>
				</div>
			</div>
			<form className="w-full mt-32">
				<TextInput disabled label="Name" {...register('name')} readonly />
				<div className="grid grid-cols-2 gap-12 mt-16">
					<TextInput disabled label="Breed" {...register('breed')} readonly />
					<TextInput disabled label="Gender" {...register('gender')} readonly />
				</div>
				<div className="grid grid-cols-2 gap-12 mt-16">
					<TextInput disabled label="Type" {...register('type')} readonly />
					<TextInput disabled label="Dob" {...register('dob')} readonly />
				</div>
			</form>
		</div>
	);
};

export default PetImage;

// 'use client';

// import { useGetPetById, useGetPetProfileImage, useUpdatePetImage } from '@webservices/api';
// import { createFormDataForImage } from '@webservices/helpers';
// import { useRouterQuery } from '@webservices/hooks';
// import { ButtonWrapper, ImagePlaceholder } from '@webservices/ui';

// const PetImage = () => {
// 	const { query } = useRouterQuery();
// 	const { data } = useGetPetProfileImage(query?.id as string);
// 	const { data: petData } = useGetPetById(query?.id as string);
// 	const { type } = petData?.data?.pet || {};
// 	const { mutate: updatePetImage } = useUpdatePetImage(query?.id as string);

// 	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// 		const file = e.target.files?.[0];
// 		if (file) {
// 			const formData = createFormDataForImage(file, 'file');
// 			updatePetImage(formData);
// 		}
// 	};

// 	return (
// 		<div className="">
// 			<div>
// 				{data?.data?.profileUrl && data?.data?.profileUrl !== '' ? (
// 					<ImagePlaceholder
// 						src={data?.data?.profileUrl as string}
// 						containerClasses={`w-full h-[175px]`}
// 						imageClasses={`rounded-10`}
// 					/>
// 				) : (
// <ImagePlaceholder
// 	src={type === 'CAT' ? '/images/Cat.png' : '/images/Dog.png'}
// 	containerClasses={`w-full h-[175px]`}
// 	imageClasses="rounded-10 object-cover"
// />
// 				)}
// 			</div>
// 			<label className="cursor-pointer z-10 bg-primary-1 flex items-center justify-center shadow-base mt-24 h-[54px] rounded-8">
// 				<input type="file" onChange={onChange} className="w-full hidden" />
// 				<ButtonWrapper>
// 					<span className="text-white font-black tracking-[-0.41px]">Upload</span>
// 				</ButtonWrapper>
// 			</label>
// 		</div>
// 	);
// };

// export default PetImage;
