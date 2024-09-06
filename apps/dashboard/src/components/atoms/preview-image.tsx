import { ImagePlaceholder } from '@webservices/ui';
import { PdfIcon } from '@webservices/icons';

const PreviewImage = ({ url, imgType }: { url: string; imgType: string }) => {
	if (url) {
		return (
			<>
				{imgType !== 'pdf' && (
					<ImagePlaceholder
						src={url}
						imageClasses="rounded-8 object-contain"
						containerClasses="w-[85px] h-[72px]"
					/>
				)}
				{imgType === 'pdf' && <PdfIcon width={85} height={72} />}
			</>
		);
	}
	return <div className="w-[85px] h-[72px] bg-grey-bg"></div>;
};

export default PreviewImage;
