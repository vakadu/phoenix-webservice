'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { useGetPetParentsMutation } from '@webservices/api';
import { debounce } from '@webservices/helpers';
import Loading from '../loading/loading';
import Search from './components/search';
import Parent from './components/parent';

export function SearchParentsModal() {
	const [value, setValue] = useState('');
	const { mutate: getPetParents, data, isPending } = useGetPetParentsMutation();
	const [activeParent, setActiveParent] = useState<string>('');
	const [focusedIndex, setFocusedIndex] = useState<number>(-1);
	const scrollRef = useRef<HTMLDivElement | null>(null);

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

	const handleParent = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			e.stopPropagation();
			const id = (e.target as HTMLElement).closest('[data-id]')?.getAttribute('data-id');
			if (id) {
				setActiveParent(id);
				const parentsData = data?.data?.parents || [];
				const index = parentsData.findIndex((parent) => parent._id === id);
				setFocusedIndex(index);
			}
		},
		[data?.data?.parents]
	);

	const onClear = useCallback(() => {
		setValue('');
	}, []);

	const handleKeyDown = useCallback(
		(e: KeyboardEvent) => {
			e.preventDefault();
			const parentsData = data?.data?.parents || [];
			if (parentsData.length <= 0) {
				return;
			}

			if (e.code === 'ArrowDown') {
				setFocusedIndex((prevIndex) =>
					prevIndex < parentsData.length - 1 ? prevIndex + 1 : 0
				);
			}
			if (e.code === 'ArrowUp') {
				setFocusedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
			}
			if (e.code === 'Enter' && focusedIndex >= 0) {
				const selectedParent = parentsData[focusedIndex]._id;
				setActiveParent(selectedParent);
			}
		},
		[data?.data?.parents, focusedIndex]
	);

	useEffect(() => {
		const parentsData = data?.data?.parents || [];
		if (parentsData.length > 0 && focusedIndex >= 0) {
			const parentElement = document.getElementById(parentsData[focusedIndex]?._id);
			if (parentElement) {
				parentElement.scrollIntoView({
					block: 'nearest',
					behavior: 'smooth',
				});
			}
		}
	}, [focusedIndex, data?.data?.parents]);

	useEffect(() => {
		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [handleKeyDown]);

	return (
		<div className="mt-[54px]">
			<Search value={value} onChange={onChange} onClear={onClear} />
			<div ref={scrollRef} className="mt-16 bg-white rounded-8 overflow-y-scroll h-[600px]">
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
						focusedIndex={focusedIndex}
					/>
				)}
			</div>
		</div>
	);
}

export default SearchParentsModal;
