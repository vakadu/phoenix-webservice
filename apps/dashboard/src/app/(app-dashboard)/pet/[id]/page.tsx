import PetTabs from '../../../../features/pet-details/components/pet-tabs';
import PetImage from '../../../../features/pet-details/components/pet-image';

const Page = () => {
	return (
		<section className="grid grid-cols-4 items-start gap-16 pb-42">
			<PetImage />
			<PetTabs />
		</section>
	);
};

export default Page;
