// eslint-disable-next-line @typescript-eslint/ban-types
export function DownloadIcon(props: React.SVGAttributes<{}>) {
	return (
		<svg
			width="16"
			height="17"
			viewBox="0 0 16 17"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M7.84.5v12.267m0 0L3.573 8.5m4.267 4.267L12.106 8.5m-11.2 8h13.867"
			/>
		</svg>
	);
}

export default DownloadIcon;
