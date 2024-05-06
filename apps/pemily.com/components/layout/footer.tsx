import Link from 'next/link';
import Image from 'next/image';

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
					<p className="py-16  lg:py-12  text-14 leading-20 text-white">
						Copyright © {new Date().getFullYear()} Veena Tech.
					</p>
					<address className="text-white text-12 pb-32 lg:pb-24">
						Address: FIFTH FLOOR,NO 51, OLD SITE NO 1,KOKARYA, BUSINESS SYNERGY CENTER,
						5TH MAIN , 5TH BLOCK, JAYANAGAR, Bengaluru,Karnataka - 560011
					</address>
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
				</section>
			</section>
		</footer>
	);
};

export default Footer;
