import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Menu = () => {
    return (
        <section className="px-16 lg:px-0 flex flex-col lg:flex-row h-full">
            <section className='flex-1 gap-24 lg:gap-[60px] items-start flex flex-col lg:flex-row lg:items-center lg:justify-center'>
                <Link className='my-32 lg:hidden' href='/'>
                    <figure className='w-[93px] h-[38px] relative'>
                        <Image
                            fill
                            src='https://pemilyy-assets.s3.ap-south-1.amazonaws.com/logos-new/logo-primary.png'
                            alt='pemilyy'
                            style={{
                                objectFit: 'contain'
                            }}
                        />
                    </figure>
                </Link>
                <Link className='text-18 hover:text-brand lg:text-16 lg:leading-24 block lg:inline-block lg:w-auto w-full' href='/about'>
                    About Us
                </Link>
                <Link className='text-18 hover:text-brand lg:text-16 lg:leading-24 lg:inline-block lg:w-auto block w-full' href='/about'>
                    Services
                </Link>
                <Link className='text-18 hover:text-brand lg:text-16 lg:leading-24 lg:inline-block lg:w-auto block w-full' href='/about'>
                    Why Pemily
                </Link>
                <Link className='text-18 hover:text-brand lg:text-16 lg:leading-24 lg:w-auto block w-full lg:hidden' href='/about'>
                    Contact Us
                </Link>
            </section>
            <Link className='btn btn-primary btn-medium hidden lg:block' href='/'>
                Contact Us
            </Link>
        </section>
    );
};

export default Menu;
