// eslint-disable-next-line @typescript-eslint/ban-types
export function UpDownIcon(props: React.SVGAttributes<{}>) {
	return (
		<svg
			width="32"
			height="32"
			viewBox="0 0 24 24"
			strokeWidth="1.5" 
			stroke="currentColor"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path 
				strokeLinecap="round" 
				strokeLinejoin="round" 
				d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" 
			/>
		</svg>
	);
}

export default UpDownIcon;
