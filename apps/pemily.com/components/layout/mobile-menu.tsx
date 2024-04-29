import React from 'react';

import { Modal } from '@webservices/ui';
import Menu from './menu';

interface IMobileMenupProps {
    mobileMenu: boolean;
    setMobileMenu: (m: boolean) => void;
}

const MobileMenu = (props: IMobileMenupProps) => {
    const { mobileMenu, setMobileMenu } = props;

    return (
        <Modal isCenter isOpen={mobileMenu} handleClose={() => setMobileMenu(false)}>
            <section className='relative z-50 bg-white h-screen w-[75%] inline-block align-middle'>
                <Menu/>
            </section> 
        </Modal>
    )
};

export default MobileMenu;
