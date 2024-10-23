import { memo } from 'react';

import { useGetPetProfileImage } from '@webservices/api';
import ImagePlaceholder from '../../image-placeholder/image-placeholder';

const Pet = ({
	pet,
	height = 'h-[160px]',
	containerStyles,
	index,
}: {
	pet: ICommonTypes.IPet;
	height?: string;
	containerStyles?: string;
	index?: number;
}) => {
	const { data } = useGetPetProfileImage(pet?.petId as string);

	return (
		<div
			className={`cursor-pointer rounded-8 w-full ${containerStyles}`}
			data-id={pet.petId}
			data-index={index}
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
		</div>
	);
};

export default memo(Pet);
