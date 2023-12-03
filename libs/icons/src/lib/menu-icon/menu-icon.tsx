// eslint-disable-next-line @typescript-eslint/ban-types
export function MenuIcon(props: React.SVGAttributes<{}>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="25"
			height="25"
			viewBox="0 0 25 25"
			fill="none"
			{...props}
		>
			<path 
				d="M4 17H20M4 12H20M4 7H20" 
				stroke="currentColor" 
				strokeWidth="1.5" 
				strokeLinecap="round" 
				strokeLinejoin="round"
			/>
		</svg>
	);
}

export default MenuIcon;
