function PetBasicDetails({
	name,
	breed,
	gender,
	type,
	dob,
}: {
	name: string;
	breed: string;
	gender: string;
	type: string;
	dob: string;
}) {
	return (
		<div className="flex flex-col gap-16 mt-24 px-12 w-full">
			<div className="flex items-center border border-grey-border1 gap-12 py-12 px-12 rounded-8">
				<span className="text-14 text-grey-text3">Name: </span>
				<span className="font-medium text-14">{name}</span>
			</div>
			<div className="flex items-center border border-grey-border1 gap-12 py-12 px-12 rounded-8">
				<span className="text-14 text-grey-text3">Breed: </span>
				<span className="font-medium text-14">{breed}</span>
			</div>
			<div className="flex items-center border border-grey-border1 gap-12 py-12 px-12 rounded-8">
				<span className="text-14 text-grey-text3">Gender: </span>
				<span className="font-medium text-14">{gender === 'M' ? 'Male' : 'Female'}</span>
			</div>
			<div className="flex items-center border border-grey-border1 gap-12 py-12 px-12 rounded-8">
				<span className="text-14 text-grey-text3">Type: </span>
				<span className="font-medium text-14">{type}</span>
			</div>
			<div className="flex items-center border border-grey-border1 gap-12 py-12 px-12 rounded-8">
				<span className="text-14 text-grey-text3">Dob: </span>
				<span className="font-medium text-14">{dob}</span>
			</div>
		</div>
	);
}

export default PetBasicDetails;
