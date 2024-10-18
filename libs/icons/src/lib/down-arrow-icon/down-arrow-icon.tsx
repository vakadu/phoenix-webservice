// eslint-disable-next-line @typescript-eslint/ban-types
export function DownArrowIcon(props: React.SVGAttributes<{}>) {
	return (
		<svg
			width="32"
			height="32"
			viewBox="0 0 24 24"
			fill="currentColor"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path d="M6.293,17.707a1,1,0,0,1,1.414-1.414L11,19.586V2a1,1,0,0,1,2,0V19.586l3.293-3.293a1,1,0,1,1,1.414,1.414l-5,5a1,1,0,0,1-1.414,0l-5-5Z" />
		</svg>
	);
}

export default DownArrowIcon;
