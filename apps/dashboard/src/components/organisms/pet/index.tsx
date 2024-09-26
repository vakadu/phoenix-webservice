import PetTabs from '../../molecules/pet-details/details';
import PetImage from '../../molecules/pet-details/pet-image';

const PetDetails = () => {
	return (
		<section className="grid grid-cols-3 items-start gap-32 pb-42">
			<PetImage />
			<PetTabs />
		</section>
	);
};

export default PetDetails;
