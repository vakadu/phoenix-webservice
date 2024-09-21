import { ImagePlaceholder } from '@webservices/ui';

const LoginImage = () => {
	return (
		<div className="col-span-2 bg-grey-4 flex items-center justify-center">
			<ImagePlaceholder
				src="/images/bg.png"
				imageClasses="object-cover"
				containerClasses="w-full h-full"
			/>
		</div>
	);
};

export default LoginImage;
