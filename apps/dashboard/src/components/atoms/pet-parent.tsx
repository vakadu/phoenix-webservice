import { ButtonWrapper } from '@webservices/ui';
import UserProfileImage from './user-profile';

const PetParent = ({ parent }: { parent: IClinicTypes.IPetParent }) => {
	return (
		<ButtonWrapper className="px-12 border mb-12 rounded-6 py-12 w-full">
			<section className="flex gap-24">
				<UserProfileImage
					id={parent?.parent?.parentId}
					containerClasses="w-[52px] h-[52px]"
					imageClasses="!rounded-8"
					iconHeight={52}
					iconWidth={52}
				/>
				<section className="flex-1">
					<p className="text-16 font-medium text-left">{parent?.parent?.name}</p>
					<p className="leading-[30px] text-left">
						Pets: {parent?.parent?.petNames.join(',')}
					</p>
					<p className="leading-[30px] text-left">{parent?.parent?.mobile}</p>
				</section>
			</section>
		</ButtonWrapper>
	);
};

export default PetParent;
