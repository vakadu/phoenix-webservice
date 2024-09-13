import Pets from '../user/pets';
import UserProfileImage from '../user/profile-image';

const ParentDetails = ({ parentId }: { parentId: string }) => {
	return (
		<div className="sticky top-[calc(72px)] bg-white w-full shadow-base col-span-2 rounded-8 h-[calc(100vh-160px)] overflow-y-scroll no-scrollbar">
			<UserProfileImage id={parentId} />
			<Pets id={parentId} />
		</div>
	);
};

export default ParentDetails;
