import AboutPet from '../../molecules/pet-details/details';
import PetImage from '../../molecules/pet-details/pet-image';

const PetDetails = () => {
	return (
		<section className="grid grid-cols-3 items-start gap-32 pb-42">
			<PetImage />
			{/* <div className="col-span-1">
				<PetImage />
			</div>
			<div className="col-span-4">
				<AboutPet />
			</div> */}
		</section>
	);
};

export default PetDetails;
