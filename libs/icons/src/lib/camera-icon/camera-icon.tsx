// eslint-disable-next-line @typescript-eslint/ban-types
export const CameraIcon: React.FC<React.SVGAttributes<{}>> = (props) => {
	return (
		<svg
			width="32"
			height="32"
			viewBox="0 0 32 32"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				fill="currentColor"
				fillRule="evenodd"
				d="M10.664 5.333c0-.736.55-1.333 1.23-1.333H20.1c.68 0 1.23.597 1.23 1.333s-.55 1.334-1.23 1.334h-8.205c-.68 0-1.23-.598-1.23-1.334ZM13.034 28h5.926c4.161 0 6.243 0 7.737-.963a5.827 5.827 0 0 0 1.635-1.577c.999-1.44.999-3.447.999-7.46s0-6.019-1-7.46a5.823 5.823 0 0 0-1.634-1.577C25.203 8 23.121 8 18.96 8h-5.925c-4.162 0-6.243 0-7.738.963a5.825 5.825 0 0 0-1.633 1.577c-1 1.44-1 3.447-1 7.457V18c0 4.013 0 6.019.999 7.46.432.624.986 1.16 1.634 1.577C6.792 28 8.873 28 13.035 28Zm-2.593-10c0-2.96 2.488-5.357 5.556-5.357S21.553 15.04 21.553 18s-2.489 5.357-5.556 5.357c-3.068 0-5.556-2.4-5.556-5.357Zm2.223 0c0-1.776 1.493-3.213 3.333-3.213s3.334 1.438 3.334 3.213c0 1.775-1.494 3.213-3.334 3.213S12.664 19.775 12.664 18Zm11.481-5.357c-.613 0-1.11.48-1.11 1.072 0 .59.497 1.07 1.11 1.07h.742c.613 0 1.11-.48 1.11-1.07 0-.592-.497-1.072-1.11-1.072h-.742Z"
				clipRule="evenodd"
			/>
		</svg>
	);
};
