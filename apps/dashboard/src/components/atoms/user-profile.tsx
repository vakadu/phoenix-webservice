import { useGetUserProfileUrl } from '@webservices/api';
import { UserIcon } from '@webservices/icons';
import { ImagePlaceholder } from '@webservices/ui';

const UserProfileImage = ({
	id,
	containerClasses = '',
	imageClasses = '',
	iconWidth = 160,
	iconHeight = 160,
	iconColor = '#D9D9D9',
}: {
	id: string;
	containerClasses?: string;
	imageClasses?: string;
	iconWidth?: number | string;
	iconHeight?: number | string;
	iconColor?: string;
}) => {
	const { data } = useGetUserProfileUrl(id as string);
	return (
		<>
			{data?.data?.profileUrl && data?.data?.profileUrl !== '' ? (
				<ImagePlaceholder
					src={data?.data?.profileUrl as string}
					containerClasses={`w-[160px] h-[160px] ${containerClasses}`}
					imageClasses={`rounded-full ${imageClasses}`}
				/>
			) : (
				<UserIcon color={iconColor} width={iconWidth} height={iconHeight} />
			)}
		</>
	);
};

export default UserProfileImage;
