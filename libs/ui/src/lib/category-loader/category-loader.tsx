import React from 'react';
import ContentLoader from 'react-content-loader';
import { useWindowSize } from 'react-use';

interface CategoryLoaderProps {
	rows?: number;
	columns?: number;
	coverHeight?: number;
	speed?: number;
}

export const CategoryLoader: React.FC<CategoryLoaderProps> = (props) => {
	const { rows = 2, columns = 5, coverHeight = 85, speed = 1, ...rest } = props;
	const { width } = useWindowSize();

	const containerPadding = 0; // Padding on left and right of the container
	const horizontalBoxMargin = 52; // Increased margin between boxes horizontally
	const verticalBoxMargin = 12; // Maintain original vertical margin
	const totalHorizontalMargin = (columns - 1) * horizontalBoxMargin;
	const totalAvailableWidth =
		100 - 2 * ((containerPadding / width) * 100) - (totalHorizontalMargin / width) * 100;
	const boxWidthPercentage = totalAvailableWidth / columns;
	const covers = Array(columns * rows).fill(1);

	return (
		<ContentLoader
			speed={speed}
			width="100%"
			height={rows * coverHeight + (rows - 1) * verticalBoxMargin + 2 * containerPadding}
			backgroundColor="#E5E7E9"
			foregroundColor="#CACFD2"
			{...rest}
		>
			{covers.map((g, i) => {
				const vy =
					Math.floor(i / columns) * (coverHeight + verticalBoxMargin) + containerPadding;
				const vx =
					(i % columns) * (boxWidthPercentage + (horizontalBoxMargin / width) * 100) +
					(containerPadding / width) * 100;
				return (
					<rect
						key={i}
						x={`${vx}%`}
						y={vy}
						rx="8"
						ry="8"
						width={`${boxWidthPercentage}%`}
						height={coverHeight}
					/>
				);
			})}
		</ContentLoader>
	);
};

export default CategoryLoader;
