import { ButtonWrapper } from '@webservices/ui';
import UserProfileImage from './user-profile';

const PetParent = ({
	parent,
	handlePetParent,
	active = false,
}: {
	parent: IClinicTypes.IPetParent;
	handlePetParent: (p: IClinicTypes.IPetParent) => void;
	active?: boolean;
}) => {
	return (
		<ButtonWrapper
			onClick={() => handlePetParent(parent)}
			className={`px-12 border mb-12 rounded-6 py-12 w-full ${
				active ? 'bg-brand' : 'bg-white'
			}`}
		>
			<section className="flex gap-24">
				<UserProfileImage
					id={parent?.parent?.parentId}
					containerClasses="w-[52px] h-[52px]"
					imageClasses="!rounded-8"
					iconHeight={52}
					iconWidth={52}
					iconColor={active ? '#FFF' : '#D9D9D9'}
				/>
				<section className={`flex-1 ${active ? 'text-white' : 'text-black-1'}`}>
					<p className="text-16 font-medium text-left">{parent?.parent?.name}</p>
					<p className="leading-[30px] text-left text-14">
						Pets: {parent?.parent?.petNames.join(',')}
					</p>
					<p className="leading-[30px] text-left text-14">{parent?.parent?.mobile}</p>
				</section>
			</section>
		</ButtonWrapper>
	);
};

export default PetParent;
