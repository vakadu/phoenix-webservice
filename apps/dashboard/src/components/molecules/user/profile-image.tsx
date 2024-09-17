import { useGetUserProfileUrl, useUpdateClinicMemberProfile } from '@webservices/api';
import { ButtonWrapper, ImagePlaceholder } from '@webservices/ui';
import { UserIcon } from '@webservices/icons';
import { createFormDataForImage } from '@webservices/helpers';

const UserProfileImage = ({ id }: { id: string }) => {
	const { data } = useGetUserProfileUrl(id as string);
	const { mutate: uploadClinicMemberProfile } = useUpdateClinicMemberProfile(id as string);

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const formData = createFormDataForImage(file, 'file');
			uploadClinicMemberProfile(formData);
		}
	};

	return (
		<div className="">
			<div className="flex justify-center items-center">
				{data?.data?.profileUrl && data?.data?.profileUrl !== '' ? (
					<ImagePlaceholder
						src={data?.data?.profileUrl as string}
						containerClasses={`w-full h-[175px]`}
						imageClasses={`rounded-10`}
					/>
				) : (
					<UserIcon width={175} height={175} />
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

export default UserProfileImage;
