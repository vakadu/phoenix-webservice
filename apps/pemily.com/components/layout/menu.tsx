import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { useScrollTop } from '@webservices/hooks';
import { Button } from '@webservices/ui';

const Menu = () => {
	const { scrollToBottom } = useScrollTop();

	return (
		<section className="px-16 lg:px-0 flex flex-col lg:flex-row h-full">
			<section className="flex-1 gap-24 lg:gap-[60px] items-start flex flex-col lg:flex-row lg:items-center lg:justify-center">
				<Link className="my-32 lg:hidden" href="/">
					<figure className="w-[93px] h-[38px] relative">
						<Image
							fill
							src="https://pemilyy-assets.s3.ap-south-1.amazonaws.com/logos-new/logo-primary.png"
							alt="pemilyy"
							style={{
								objectFit: 'contain',
							}}
						/>
					</figure>
				</Link>
				<Link
					className="text-18 hover:text-brand lg:text-16 lg:leading-24 block lg:inline-block lg:w-auto w-full"
					href="/about"
				>
					About Us
				</Link>
				<Link
					className="text-18 hover:text-brand lg:text-16 lg:leading-24 lg:inline-block lg:w-auto block w-full"
					href="#services"
					scroll={false}
				>
					Services
				</Link>
				<Link
					className="text-18 hover:text-brand lg:text-16 lg:leading-24 lg:inline-block lg:w-auto block w-full"
					href="#why"
				>
					Why Pemilyy
				</Link>
				<Link
					className="text-18 hover:text-brand lg:text-16 lg:leading-24 lg:inline-block lg:w-auto block w-full"
					href="#features"
				>
					Features
				</Link>
				<Link
					className="text-18 hover:text-brand lg:text-16 lg:leading-24 lg:w-auto block w-full lg:hidden"
					href="#contact"
				>
					Contact Us
				</Link>
			</section>
			<Button onClick={scrollToBottom} size="medium" className="hidden lg:block">
				Contact Us
			</Button>
		</section>
	);
};

export default Menu;
