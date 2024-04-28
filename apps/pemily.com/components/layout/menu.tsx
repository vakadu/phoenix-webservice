import React from 'react';
import Link from 'next/link';

const Menu = () => {
    return (
        <section className="flex-1 flex justify-center items-center gap-32">
            <Link className='text-16 leading-24' href='/about'>
                About Us
            </Link>
            <Link className='text-16 leading-24' href='/about'>
                Services
            </Link>
            <Link className='text-16 leading-24' href='/about'>
                Why Pemily
            </Link>
        </section>
    );
};

export default Menu;
