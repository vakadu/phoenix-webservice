// import LogoVinod from "../logo-vinod/logo-vinod";

/* eslint-disable-next-line */
export interface PreloaderProps {}

export function Preloader(props: PreloaderProps) {
	return (
		<div className='fixed top-0 left-0 bottom-0 right-0 text-center z-10 w-full before:absolute before:bg-white before:w-[120vw] before:h-[120vh] before:-left-[10vw] before:-top-[20vh]'>
			<div className='h-screen w-full max-w-full table table-fixed relative top-0 left-0 z-[2]'>
				<div className='table-cell align-middle'>
					<div className='my-0 mx-auto w-[144px] relative'>
						<div className="pb-[12px]">
							{/* <LogoVinod/> */}
						</div>
						<div className='inline-block absolute left-0 bottom-0 w-full h-[2px] bg-brand animate-spinnerline'/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Preloader;
