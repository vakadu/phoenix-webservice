'use client';

import { ImagePlaceholder } from '@webservices/ui';

const Loading = () => {
	return (
		<section className="min-h-screen flex flex-col justify-center items-center ">
			<section className="relative w-[100px] h-[100px] flex justify-center items-center bg-white rounded-full shadow-base">
				<ImagePlaceholder
					src="/images/logo.jpg"
					containerClasses="h-[64px] w-[52px] rounded-full"
					imageClasses="object-contain"
				/>
				<section className="absolute inset-0 rounded-full border-2 border-t-primary-1 border-transparent animate-spin"></section>
			</section>
		</section>
	);
};

export default Loading;
