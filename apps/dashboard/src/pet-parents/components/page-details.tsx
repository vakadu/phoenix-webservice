'use client';

import useSearchHook from '../hooks/search';
import PetParent from './shared/pet-parent';
import SearchInput from './shared/search-input';

export default function PageDetails() {
	const {
		searchValue,
		onChange,
		handleClear,
		isPending,
		parents,
		handlePetParent,
		parentDetails,
		refetchParents,
	} = useSearchHook();

	return (
		<div className="grid grid-cols-5 gap-24 items-start">
			<SearchInput
				searchValue={searchValue}
				onChange={onChange}
				handleClear={handleClear}
				isPending={isPending}
				parents={parents}
				handlePetParent={handlePetParent}
			/>
			{parentDetails && (
				<PetParent
					parentId={parentDetails.parent?.parentId}
					memberId={parentDetails?.memberId}
					refetchParents={refetchParents}
				/>
			)}
		</div>
	);
}
