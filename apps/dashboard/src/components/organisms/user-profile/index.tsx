import ProfileImage from '../../molecules/user-profile/profile-image';
import UserTabs from '../../molecules/user-profile/tabs';

const UserProfile = () => {
	return (
		<section className="grid grid-cols-3 items-start gap-32">
			<ProfileImage />
			<UserTabs />
		</section>
	);
};

export default UserProfile;
