import { useGetPetProfileImage } from '@webservices/api';
import { ButtonWrapper, ImagePlaceholder } from '@webservices/ui';

const Pet = ({
	pet,
	handlePet,
	height = 'h-[160px]',
}: {
	pet: ICommonTypes.IPet;
	handlePet: (pet: ICommonTypes.IPet) => void;
	height?: string;
}) => {
	const { data } = useGetPetProfileImage(pet?.petId as string);

	return (
		<ButtonWrapper className="border p-8 rounded-8" onClick={() => handlePet(pet)}>
			{data?.data?.profileUrl && data?.data?.profileUrl !== '' ? (
				<ImagePlaceholder
					src={data?.data?.profileUrl as string}
					containerClasses={`w-full ${height}`}
					imageClasses={`rounded-10 object-cover`}
				/>
			) : (
				<ImagePlaceholder
					src={pet.type === 'CAT' ? '/images/Cat.png' : '/images/Dog.png'}
					containerClasses={`w-full ${height}`}
					imageClasses="rounded-10 object-cover"
				/>
			)}
			<p className="font-semibold text-left pt-8">{pet.name}</p>
		</ButtonWrapper>
	);
};

export default Pet;
