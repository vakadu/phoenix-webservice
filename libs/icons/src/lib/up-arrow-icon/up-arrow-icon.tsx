// eslint-disable-next-line @typescript-eslint/ban-types
export function UpArrowIcon(props: React.SVGAttributes<{}>) {
	return (
		<svg
			width="32"
			height="32"
			viewBox="0 0 24 24"
			fill="currentColor"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path d="M11.293,1.293a1,1,0,0,1,1.414,0l5,5a1,1,0,0,1-1.414,1.414L13,4.414V22a1,1,0,0,1-2,0V4.414L7.707,7.707A1,1,0,0,1,6.293,6.293Z" />
		</svg>
	);
}

export default UpArrowIcon;
