// eslint-disable-next-line @typescript-eslint/ban-types
export function TickIcon(props: React.SVGAttributes<{}>) {
	return (
		<svg
			width="32"
			height="32"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<g id="Complete">
				<g id="tick">
					<polyline 
						fill="none" 
						points="3.7 14.3 9.6 19 20.3 5" 
						stroke="currentColor" 
						strokeLinecap="round" 
						strokeLinejoin="round" 
						strokeWidth="2"
					/>
				</g>
			</g>
		</svg>
	);
}

export default TickIcon;
