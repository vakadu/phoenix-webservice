import { useGetPetProfileImage } from '@webservices/api';
import { ButtonWrapper, ImagePlaceholder } from '@webservices/ui';

const Pet = ({
	pet,
	handlePet,
}: {
	pet: ICommonTypes.IPet;
	handlePet: (pet: ICommonTypes.IPet) => void;
}) => {
	const { data } = useGetPetProfileImage(pet?.petId as string);

	return (
		<ButtonWrapper onClick={() => handlePet(pet)}>
			{data?.data?.profileUrl && data?.data?.profileUrl !== '' ? (
				<ImagePlaceholder
					src={data?.data?.profileUrl as string}
					containerClasses={`w-[160px] h-[160px]`}
					imageClasses={`rounded-full`}
				/>
			) : (
				<ImagePlaceholder
					src={pet.type === 'CAT' ? '/images/Cat.png' : '/images/Dog.png'}
					containerClasses={`w-full h-[175px]`}
					imageClasses="rounded-10 object-cover"
				/>
			)}
			<p className="font-semibold text-left pt-8">{pet.name}</p>
		</ButtonWrapper>
	);
};

export default Pet;
