'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { stickyNav } from '@webservices/helpers';

const Header = () => {
    
    useEffect(() => {
        window.addEventListener('scroll', stickyNav);
    }, []);

    return (
        <header
            className="header absolute top-0 left-0 px-12 py-12 lg:px-30 lg:py-18 w-full z-[90] transition-all 
            duration-0.3 ease-smooth-header"
        >
            <section className="flex justify-between items-center max-w-[1300px] mx-auto">
                <Link href='/'>
                    <figure className='w-[160px] h-[48px] relative'>
                        <Image
                            fill
                            src='/images/logo.png'
                            alt='pemilyy'
                            style={{
                                objectFit: 'contain'
                            }}
                        />
                    </figure>
                </Link>
                <section className="flex-1 flex flex-col justify-end items-end">
                    <Link className='text-14 font-semibold' href='/about'>
                        About Us
                    </Link>
                </section>
            </section>
        </header>
    );
};

export default Header;
