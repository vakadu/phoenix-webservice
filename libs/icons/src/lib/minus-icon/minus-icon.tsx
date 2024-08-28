// eslint-disable-next-line @typescript-eslint/ban-types
export function MinusIcon(props: React.SVGAttributes<{}>) {
	return (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<title />
			<g id="Complete">
				<g id="minus">
					<line
						fill="none"
						stroke="currentColor"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						x1="4"
						x2="20"
						y1="12"
						y2="12"
					/>
				</g>
			</g>
		</svg>
	);
}

export default MinusIcon;
