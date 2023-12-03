import ContentLoader from 'react-content-loader';

/* eslint-disable-next-line */
export interface ItemLoaderProps {
	numberOfBoxes?: number;
	height?: number;
}

export function ItemLoader(props: ItemLoaderProps) {
	const { numberOfBoxes = 1, height = 150, ...rest } = props;
	const gapPercentage = numberOfBoxes > 1 ? 2 : 0;
	const totalGapPercentage = gapPercentage * (numberOfBoxes - 1);
	const boxWidthPercentage = (100 - totalGapPercentage) / numberOfBoxes;
	const boxHeight = height;
  
	return (
		<ContentLoader 
			speed={2}
			width="100%"
			height={height}
			backgroundColor="#E5E7E9"
			foregroundColor="#CACFD2"
			{...rest}
		>
			{Array.from({ length: numberOfBoxes }).map((_, index) => (
				<rect
					key={index}
					x={`${index * (boxWidthPercentage + gapPercentage)}%`}
					y={10}
					rx="4"
					ry="4"
					width={`${boxWidthPercentage}%`}
					height={boxHeight - 20}
					className="h-full"
				/>
			))}
		</ContentLoader>
	);
}

export default ItemLoader;
