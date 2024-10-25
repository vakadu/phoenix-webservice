// eslint-disable-next-line @typescript-eslint/ban-types
export function TickSuccessIcon(props: React.SVGAttributes<{}>) {
	return (
		<svg
			width="32"
			height="32"
			viewBox="0 0 24 24"
			fill="currentColor"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm5.676 8.237-6 5.5a1 1 0 0 1-1.383-.03l-3-3a1 1 0 1 1 1.414-1.414l2.323 2.323 5.294-4.853a1 1 0 1 1 1.352 1.474Z" />
		</svg>
	);
}

export default TickSuccessIcon;
