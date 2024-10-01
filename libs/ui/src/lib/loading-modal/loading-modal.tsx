import Loading from '../loading/loading';

const LoadingModal = () => {
	return (
		<div className="flex justify-center items-center">
			<div className="bg-white px-12 py-12 rounded-8">
				<Loading />
			</div>
		</div>
	);
};

export default LoadingModal;
