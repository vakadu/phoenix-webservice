import AboutPet from '../../molecules/pet-details/details';
import PetImage from '../../molecules/pet-details/pet-image';

const PetDetails = () => {
	return (
		<section className="grid grid-cols-5 px-16 gap-[42px]">
			<div className="col-span-1">
				<PetImage />
			</div>
			<div className="col-span-4">
				<AboutPet />
			</div>
		</section>
	);
};

export default PetDetails;
