import Link from 'next/link';

import ImagePlaceholder from '../image-placeholder/image-placeholder';
import NavMenu from './components/menu';
import { logEvent } from '@webservices/services';
import { USER_EVENTS } from '@webservices/primitives';

export function DashboardLayoutSidebar() {
	const handleEvent = () => {
		logEvent({ name: USER_EVENTS.LOGO_CLICK });
	};

	return (
		<nav className="w-[282px] fixed h-screen top-0 z-[11] transition-width duration-200 ease-ease1">
			<div className="p-24 flex flex-col gap-24">
				<Link onClick={handleEvent} className={`px-12 flex gap-12`} href="/medical-records">
					<ImagePlaceholder
						src="https://pemilyy-assets.s3.ap-south-1.amazonaws.com/logos-new/logo-primary.png"
						containerClasses="h-[48px] flex-1"
						imageClasses="object-contain"
					/>
				</Link>
				<NavMenu />
			</div>
		</nav>
	);
}

export default DashboardLayoutSidebar;
