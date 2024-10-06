import Link from 'next/link';
import ImagePlaceholder from '../image-placeholder/image-placeholder';

export function DashboardLayoutSidebar() {
	return (
		<nav className="w-[282px] fixed h-screen top-0 z-[11] transition-width duration-200 ease-ease1 bg-white shadow-base">
			<div className="p-24">
				<Link className={`px-12 flex gap-12`} href="/medical-records">
					<ImagePlaceholder
						src="https://pemilyy-assets.s3.ap-south-1.amazonaws.com/logos-new/logo-primary.png"
						containerClasses="h-[48px] flex-1"
						imageClasses="object-contain"
					/>
				</Link>
			</div>
		</nav>
	);
}

export default DashboardLayoutSidebar;
