import PetImage from './ui/pet-image';
import PetTabs from './ui/pet-tabs';

const Page = () => {
	return (
		<section className="grid grid-cols-4 items-start gap-16 pb-42">
			<PetImage />
			<PetTabs />
		</section>
	);
};

export default Page;
