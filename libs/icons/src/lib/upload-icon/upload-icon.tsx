// eslint-disable-next-line @typescript-eslint/ban-types
export function UploadIcon(props: React.SVGAttributes<{}>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="40"
			height="40"
			viewBox="0 0 40 40"
			fill="none"
			{...props}
		>
			<path
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={2}
				d="M19.997 26.667V7.5m0 0-6.666 6.667M19.997 7.5l6.667 6.667M9.164 32.5h21.667"
			/>
		</svg>
	);
}

export default UploadIcon;
