import Image from "next/image";

import { shimmer, toBase64 } from "@webservices/helpers";

/* eslint-disable-next-line */
export interface ImagePlaceholderProps extends React.HTMLAttributes<HTMLElement>  {
	alt?: string;
	src: string;
	containerClasses?: string;
	imageClasses?: string;
	sizes?: string;
}

export function ImagePlaceholder(props: ImagePlaceholderProps) {
	const { alt = "arzooo", src, containerClasses, imageClasses, sizes = "100vw", ...rest } = props;

	return (
		<figure 
			className={`relative ${containerClasses}`}
			{ ...rest }
		>
			<Image
				src={src}
				alt={alt}
				fill
				sizes={sizes}
				className={imageClasses}
				placeholder="blur"
				blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer())}`}
			/>
		</figure>
	);
}

export default ImagePlaceholder;
