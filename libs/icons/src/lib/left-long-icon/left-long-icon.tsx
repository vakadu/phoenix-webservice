/* eslint-disable-next-line */
export interface LeftLongIconProps {}

// eslint-disable-next-line @typescript-eslint/ban-types
export function LeftLongIcon(props: React.SVGAttributes<{}>) {
	return (
		<svg
			viewBox="0 0 18 10"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
			>
			<path
				d="M5.28033 1.28033C5.57322 0.987437 5.57322 0.512563 5.28033 0.21967C4.98744 -0.0732233 4.51256 -0.0732233 4.21967 0.21967L0.21967 4.21967C0.0732233 4.36612 0 4.55806 0 4.75C0 4.85169 0.0202391 4.94866 0.0569091 5.03709C0.0935089 5.12555 0.147763 5.20842 0.21967 5.28033L4.21967 9.28033C4.51256 9.57322 4.98744 9.57322 5.28033 9.28033C5.57322 8.98744 5.57322 8.51256 5.28033 8.21967L2.56066 5.5H17.25C17.6642 5.5 18 5.16421 18 4.75C18 4.33579 17.6642 4 17.25 4H2.56066L5.28033 1.28033Z"
				fill="currentColor"
			/>
		</svg>
	);
}

export default LeftLongIcon;
