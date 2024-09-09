// eslint-disable-next-line @typescript-eslint/ban-types
export const BellIcon: React.FC<React.SVGAttributes<{}>> = (props) => {
	return (
		<svg
			fill="none"
			width="25"
			height="25"
			viewBox="0 0 25 25"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={2}
				d="M18.828 8.836a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9ZM14.562 21.836a2 2 0 0 1-3.46 0"
			/>
		</svg>
	);
};

export default BellIcon;
