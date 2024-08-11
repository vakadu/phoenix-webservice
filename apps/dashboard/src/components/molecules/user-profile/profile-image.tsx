import { useSelector } from 'react-redux';

import { useGetUserProfileUrl, useUploadUserProfile } from '@webservices/api';
import { PemilyRootState } from '@webservices/slices';
import { ImagePlaceholder } from '@webservices/ui';
import { CameraIcon, UserIcon } from '@webservices/icons';
import { createFormDataForImage } from '@webservices/helpers';

const ProfileImage = () => {
	const authState = useSelector((state: PemilyRootState) => state.auth);
	const { data } = useGetUserProfileUrl(authState.userId as string);
	const { mutate: uploadUserProfile } = useUploadUserProfile();

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const formData = createFormDataForImage(file, 'file');
			uploadUserProfile(formData);
		}
	};

	return (
		<section className="flex flex-col items-center bg-grey-2 h-[154px] relative">
			<section className="border-[2px] border-primary-1 rounded-full p-4 w-[168px] h-[168px] flex justify-center items-center absolute top-[100%] left-1/2 -translate-y-1/2 -translate-x-1/2 bg-white">
				{data?.data?.profileUrl && data?.data?.profileUrl !== '' ? (
					<ImagePlaceholder
						src={data?.data?.profileUrl as string}
						containerClasses="w-[160px] h-[160px] "
						imageClasses="rounded-full"
					/>
				) : (
					<UserIcon width={160} height={160} />
				)}
				<label className="cursor-pointer w-[42px] h-[42px] z-10 rounded-full absolute bg-primary-1 flex items-center justify-center shadow-base right-0 top-[106px]">
					<input type="file" onChange={onChange} className="w-full hidden" />
					<CameraIcon className="text-white" width={24} height={24} />
				</label>
			</section>
		</section>
	);
};

export default ProfileImage;
