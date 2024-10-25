import ClinicDetails from './components/clinic-details';
import UserDetails from './components/user-details';

export function DashboardLayoutHeader({ scrolled }: { scrolled: boolean }) {
	return (
		<header
			className={`fixed w-[calc(100vw-282px)] top-0 ml-[282px] pr-16 transition-all duration-150 z-[99] bg-grey-bg3 ${
				scrolled && 'shadow-2'
			}`}
		>
			<div className="py-24 gap-12 flex justify-between items-center">
				<ClinicDetails />
				<div>
					<UserDetails />
				</div>
			</div>
		</header>
	);
}

export default DashboardLayoutHeader;
