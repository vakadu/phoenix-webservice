import { FlashIcon } from "@webservices/icons";

const data = [
    {
        "id": 1,
        "img": <FlashIcon className="w-[54px] h-[54px]" />,
        "heading": "Comprehensive Care",
        "descriptoin": "Through partnerships with accredited pet clinics, we offer a spectrum of services from routine check-ups to specialized treatments",
    },
    {
        "id": 2,
        "img": <FlashIcon className="w-[54px] h-[54px]" />,
        "heading": "Easy Access",
        "descriptoin": "Our user-friendly platform empowers you to effortlessly discover and connect with the finest pet clinics in your vicinity",
    },
    {
        "id": 3,
        "img": <FlashIcon className="w-[54px] h-[54px]" />,
        "heading": "Passionate Team",
        "descriptoin": "Behind Pemilyy is a team of devoted individuals who comprehend the unique bond between pets and their parents",
    },
];

const Services = () => {
    return (
        <section className="pb-[80px] bg-transparent bg-[linear-gradient(180deg,_#FFFFFF_0%,_#F0EBE3_100%)] dark:bg-[linear-gradient(0deg,_#31363c_0%,_#222831_100%)]">
            <section className="max-w-[1300px] mx-auto px-16 md:px-24">
                <h2 className="text-center text-[42px] lg:text-[60px] font-semibold mb-24 lg:mb-64">Why Choose Us?</h2>
                <section className="relative lg:px-0 grid md:grid-cols-3 gap-24">
                    {
                        data?.map((service) => {
                            return (
                                <section className="p-24 lg:p-42 bg-grey-bg rounded-[16px] cursor-pointer" key={service.id}>
                                    <figure className="flex justify-center items-center">
                                        {service.img}
                                    </figure>
                                    <h4 className="text-center text-18 lg:text-24 font-semibold my-12 lg:my-24">{service.heading}</h4>
                                    <p className="text-center text-16 lg:text-18">{service.descriptoin}</p>
                                </section>
                            )
                        })
                    }
                </section>
            </section>
        </section>
    );
};

export default Services;
