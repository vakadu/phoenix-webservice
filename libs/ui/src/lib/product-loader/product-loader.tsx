import ContentLoader from 'react-content-loader';

import { useIsMobile } from '@webservices/hooks';

/* eslint-disable-next-line */
export interface ProductLoaderProps {}

export function ProductLoader(props: ProductLoaderProps) {
	const { isMobile } = useIsMobile();

	if(isMobile) {
		return (
			<ContentLoader
				viewBox={`0 0 ${window.innerWidth} 760`}
				height={760}
				width={window.innerWidth}
				backgroundColor="#E5E7E9"
				foregroundColor="#CACFD2"
				{...props}
			>
				<rect
					x="3"
					y="12"
					rx="10"
					ry="10"
					width={window.innerWidth}
					height="280"
				/>
				<rect x="6" y="310" rx="0" ry="0" width="292" height="20" />
				<rect x="6" y="345" rx="0" ry="0" width="239" height="20" />
				<rect x="4" y="382" rx="0" ry="0" width="274" height="20" />
			</ContentLoader>
		)
	} else {
		return (
			<ContentLoader 
				viewBox="0 0 1300 700" 
				height={700} 
				width="100%"
				backgroundColor="#E5E7E9"
				foregroundColor="#CACFD2"
				{...props}
			>
				<rect x="20" y="15" rx="20" ry="20" width="580" height="580" />
				<rect x="620" y="15" rx="10" ry="10" width="580" height="33" />
				<rect x="620" y="71" rx="10" ry="10" width="315" height="33" />
				<rect x="620" y="125" rx="10" ry="10" width="233" height="20" />
				<rect x="620" y="216" rx="5" ry="5" width="195" height="13" />
				<rect x="620" y="251" rx="5" ry="5" width="195" height="13" />
				<rect x="620" y="311" rx="8" ry="8" width="130" height="38" />
				<rect x="770" y="311" rx="8" ry="8" width="130" height="38" />
				<rect x="620" y="400" rx="5" ry="5" width="45" height="45" />
				<rect x="680" y="400" rx="5" ry="5" width="45" height="45" />
				<rect x="740" y="400" rx="5" ry="5" width="45" height="45" />
			</ContentLoader>
		);
	}
}

export default ProductLoader;
