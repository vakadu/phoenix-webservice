import Link from 'next/link';

import { ImagePlaceholder } from '@webservices/ui';
import { useSidebar } from '@webservices/hooks';

const Logo = ({ menuHover }: { menuHover: boolean }) => {
	const { collapsed, setMenuCollapsed } = useSidebar();

	return (
		<Link className="px-12 py-24 flex gap-12 items-end" href="/dashboard">
			<ImagePlaceholder
				src={
					collapsed && !menuHover
						? '/images/logo-1.jpg'
						: 'https://pemilyy-assets.s3.ap-south-1.amazonaws.com/logos-new/logo-primary.png'
				}
				containerClasses="h-[48px] flex-1"
				imageClasses="object-contain"
			/>
			{(!collapsed || menuHover) && (
				<span
					className={`h-18 w-18 border-[1.5px] border-black-3 rounded-full transition-all duration-150
                    ${collapsed ? '' : 'ring-2 ring-inset ring-offset-4 ring-black-3  bg-black-3 '}
                    `}
					onClick={() => setMenuCollapsed(!collapsed)}
				></span>
			)}
			<span></span>
		</Link>
	);
};

export default Logo;
