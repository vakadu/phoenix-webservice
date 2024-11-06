import ImagePlaceholder from '../../image-placeholder/image-placeholder';
import useCertificate from '../hooks/use-certificate';

export default function Certificate({ activeFilter }: { activeFilter: string }) {
	const { records } = useCertificate({ activeFilter });

	if (records && records?.length <= 0) {
		return (
			<div className="py-[82px] flex flex-col gap-24 justify-center items-center">
				<ImagePlaceholder
					containerClasses="w-[120px] h-[120px]"
					src="/images/no-records.svg"
				/>
				<p className="text-16 font-medium">No Records found.</p>
			</div>
		);
	}

	return <div></div>;
}
