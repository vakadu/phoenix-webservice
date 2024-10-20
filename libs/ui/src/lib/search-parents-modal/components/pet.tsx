import { useGetPetProfileImage } from '@webservices/api';
import ButtonWrapper from '../../button-wrapper/button-wrapper';
import ImagePlaceholder from '../../image-placeholder/image-placeholder';

const Pet = ({
	pet,
	handlePet,
	height = 'h-[160px]',
	containerStyles,
}: {
	pet: ICommonTypes.IPet;
	handlePet: (pet: ICommonTypes.IPet) => void;
	height?: string;
	containerStyles?: string;
}) => {
	const { data } = useGetPetProfileImage(pet?.petId as string);

	return (
		<ButtonWrapper
			className={`border border-grey-border2 rounded-8 w-full ${containerStyles}`}
			onClick={() => handlePet(pet)}
		>
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
			<p className="font-semibold text-14 text-left pt-8">{pet.name}</p>
		</ButtonWrapper>
	);
};

export default Pet;
