import { useSelector } from 'react-redux';

import { useGetUserProfileUrl } from '@webservices/api';
import { PemilyRootState } from '@webservices/slices';
import { Button, ButtonWrapper, ImagePlaceholder } from '@webservices/ui';
import { CameraIcon, UserIcon } from '@webservices/icons';

const ProfileImage = () => {
	const authState = useSelector((state: PemilyRootState) => state.auth);
	const { data } = useGetUserProfileUrl(authState.userId as string);

	return (
		<section className="flex flex-col items-center">
			<section className="border-[2px] border-primary-1 rounded-full p-4 relative w-[215px] h-[215px] flex justify-center items-center">
				{data?.data?.profileUrl && data?.data?.profileUrl !== '' ? (
					<ImagePlaceholder
						src={data?.data?.profileUrl as string}
						containerClasses="w-[208px] h-[208px] "
						imageClasses="rounded-full"
					/>
				) : (
					<UserIcon width={208} height={208} />
				)}
			</section>
			<section className="mt-32">
				<Button className="flex gap-12">
					<CameraIcon className="text-white" width={24} height={24} />
					<span>Upload Photo</span>
				</Button>
			</section>

			{/* <ButtonWrapper className="!absolute bottom-32 right-0 bg-white w-42 h-42 rounded-full flex justify-center items-center shadow-base">
				<CameraIcon className="text-primary-1" width={32} height={32} />
			</ButtonWrapper> */}
		</section>
	);
};

export default ProfileImage;
