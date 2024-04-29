import Link from "next/link";
import Image from 'next/image';

const Footer = () => {
    return (
        <footer className="bg-black-bg px-16 py-24 lg:py-[64px] lg:px-[165px]">
            <section className="grid lg:grid-cols-3">
                <section className="col-span-1">
                    <Link href='/'>
                        <figure className='w-[93px] h-[38px] relative'>
                            <Image
                                fill
                                src='https://pemilyy-assets.s3.ap-south-1.amazonaws.com/logos-new/logo-white-1.png'
                                alt='pemilyy'
                                style={{
                                    objectFit: 'contain'
                                }}
                            />
                        </figure>
                    </Link>
                    <p className="pt-16 pb-32 lg:pt-12 lg:pb-24 text-14 leading-20 text-white">Copyright © {new Date().getFullYear()} Veena Tech.</p>
                </section>
                <section className="col-span-2 grid grid-cols-2 lg:grid-cols-3 gap-24 text-white">
                    <section className="col-span-1">
                        <p className="text-20 font-semibold leading-28 mb-10 lg:mb-28">Company</p>
                        <ul>
                            <li className="py-8">
                                <Link className='text-14 leading-20 lg:text-16 lg:leading-24' href='/about'>
                                    About Us
                                </Link>
                            </li>
                            <li className="py-8">
                                <Link className='text-14 leading-20 lg:text-16 lg:leading-24' href='/about'>
                                    Services
                                </Link>
                            </li>
                            <li className="py-8">
                                <Link className='text-14 leading-20 lg:text-16 lg:leading-24' href='/about'>
                                    Why Pemily
                                </Link>
                            </li>
                        </ul>
                    </section>
                    <section className="col-span-1">
                        <p className="text-20 font-semibold leading-28 mb-10 lg:mb-28">Support</p>
                        <ul>
                            <li className="py-8">
                                <Link className='text-14 leading-20 lg:text-16 lg:leading-24' href='/about'>
                                    Help center
                                </Link>
                            </li>
                            <li className="py-8">
                                <Link className='text-14 leading-20 lg:text-16 lg:leading-24' href='/about'>
                                    Terms of service
                                </Link>
                            </li>
                        </ul>
                    </section>
                    <section className="col-span-1">
                        <p className="text-20 font-semibold leading-28">Stay up to date</p>
                    </section>
                </section>
            </section>
        </footer>
    )
};

export default Footer;
