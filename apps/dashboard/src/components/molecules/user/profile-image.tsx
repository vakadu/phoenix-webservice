import { useGetUserProfileUrl, useUploadUserProfile } from '@webservices/api';
import { ImagePlaceholder } from '@webservices/ui';
import { CameraIcon, UserIcon } from '@webservices/icons';
import { createFormDataForImage } from '@webservices/helpers';

const UserProfileImage = ({ id }: { id: string }) => {
	const { data } = useGetUserProfileUrl(id as string);
	const { mutate: uploadUserProfile } = useUploadUserProfile(id as string);

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const formData = createFormDataForImage(file, 'file');
			uploadUserProfile(formData);
		}
	};

	return (
		<section className="flex flex-col items-center">
			<section className="border-[2px] border-primary-1 rounded-full p-4 w-[168px] h-[168px] flex justify-center items-center relative">
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

export default UserProfileImage;
