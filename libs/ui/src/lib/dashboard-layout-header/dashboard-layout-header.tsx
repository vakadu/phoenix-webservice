import ClinicDetails from './components/clinic-details';
import UserDetails from './components/user-details';

export function DashboardLayoutHeader() {
	return (
		<header className="sticky top-0 ml-[282px] pr-16 transition-all duration-150 z-[99] bg-grey-bg3">
			<div className="py-12 gap-12 flex justify-between items-center">
				<ClinicDetails />
				<div>
					<UserDetails />
				</div>
			</div>
		</header>
	);
}

export default DashboardLayoutHeader;
