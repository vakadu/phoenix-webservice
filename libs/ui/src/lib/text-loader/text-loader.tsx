import React from 'react';
import ContentLoader from 'react-content-loader';

/* eslint-disable-next-line */
export interface TextLoaderProps {}

export function TextLoader({ times = 5, width = 400 }) {
	return (
		<ContentLoader
			width={width}
			height={40 * times} // Adjust the height based on the number of repetitions
			backgroundColor="#E5E7E9"
			foregroundColor="#CACFD2"
		>
			{Array.from({ length: times }).map((_, index) => (
				<React.Fragment key={index}>
					<rect x="32" y={10 + (40 * index)} rx="5" ry="5" width={width} height="24" />
					<rect x="0" y={10 + (40 * index)} rx="5" ry="5" width="24" height="24" />
				</React.Fragment>
			))}
		</ContentLoader>
	);
}

export default TextLoader;
