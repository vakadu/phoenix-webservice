import ProfileImage from '../../../user-profile/components/profile-image';
import UserTabs from '../../../user-profile/components/tabs';

const Page = () => {
	return (
		<section className="grid grid-cols-3 items-start gap-32">
			<ProfileImage />
			<UserTabs />
		</section>
	);
};

export default Page;
