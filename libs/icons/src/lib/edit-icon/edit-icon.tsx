// eslint-disable-next-line @typescript-eslint/ban-types
export function EditIcon(props: React.SVGAttributes<{}>) {
	return (
		<svg
			width="18"
			height="18"
			viewBox="0 0 18 18"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				d="m11.915 2.7 3.404 3.367m.36-4.528.782.782a1.84 1.84 0 0 1 0 2.603L6.118 15.267a1.841 1.841 0 0 1-.72.445l-3.791 1.264a.46.46 0 0 1-.583-.583l1.264-3.792a1.84 1.84 0 0 1 .445-.72L13.076 1.54a1.841 1.841 0 0 1 2.603 0Z"
			/>
		</svg>
	);
}

export default EditIcon;
