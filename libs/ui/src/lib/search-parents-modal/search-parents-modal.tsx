'use client';

import { useCallback, useEffect, useState } from 'react';

import { useGetPetParentsMutation } from '@webservices/api';
import { debounce } from '@webservices/helpers';
import Loading from '../loading/loading';
import Search from './components/search';
import Parent from './components/parent';

export function SearchParentsModal() {
	const [value, setValue] = useState('');
	const { mutate: getPetParents, data, isPending } = useGetPetParentsMutation();
	const [activeParent, setActiveParent] = useState<string>('');

	useEffect(() => {
		getPetParents('');
	}, []);

	const debouncedFilter = useCallback(
		debounce((input: string) => {
			getPetParents(input);
		}, 300),
		[]
	);

	const onChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const val = e.target.value;
			setValue(val);
			debouncedFilter(val);
		},
		[debouncedFilter]
	);

	const handleParent = useCallback((item: IClinicTypes.IPetParent) => {
		setActiveParent(item._id);
	}, []);

	const onClear = useCallback(() => {
		setValue('');
	}, []);

	return (
		<div className="mt-[54px]">
			<Search value={value} onChange={onChange} onClear={onClear} />
			<div className="mt-16 bg-white rounded-8 overflow-y-scroll h-[600px]">
				{isPending && (
					<div className="flex flex-col gap-12 items-center justify-center h-full">
						<Loading />
						<span className="text-14 font-medium">Fetching parents...</span>
					</div>
				)}
				{!isPending && data?.data?.parents && data?.data?.parents?.length <= 0 ? (
					<div className="flex flex-col gap-12 items-center justify-center h-full">
						<span className="text-14 font-medium">No Parents found.</span>
					</div>
				) : (
					<Parent
						data={data?.data?.parents as IClinicTypes.IPetParent[]}
						handleParent={handleParent}
						activeParent={activeParent}
					/>
				)}
			</div>
		</div>
	);
}

export default SearchParentsModal;
