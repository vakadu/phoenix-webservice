// eslint-disable-next-line @typescript-eslint/ban-types
export function ViewIcon(props: React.SVGAttributes<{}>) {
	return (
		<svg
			width="18"
			height="12"
			viewBox="0 0 18 12"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M16.67 5.202a1.414 1.414 0 0 1 0 1.567c-.995 1.516-3.583 4.703-7.764 4.703-4.18 0-6.769-3.187-7.763-4.703a1.414 1.414 0 0 1 0-1.567C2.137 3.687 4.725.5 8.906.5s6.77 3.187 7.763 4.702Z"
			/>
			<path
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M11.65 5.986a2.743 2.743 0 1 1-5.487 0 2.743 2.743 0 0 1 5.486 0Z"
			/>
		</svg>
	);
}

export default ViewIcon;
