import { AppStoreIcon, PlayStoreIcon } from "@webservices/icons";
import { Button } from "@webservices/ui";

const Hero = () => {
    return (
        <section className="pb-[80px] bg-transparent bg-[linear-gradient(0deg,_#FFFFFF_0%,_#F0EBE3_100%)] dark:bg-[linear-gradient(0deg,_#31363c_0%,_#222831_100%)]">
            <section className="min-h-screen flex items-center max-w-[1300px] mx-auto px-16 md:px-24">
                <section className="relative pt-[20px] w-full">
                    <section className="text-center md:text-left">
                        <section className="max-w-[740px] mb-[420px] lg:mb-0">
                            <h1 className="text-[80px] font-bold">Welcome to </h1>
                            <h1 className="text-[80px] font-bold text-brand">Pemilyy</h1>
                            <p className="mt-24 lg:max-w-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores eum inventore labore repellat reprehenderit corrupti voluptatem vero quidem maxime et nihil similique, enim eaque, laborum, natus at aperiam optio architecto?</p>
                            <section className="mt-24">
                                <Button className="bg-brand flex px-12 mr-12">
                                    <PlayStoreIcon className="w-[24px] h-[24px]"/>
                                    <span className="text-14 ml-12">Play Store</span>
                                </Button>
                                <Button variant="ghost" color="blackWhite" className="flex px-12 ml-12">
                                    <AppStoreIcon className="w-[24px] h-[24px]"/>
                                    <span className="text-14 ml-12">App Store</span>
                                </Button>
                            </section>
                        </section>
                    </section>
                </section>
            </section>
        </section>
    )
};

export default Hero;
