export function Sidebar({ children, isOpen, handleClose }) {
	return (
		<div
			className={`fixed right-0 top-0 w-[400px]
         bg-white h-screen z-[9999]  pb-[100px] shadow-base2
          transition-all duration-150
          ${isOpen ? 'translate-x-0 opacity-100 visible' : 'translate-x-full opacity-0 invisible'}
        `}
		>
			{children}
		</div>
	);
}

export default Sidebar;
