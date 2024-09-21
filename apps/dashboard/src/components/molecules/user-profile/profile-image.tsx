'use client';

import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { useGetUser, useGetUserProfileUrl, useUploadUserProfile } from '@webservices/api';
import { PemilyRootState } from '@webservices/slices';
import { ImagePlaceholder, TextInput } from '@webservices/ui';
import { CameraIcon, UserIcon } from '@webservices/icons';
import { createFormDataForImage } from '@webservices/helpers';

const ProfileImage = () => {
	const authState = useSelector((state: PemilyRootState) => state.auth);
	const { data: profileData } = useGetUserProfileUrl(authState.userId as string);
	const { data: userData } = useGetUser(authState.userId as string);
	const { mutate: uploadUserProfile } = useUploadUserProfile();
	const { profileUrl } = profileData?.data || {};
	const { name, mobile, email } = userData?.data?.user || {};
	const { register, setValue } = useForm();

	useEffect(() => {
		setValue('name', name);
		setValue('mobile', mobile);
		setValue('email', email);
	}, [email, mobile, name]);

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const formData = createFormDataForImage(file, 'file');
			uploadUserProfile(formData);
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
						<UserIcon width={160} height={160} />
					)}
					<label className="cursor-pointer w-[32px] h-[32px] z-3 rounded-full absolute bg-primary-1 flex items-center justify-center right-0 top-[26px] shadow-base3">
						<input type="file" onChange={onChange} className="w-full hidden" />
						<CameraIcon className="text-white" width={18} height={18} />
					</label>
				</div>
			</div>
			<form className="w-full mt-32 gap-24 flex flex-col">
				<TextInput label="Name" {...register('name')} readonly />
				<TextInput label="Email" {...register('email')} readonly />
				<TextInput label="Mobile Number" {...register('mobile')} readonly />
			</form>
		</div>
	);
};

export default ProfileImage;
