// eslint-disable-next-line @typescript-eslint/ban-types
export const PhoneIcon: React.FC<React.SVGAttributes<{}>> = (props) => {
	return (
		<svg
			width="26"
			height="38"
			viewBox="0 0 26 38"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<rect
				width={24}
				height={36}
				x={1}
				y={1}
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={1.5}
				rx={3}
			/>
			<path
				fill="currentColor"
				d="M13 32a.993.993 0 0 1-.707-.293A.997.997 0 0 1 13 30a1.006 1.006 0 0 1 .707.293.997.997 0 0 1 .217 1.09A.998.998 0 0 1 13 32Z"
			/>
			<path fill="currentColor" d="M13 33a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z" />
		</svg>
	);
};
