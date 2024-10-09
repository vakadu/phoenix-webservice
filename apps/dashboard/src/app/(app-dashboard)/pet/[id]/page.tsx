import PetTabs from '../../../../pet-details/components/pet-tabs';
import PetImage from '../../../../pet-details/components/pet-image';

const Page = () => {
	return (
		<section className="grid grid-cols-3 items-start gap-32 pb-42 mt-32">
			<PetImage />
			<PetTabs />
		</section>
	);
};

export default Page;
