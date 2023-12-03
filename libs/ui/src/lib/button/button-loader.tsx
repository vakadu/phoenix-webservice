import LoaderView from "../button-loader/button-loader";
import { LoaderSizeTypes, LoaderVariantTypes } from '../button-loader/button-loader';

export default function ButtonLoader({
    size,
    variant,
}: {
    size: LoaderSizeTypes;
    variant: LoaderVariantTypes;
}) {
    return (
		<span className="absolute inset-0 h-full w-full flex items-center justify-center">
			<LoaderView
				tag="span"
				size={size}
				variant={variant}
				showOnlyThreeDots={true}
			/>
		</span>
    );
};
