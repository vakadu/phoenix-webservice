// eslint-disable-next-line @typescript-eslint/ban-types
export const MailIcon: React.FC<React.SVGAttributes<{}>> = (props) => {
	return (
		<svg
			width="32"
			height="26"
			viewBox="0 0 32 26"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={2}
				d="m2.128 1.833 9.449 9.813m18.59-9.518-9.634 9.518M2.128 23.5a3.32 3.32 0 0 0 2.205.833h23.334c.995 0 1.889-.436 2.5-1.128M2.128 23.5A3.325 3.325 0 0 1 1 21V4.333A3.333 3.333 0 0 1 4.333 1h23.334A3.333 3.333 0 0 1 31 4.333V21a3.32 3.32 0 0 1-.833 2.205M2.128 23.5l9.449-11.854m0 0 2.149 2.231a3.333 3.333 0 0 0 4.548 0l2.26-2.231m0 0 9.633 11.559"
			/>
		</svg>
	);
};
