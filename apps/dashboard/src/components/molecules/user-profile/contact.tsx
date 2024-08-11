import { MainIcon, PhoneIcon, WebIcon } from '@webservices/icons';
import { ImagePlaceholder } from '@webservices/ui';

const Contact = () => {
	return (
		<section className="grid grid-cols-3 gap-32 mt-[140px] max-w-screen-lg">
			<section className="col-span-1 flex gap-24 items-center bg-[#E4FFF0] px-24 py-[32px] relative rounded-8">
				<PhoneIcon />
				<a target="_blank" className="font-bold text-18" href="tel:7047037587">
					7047037587
				</a>
				<section className="absolute right-12 bottom-10">
					<ImagePlaceholder
						src="/images/contact-3.png"
						containerClasses="w-[106px] h-[149px]"
						imageClasses="bg-contain"
					/>
				</section>
			</section>
			<section className="col-span-1 flex gap-24 items-center justify-end bg-[#FFECFA] px-24 py-12 relative rounded-8">
				<section className="absolute left-[42px] bottom-12">
					<ImagePlaceholder
						src="/images/contact-2.png"
						containerClasses="w-[91px] h-[128px]"
						imageClasses="bg-contain"
					/>
				</section>
				<MainIcon />
				<a target="_blank" className="font-bold text-18" href="mailto:care@pemilly.com">
					care@pemilly.com
				</a>
			</section>
			<section className="col-span-1 flex gap-24 items-center bg-[#E4EFFF] px-24 py-12 relative rounded-8">
				<WebIcon />
				<a target="_blank" className="font-bold text-18" href="https://www.pemilyy.com/">
					pemilyy.com
				</a>
				<section className="absolute right-12 bottom-10">
					<ImagePlaceholder
						src="/images/contact-1.png"
						containerClasses="w-[128px] h-[128px]"
						imageClasses="bg-contain"
					/>
				</section>
			</section>
		</section>
	);
};

export default Contact;
