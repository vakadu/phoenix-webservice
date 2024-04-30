import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
	return (
		<section className="relative">
			<figure className="relative h-[calc(100vh-120px)]">
				<Image
					alt="Mountains"
					src="/images/hero.jpeg"
					quality={100}
					sizes="100vw"
					fill
					className="object-cover"
				/>
			</figure>

			<section className="flex flex-col justify-center absolute top-1/2 -translate-y-1/2 px-16 lg:px-[144px]">
				<h1 className="text-[64px] leading-[76px] text-center lg:text-left text-white drop-shadow-text1 font-bold max-w-[650px]">
					Tender care for your beloved furry family.
				</h1>
				<p className="text-16 leading-24 text-white py-24 text-center lg:text-left">
					Professional pet care at your door step
				</p>
				<section className="flex gap-12 lg:gap-30">
					<Link
						href="https://play.google.com/store/apps/details?id=com.pemilyy.android"
						className="grid grid-cols-3 justify-items-center content-center max-w[220px] w-full lg:w-[220px] bg-black-bg2 h-[65px] lg:h-[78px] px-20 py-12 border border-white rounded-[12px]"
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
						className="grid grid-cols-3 max-w[220px] justify-items-center content-center w-full lg:w-[220px] bg-black-bg2 h-[65px] lg:h-[78px] px-20 py-12 border border-white rounded-[12px]"
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
