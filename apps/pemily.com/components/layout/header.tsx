'use client';

import Image from 'next/image';
import Link from 'next/link';

import Menu from './menu';
import { MenuIcon } from '@webservices/icons';
import { ButtonWrapper } from '@webservices/ui';
import { useMobileMenu } from '@webservices/hooks';
import MobileMenu from './mobile-menu';

const Header = () => {
	const { mobileMenu, setMobileMenu } = useMobileMenu();

	const handleMenu = () => {
		setMobileMenu(!mobileMenu);
	};

	return (
		<header className="h-[84px] px-16 lg:px-[60px]">
			<section className="flex justify-between items-center h-full">
				<Link href="/">
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
				</Link>
				<section className="hidden lg:block flex-1">
					<Menu />
				</section>
				<ButtonWrapper onClick={handleMenu} className="lg:hidden">
					<MenuIcon width={40} height={40} />
				</ButtonWrapper>
				<MobileMenu mobileMenu={mobileMenu} setMobileMenu={setMobileMenu} />
			</section>
		</header>
	);
};

export default Header;
