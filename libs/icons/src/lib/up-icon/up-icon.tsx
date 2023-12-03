// eslint-disable-next-line @typescript-eslint/ban-types
export function UpIcon(props: React.SVGAttributes<{}>) {
	return (
		<svg
			width="11"
			height="6"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<g id="Arrow / Chevron_Up">
				<path id="Vector" d="M5 16L12 9L19 16" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
			</g>
		</svg>
	);
}

export default UpIcon;