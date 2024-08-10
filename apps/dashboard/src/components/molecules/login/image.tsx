'use client';

import Image from 'next/image';

const LoginImage = () => {
	return (
		<section className="flex-1 bg-grey-4 flex items-center justify-center h-full">
			<figure className="w-[108px] h-[61px] lg:w-[160px] lg:h-[48px] relative">
				<Image
					fill
					src="https://pemilyy-assets.s3.ap-south-1.amazonaws.com/logos-new/logo-with-caption-primary.png"
					alt="pemilyy"
					style={{
						objectFit: 'contain',
					}}
				/>
			</figure>
		</section>
	);
};

export default LoginImage;
