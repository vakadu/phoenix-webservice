// eslint-disable-next-line @typescript-eslint/ban-types
export const BackIcon: React.FC<React.SVGAttributes<{}>> = (props) => {
	return (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="currentColor"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path d="M1.293 12.707a1 1 0 0 1 0-1.414l6-6a1 1 0 0 1 1.414 1.414L4.414 11H22a1 1 0 0 1 0 2H4.414l4.293 4.293a1 1 0 0 1-1.414 1.414Z" />
		</svg>
	);
};
