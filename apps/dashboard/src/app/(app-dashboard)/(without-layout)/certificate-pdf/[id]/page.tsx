import CertificatePdf from './ui/pdf';
import Print from './ui/print';

const Page = () => {
	return (
		<div className="pb-[100px]">
			<CertificatePdf />
			<Print />
		</div>
	);
};

export default Page;
