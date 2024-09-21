// eslint-disable-next-line @typescript-eslint/ban-types
export const UserOutlineIcon: React.FC<React.SVGAttributes<{}>> = (props) => {
	return (
		<svg
			width="15"
			height="18"
			viewBox="0 0 15 18"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M7.5 10.143c-3.083 0-5.678 2.14-6.452 5.05C.79 16.166 1.612 17 2.597 17h9.806c.985 0 1.808-.833 1.549-1.808-.774-2.91-3.37-5.05-6.452-5.05ZM10.62 4.2c0 1.767-1.397 3.2-3.12 3.2S4.38 5.967 4.38 4.2C4.38 2.433 5.777 1 7.5 1s3.12 1.433 3.12 3.2Z"
			/>
		</svg>
	);
};

export default UserOutlineIcon;
