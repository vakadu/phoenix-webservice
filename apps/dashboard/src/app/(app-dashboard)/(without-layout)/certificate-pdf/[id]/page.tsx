import CertificatePdf from './ui/pdf';
import Print from './ui/print';

const Page = () => {
	return (
		<div className="pb-[100px]">
			<div className="my-6 font-bold text-18 text-purple text-center underline decoration-purple">PREVIEW</div>
			<CertificatePdf />
			<Print />
		</div>
	);
};

export default Page;
