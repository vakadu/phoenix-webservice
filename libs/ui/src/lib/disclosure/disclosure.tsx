"use client"

import { Disclosure, Transition } from '@headlessui/react';
import { ReactNode } from 'react';

import { DownIcon, UpIcon } from '@webservices/icons';

export const Disclousure = (props: {
    title: string;
    children: ReactNode;
    titleClass?: string;
    bodyClass?: string;
    container?: string;
    onPress?: () => void;
    defaultOpen?: boolean;
}) => {
    const { title, children, titleClass, bodyClass, container, onPress, defaultOpen = false } = props;
    return (
        <section className={container}>
            <Disclosure defaultOpen={defaultOpen}>
                {({ open }) => (
                    <>
                        <Disclosure.Button 
                            className={`${titleClass} ${open ? '' : 'border-b border-dark-border'} flex justify-between items-center outline-none`}
                            onClick={onPress}
                        >
                            <p className='text-14 lg:text-16'>{ title }</p>
                            {
                                open ? 
                                    <DownIcon/>
                                    :
                                    <UpIcon
										className='w-16 h-16'
									/>
                            }
                        </Disclosure.Button>
                        <Transition
                            show={open}
                            enter="transition duration-100 ease-out"
                            enterFrom="transform scale-95 opacity-0"
                            enterTo="transform scale-100 opacity-100"
                            leave="transition duration-75 ease-out"
                            leaveFrom="transform scale-100 opacity-100"
                            leaveTo="transform scale-95 opacity-0"
                        >
                            <Disclosure.Panel className={`${bodyClass} ${open ? 'pb-12' : '!border-0'}`}>
                                { children }
                            </Disclosure.Panel>
                        </Transition>
                    </>
                )}
            </Disclosure>
        </section>
    )
};

export default Disclousure;
