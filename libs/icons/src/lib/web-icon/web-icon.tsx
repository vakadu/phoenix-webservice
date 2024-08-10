// eslint-disable-next-line @typescript-eslint/ban-types
export const WebIcon: React.FC<React.SVGAttributes<{}>> = (props) => {
	return (
		<svg
			width="34"
			height="34"
			viewBox="0 0 34 34"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={2}
				d="M16.833 32.667c8.745 0 15.834-7.09 15.834-15.834S25.577 1 16.833 1m0 31.667C8.09 32.667 1 25.577 1 16.833S8.089 1 16.833 1m0 31.667c3.682 0 6.667-7.09 6.667-15.834S20.515 1 16.833 1m0 31.667c-3.682 0-6.666-7.09-6.666-15.834S13.15 1 16.833 1m-15 10.833h30m-30 10h30"
			/>
		</svg>
	);
};
