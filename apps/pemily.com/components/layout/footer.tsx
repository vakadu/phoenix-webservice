import Link from 'next/link';
import Image from 'next/image';
import { ImagePlaceholder } from '@webservices/ui';

const Footer = () => {
	return (
		<footer className="bg-black-bg px-16 py-24 lg:py-[64px] lg:px-[165px]">
			<section className="grid lg:grid-cols-3">
				<section className="col-span-1">
					<Link href="/">
						<figure className="w-[93px] h-[38px] relative">
							<Image
								fill
								src="https://pemilyy-assets.s3.ap-south-1.amazonaws.com/logos-new/logo-white-1.png"
								alt="pemilyy"
								style={{
									objectFit: 'contain',
								}}
							/>
						</figure>
					</Link>
					<p className="py-16  lg:py-24  text-14 leading-20 text-white">
						Copyright © {new Date().getFullYear()} Veena Tech.
					</p>
					<section className="flex pb-16 lg:pb-24">
						<Link
							className="pr-12"
							target="_blank"
							href="https://www.instagram.com/_pemilyy"
						>
							<ImagePlaceholder
								containerClasses="w-32 h-32"
								src="/icons/instagram.svg"
							/>
						</Link>
						<Link
							className="pr-12"
							target="_blank"
							href="https://www.youtube.com/@_pemilyy"
						>
							<ImagePlaceholder
								containerClasses="w-32 h-32"
								src="/icons/youtube.svg"
							/>
						</Link>
					</section>
				</section>
				<section className="col-span-2 grid grid-cols-2 lg:grid-cols-3 gap-24 text-white">
					<section className="col-span-1">
						<p className="text-20 font-semibold leading-28 mb-10 lg:mb-28">Company</p>
						<ul>
							<li className="py-8">
								<Link
									className="text-14 leading-20 lg:text-16 lg:leading-24"
									href="/about"
								>
									About Us
								</Link>
							</li>
							<li className="py-8">
								<Link
									className="text-14 leading-20 lg:text-16 lg:leading-24"
									href="/"
								>
									Services
								</Link>
							</li>
							<li className="py-8">
								<Link
									className="text-14 leading-20 lg:text-16 lg:leading-24"
									href="/"
								>
									Why Pemilyy
								</Link>
							</li>
						</ul>
					</section>
					<section className="col-span-1">
						<p className="text-20 font-semibold leading-28 mb-10 lg:mb-28">Support</p>
						<ul>
							<li className="py-8">
								<Link
									className="text-14 leading-20 lg:text-16 lg:leading-24"
									href="/privacy"
								>
									Privacy Policy
								</Link>
							</li>
							<li className="py-8">
								<Link
									className="text-14 leading-20 lg:text-16 lg:leading-24"
									href="/terms"
								>
									Terms of service
								</Link>
							</li>
							<li className="py-8">
								<Link
									className="text-14 leading-20 lg:text-16 lg:leading-24"
									href="/refund-policy"
								>
									Refund Policy
								</Link>
							</li>
						</ul>
					</section>
					{/* <section className="col-span-1">
						<p className="text-20 font-semibold leading-28">Stay up to date</p>
					</section> */}
					<section className="col-span-1">
						<p className="text-20 font-semibold leading-28 mb-10 lg:mb-28">Contact</p>
						<ul>
							<li className="py-8">
								<p className="text-14 leading-20 text-white">
									Email:{' '}
									<a className="font-medium" href="mailto:care@pemilyy.com">
										care@pemilyy.com
									</a>
								</p>
							</li>
							<li className="py-8">
								<p className="text-14 leading-20 text-white">
									Mobile Number:{' '}
									<a className="font-medium" href="tel:7047037587">
										+91 70470 37587
									</a>
								</p>
							</li>
							<li className="py-8">
								<address className="text-white text-12">
									Address: FIFTH FLOOR,NO 51, OLD SITE NO 1,KOKARYA, BUSINESS
									SYNERGY CENTER, 5TH MAIN , 5TH BLOCK, JAYANAGAR,
									Bengaluru,Karnataka - 560011
								</address>
							</li>
						</ul>
					</section>
				</section>
			</section>
		</footer>
	);
};

export default Footer;
