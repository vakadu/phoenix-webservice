/* eslint-disable-next-line */
export interface RightLongIconProps {}

// eslint-disable-next-line @typescript-eslint/ban-types
export function RightLongIcon(props: React.SVGAttributes<{}>) {
	return (
		<svg
			viewBox="0 0 18 10"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				d="M12.7197 1.28033C12.4268 0.987437 12.4268 0.512563 12.7197 0.21967C13.0126 -0.0732233 13.4874 -0.0732233 13.7803 0.21967L17.7803 4.21967C17.9268 4.36612 18 4.55806 18 4.75C18 4.85169 17.9798 4.94866 17.9431 5.03709C17.9065 5.12555 17.8522 5.20842 17.7803 5.28033L13.7803 9.28033C13.4874 9.57322 13.0126 9.57322 12.7197 9.28033C12.4268 8.98744 12.4268 8.51256 12.7197 8.21967L15.4393 5.5H0.75C0.335787 5.5 0 5.16421 0 4.75C0 4.33579 0.335787 4 0.75 4H15.4393L12.7197 1.28033Z"
				fill="currentColor"
			/>
		</svg>
	);
}

export default RightLongIcon;
