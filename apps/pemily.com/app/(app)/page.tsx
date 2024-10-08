import Services from '../../components/home/services';
import Hero from '../../components/home/hero';
// import PetOwners from '../../components/home/pet-owners';
import Booking from '../../components/home/booking';
import Why from '../../components/home/why';
import Features from '../../components/home/features';
import Contact from '../../components/home/contact';

export default function Home() {
	return (
		<>
			<Hero />
			<Services />
			<Why />
			<Features />
			{/* <PetOwners /> */}
			<Booking />
			<Contact />
		</>
	);
}
