import { useSelector } from 'react-redux';

import { PemilyRootState } from '@webservices/slices';
import { Dropdown } from '@webservices/ui';

const Header = ({ sidebarClasses }: { sidebarClasses: string }) => {
	const authState = useSelector((state: PemilyRootState) => state.auth);

	return (
		<header className="sticky top-0">
			<section className={`py-24 px-16 bg-white shadow-base flex ${sidebarClasses}`}>
				<section className="flex-1"></section>
				<section className="flex-1 flex justify-end">
					<Dropdown />
				</section>
			</section>
		</header>
	);
};

export default Header;
