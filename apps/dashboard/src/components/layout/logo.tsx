import Link from 'next/link';

import { ImagePlaceholder } from '@webservices/ui';
import { useSidebar } from '@webservices/hooks';

const Logo = ({ menuHover }: { menuHover: boolean }) => {
	const { collapsed } = useSidebar();

	return (
		<Link className="px-12 flex gap-12 items-end" href="/dashboard">
			<ImagePlaceholder
				src={
					collapsed && !menuHover
						? '/images/logo-1.jpg'
						: 'https://pemilyy-assets.s3.ap-south-1.amazonaws.com/logos-new/logo-primary.png'
				}
				containerClasses="h-[48px] flex-1"
				imageClasses="object-contain"
			/>
		</Link>
	);
};

export default Logo;
