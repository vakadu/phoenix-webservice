// eslint-disable-next-line @typescript-eslint/ban-types
export function MenuVerticalIcon(props: React.SVGAttributes<{}>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			{...props}
		>
			<path
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={2}
				d="M13 5a1 1 0 1 0-2 0 1 1 0 0 0 2 0ZM13 12a1 1 0 1 0-2 0 1 1 0 0 0 2 0ZM13 19a1 1 0 1 0-2 0 1 1 0 0 0 2 0Z"
			/>
		</svg>
	);
}

export default MenuVerticalIcon;
