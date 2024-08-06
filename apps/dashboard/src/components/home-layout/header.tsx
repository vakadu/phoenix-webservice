import { useSelector } from 'react-redux';

import { PemilyRootState } from '@webservices/slices';

const Header = () => {
	const authState = useSelector((state: PemilyRootState) => state.auth);
	console.log(authState);

	return (
		<header className="sticky top-0">
			<section className="py-24 px-16 bg-white shadow-2 flex">
				<section className="flex-1"></section>
				<section className="flex-1 flex justify-end">
					<span>{authState.mobile}</span>
				</section>
			</section>
		</header>
	);
};

export default Header;
