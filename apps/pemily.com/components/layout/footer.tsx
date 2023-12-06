import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-white py-32">
            <section className="max-w-[1300px] mx-auto">
                <ul className="flex">
                    <li>
                        <Link className="text-14 px-12" href='/terms'>
                            Terms & Conditions
                        </Link>
                    </li>
                    <li className="text-14 px-12">
                        <Link href='/privacy'>
                            Privacy
                        </Link>
                    </li>
                    <li className="text-14 px-12">
                        <Link href='/refund-policy'>
                            Refund Policy
                        </Link>
                    </li>
                </ul>
            </section>
        </footer>
    )
};

export default Footer;
