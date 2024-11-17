import CertificatePdf from './ui/pdf';
import Print from './ui/print';

const Page = () => {
	return (
		<div className="pb-[100px]">
			<div className="my-6 font-bold text-18 text-purple text-center underline decoration-purple">PREVIEW</div>
			<div className="mb-10 font-medium text-14 text-purple text-center"><span className='font-bold'>NOTE: </span>VERIFY DOB AND AGE BEFORE PRINTING. UPDATE IN PET PROFILE IF INCORRECT, THEN RECREATE CERTIFICATE.</div>
			<CertificatePdf />
			<Print />
		</div>
	);
};

export default Page;
