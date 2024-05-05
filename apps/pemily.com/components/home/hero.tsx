import Image from 'next/image';
import Link from 'next/link';

import { ImagePlaceholder } from '@webservices/ui';

const Hero = () => {
	return (
		<section className="relative">
			<ImagePlaceholder
				containerClasses="h-[calc(100vh-120px)] hidden lg:block"
				alt="Pemilyy"
				src="/images/hero-1.jpeg"
				imageClasses="object-cover"
			/>
			<ImagePlaceholder
				containerClasses="h-[calc(100vh-420px)] lg:hidden"
				alt="Pemilyy"
				src="/images/hero-mobile.jpg"
				imageClasses="object-cover"
			/>
			<section className="flex flex-col justify-center lg:absolute pt-32 lg:pt-0 lg:top-1/2 lg:-translate-y-1/2 px-16 lg:px-[144px]">
				<h1 className="text-[64px] leading-[76px] text-center lg:text-left lg:text-white drop-shadow-text1 font-bold max-w-[650px]">
					Your Digital Pet Clinic Companion.
				</h1>
				<p className="text-16 leading-24 lg:text-white py-24 text-center lg:text-left">
					Transitioning Your Pet Clinic into the Digital Age with Our Advanced Platform
				</p>
				<section className="flex gap-12 lg:gap-30">
					<Link
						href="https://play.google.com/store/apps/details?id=com.pemilyy.android"
						className="grid grid-cols-3 justify-items-center items-center max-w[220px] w-full lg:w-[220px] bg-black-bg2 h-[65px] lg:h-[78px] px-20 py-12 border border-white rounded-[12px]"
						target="_blank"
					>
						<figure className="relative h-[24px] w-[24px] lg:h-[32px] lg:w-[32px] col-span-1">
							<Image
								alt="play-store"
								src="/icons/play-store.svg"
								quality={100}
								sizes="100vw"
								fill
								className="object-contain"
							/>
						</figure>
						<p className="col-span-2 text-white">
							<span className="block text-12 leading-15">Get it on</span>
							<span className="text-16 lg:text-20 lg:leading-25">Google Play</span>
						</p>
					</Link>
					<Link
						href="https://apps.apple.com/us/app/pemilyy/id6474898482"
						className="grid grid-cols-3 max-w[220px] justify-items-center items-center w-full lg:w-[220px] bg-black-bg2 h-[65px] lg:h-[78px] px-20 py-12 border border-white rounded-[12px]"
						target="_blank"
					>
						<figure className="relative h-[32px] w-[32px] col-span-1">
							<Image
								alt="app-store"
								src="/icons/app-store.svg"
								quality={100}
								sizes="100vw"
								fill
								className="object-contain"
							/>
						</figure>
						<p className="col-span-2 text-white">
							<span className="block text-12 leading-15">Download on the</span>
							<span className="text-16 lg:text-20 lg:leading-25">App Store</span>
						</p>
					</Link>
				</section>
			</section>
		</section>
	);
};

export default Hero;
