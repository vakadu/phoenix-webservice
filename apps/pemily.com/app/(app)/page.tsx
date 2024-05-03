import Services from '../../components/home/services';
import Hero from '../../components/home/hero';
import PetOwners from '../../components/home/pet-owners';
import Booking from '../../components/home/booking';
import Why from '../../components/home/why';

export default function Home() {
	return (
		<>
			<Hero />
			<Services />
			<Why />
			<PetOwners />
			<Booking />
		</>
	);
}
