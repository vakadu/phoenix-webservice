import Link from 'next/link';

import { ImagePlaceholder } from '@webservices/ui';

const Logo = () => {
	return (
		<Link className={`px-12 flex gap-12`} href="/medical-records">
			<ImagePlaceholder
				src="https://pemilyy-assets.s3.ap-south-1.amazonaws.com/logos-new/logo-primary.png"
				containerClasses="h-[48px] flex-1"
				imageClasses="object-contain"
			/>
		</Link>
	);
};

export default Logo;
