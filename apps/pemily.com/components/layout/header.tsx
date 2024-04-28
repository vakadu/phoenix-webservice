'use client';

import Image from 'next/image';
import Link from 'next/link';

import Menu from './menu';

const Header = () => {

    return (
        <header className="h-[84px]">
            <section className="flex justify-between items-center h-full">
                <Link href='/'>
                    <figure className='w-[160px] h-[48px] relative'>
                        <Image
                            fill
                            src='https://pemilyy-assets.s3.ap-south-1.amazonaws.com/logos-new/logo-with-caption-primary.png'
                            alt='pemilyy'
                            style={{
                                objectFit: 'contain'
                            }}
                        />
                    </figure>
                </Link>
                <Menu/>
                <Link className='btn btn-primary btn-medium' href='/'>
                    Contact Us
                </Link>
            </section>
        </header>
    );
};

export default Header;
