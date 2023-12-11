import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-grey-bg py-32">
            <section className="max-w-[1300px] mx-auto flex flex-col">
                <ul className="flex flex-col">
                    <li className="text-14 px-12">
                        <Link className="hover:text-brand hover:border-b hover:border-brand" href='/terms'>
                            Terms & Conditions
                        </Link>
                    </li>
                    <li className="text-14 px-12">
                        <Link className="hover:text-brand hover:border-b hover:border-brand" href='/privacy'>
                            Privacy
                        </Link>
                    </li>
                    <li className="text-14 px-12">
                        <Link className="hover:text-brand hover:border-b hover:border-brand" href='/refund-policy'>
                            Refund Policy
                        </Link>
                    </li>
                    <li className="text-14 px-12">
                        <span>Mail us at </span>
                        <a className="link" href="mailto:care.pemilyy@gmail.com">care.pemilyy@gmail.com</a>
                    </li>
                    <li className="text-14 px-12">
                        <span>Regirterd Office: </span>
                        <a>KOKARYA, Business Synergy Center, No.51, OLD SITE No.1, FIFTH FLOOR, 5th Main, 5th BLOCK, JAYANAGAR, BENGALURU-560011</a>
                    </li>
                </ul>
            </section>
        </footer>
    )
};

export default Footer;
