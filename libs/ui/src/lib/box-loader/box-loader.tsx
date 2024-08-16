import React from 'react';
import ContentLoader from 'react-content-loader';

interface BoxLoaderProps {
	rows?: number;
	columns?: number;
	coverHeight?: number;
	speed?: number;
}

export const BoxLoader: React.FC<BoxLoaderProps> = ({
	rows = 2,
	columns = 5,
	coverHeight = 85,
	speed = 1,
}) => {
	const containerPadding = 12;
	const boxMargin = 12;
	const screenWidth = window.innerWidth;
	const boxWidth = (screenWidth - containerPadding * 2 - boxMargin * (columns - 1)) / columns;
	const totalHeight = rows * (coverHeight + boxMargin) - boxMargin + containerPadding * 2;

	return (
		<ContentLoader
			speed={speed}
			width={screenWidth}
			height={totalHeight}
			viewBox={`0 0 ${screenWidth} ${totalHeight}`}
			backgroundColor="#E5E7E9"
			foregroundColor="#CACFD2"
		>
			{Array.from({ length: rows * columns }).map((_, i) => {
				const vx = (i % columns) * (boxWidth + boxMargin) + containerPadding;
				const vy = Math.floor(i / columns) * (coverHeight + boxMargin) + containerPadding;
				return (
					<rect
						key={i}
						x={vx}
						y={vy}
						rx="5"
						ry="5"
						width={boxWidth}
						height={coverHeight}
					/>
				);
			})}
		</ContentLoader>
	);
};

export default BoxLoader;
