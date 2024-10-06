import ClinicDetails from './components/clinic-details';
import UserDetails from './components/user-details';

export function DashboardLayoutHeader() {
	return (
		<header className="sticky top-0 bg-white ml-[282px] transition-all duration-150 z-[99]">
			<div className="py-12 shadow-base px-24 gap-12 flex justify-between items-center">
				<ClinicDetails />
				<div>
					<UserDetails />
				</div>
			</div>
		</header>
	);
}

export default DashboardLayoutHeader;
