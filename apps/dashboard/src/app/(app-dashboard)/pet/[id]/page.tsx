import PetImage from '../../../../pet-details/components/pet-image';

const Page = () => {
	return (
		<section className="grid grid-cols-3 items-start gap-32 pb-42">
			<PetImage />
			{/* <PetTabs /> */}
		</section>
	);
};

export default Page;
