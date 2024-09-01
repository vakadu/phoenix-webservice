const Upload = ({ parentId, petId }: { parentId: string; petId: string }) => {
	return (
		<section>
			<h3 className="text-22 font-semibold leading-[54px]">
				Upload a photo of your Prescription
			</h3>
			<p className="text-18">You can upload JPEG or PNG up to 2MB</p>
		</section>
	);
};

export default Upload;
