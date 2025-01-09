'use client';

import { useInView } from 'react-intersection-observer';

import useSearchHook from '../hooks/search';
import PetParent from './shared/pet-parent';
import SearchInput from './shared/search-input';
import { useEffect } from 'react';
import { Spinner } from '@webservices/ui';

export default function PageDetails() {
	const { ref, inView } = useInView({
		threshold: 0,
	});
	const {
		searchValue,
		onChange,
		handleClear,
		isPending,
		parents,
		handlePetParent,
		parentDetails,
		refetchParents,
		handleAddParent,
		fetchNextPage,
		isFetchingNextPage,
	} = useSearchHook();

	useEffect(() => {
		if (inView) {
			fetchNextPage();
		}
	}, [fetchNextPage, inView]);

	return (
		<div className="relative mt-12">
			<div className="grid grid-cols-5 gap-24 items-start">
				<SearchInput
					searchValue={searchValue}
					onChange={onChange}
					handleClear={handleClear}
					isPending={isPending}
					parents={parents}
					handlePetParent={handlePetParent}
					handleAddParent={handleAddParent}
				/>
				{parentDetails && (
					<PetParent
						parentId={parentDetails.parent?.parentId}
						memberId={parentDetails?.memberId}
						refetchParents={refetchParents}
					/>
				)}
			</div>
			<div className="text-center flex flex-col gap-6" ref={ref}>
				{isFetchingNextPage && (
					<>
						<Spinner />
						<span className="text-12 font-medium">Fetching more parents...</span>
					</>
				)}
			</div>
		</div>
	);
}
