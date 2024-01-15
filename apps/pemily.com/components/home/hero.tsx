"use client"

import Link from 'next/link';

import { AppStoreIcon, PlayStoreIcon } from "@webservices/icons";
import { Button } from "@webservices/ui";

const Hero = () => {
    return (
        <section className="pb-[80px] bg-transparent bg-[linear-gradient(0deg,_#FFFFFF_0%,_#F0EBE3_100%)] dark:bg-[linear-gradient(0deg,_#31363c_0%,_#222831_100%)]">
            <section className="min-h-screen flex items-center max-w-[1300px] mx-auto px-16 md:px-24">
                <section className="relative pt-[120px] w-full">
                    <section className="text-center md:text-left">
                        <section className="max-w-[740px] mb-[420px] lg:mb-0">
                            <h1 className="text-[42px] lg:text-[80px] font-bold">Welcome to </h1>
                            <h1 className="text-[42px] lg:text-[80px] font-bold text-brand">Pemilyy</h1>
                            <p className="mt-24 lg:max-w-lg text-14 md:text-16 text-center md:text-left">
                                Where we proudly declare,{' '}
                                <span className="font-medium">
                                    "WE ARE AN EXTENDED FAMILY OF YOUR PETS"
                                </span>{' '}
                                Download the Pemilly app by clicking below</p>
                            <section className="mt-24 grid md:grid-cols-2 max-w-md gap-24">
                                <Link className='col-span-1' target='_blank' href='https://play.google.com/store/apps/details?id=com.pemilyy.android'>
                                    <Button className="bg-brand flex px-12 w-full">
                                        <PlayStoreIcon className="w-[24px] h-[24px]" />
                                        <span className="text-14 ml-12">Play Store</span>
                                    </Button>
                                </Link>
                                <Link className='col-span-1' target='_blank' href='https://apps.apple.com/us/app/pemilyy/id6474898482'>
                                    <Button variant="ghost" color="blackWhite" className="flex px-12 w-full">
                                        <AppStoreIcon className="w-[24px] h-[24px]" />
                                        <span className="text-14 ml-12">App Store</span>
                                    </Button>
                                </Link>
                            </section>
                        </section>
                    </section>
                </section>
            </section>
        </section>
    )
};

export default Hero;
