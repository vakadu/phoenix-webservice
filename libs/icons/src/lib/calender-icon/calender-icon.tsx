// eslint-disable-next-line @typescript-eslint/ban-types
export const CalenderIcon: React.FC<React.SVGAttributes<{}>> = (props) => {
	return (
		<svg
			width="32"
			height="31"
			viewBox="0 0 32 31"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={2}
				d="M31 9.333H1m8.333-5V1m13.334 3.333V1M4.333 2.667h-.166A3.167 3.167 0 0 0 1 5.833V26a3.333 3.333 0 0 0 3.333 3.333h23.334A3.333 3.333 0 0 0 31 26V5.833a3.167 3.167 0 0 0-3.167-3.166h-.166m-13.334 0h3.334"
			/>
		</svg>
	);
};
