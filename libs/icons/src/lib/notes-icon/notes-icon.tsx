// eslint-disable-next-line @typescript-eslint/ban-types
export function NotesIcon(props: React.SVGAttributes<{}>) {
	return (
		<svg
			width="14"
			height="18"
			viewBox="0 0 14 18"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M12.75 7h-4a2 2 0 0 1-2-2V1m6 5.828V15a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h4.172a2 2 0 0 1 1.414.586l3.828 3.828a2 2 0 0 1 .586 1.414Z"
			/>
		</svg>
	);
}

export default NotesIcon;
