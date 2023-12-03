// eslint-disable-next-line @typescript-eslint/ban-types
export function DotIcon(props: React.SVGAttributes<{}>) {
	return (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<circle cx="12" cy="12" r="2" fill="currentColor"/>
		</svg>
	);
}

export default DotIcon;