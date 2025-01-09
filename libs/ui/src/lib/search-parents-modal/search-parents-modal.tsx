'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useSelector } from 'react-redux';

import Loading from '../loading/loading';
import Search from './components/search';
import Parent from './components/parent';
import { useGetPetParentsList } from './api/get-pet-parents';
import Spinner from '../spinner/spinner';
import { PemilyRootState } from '@webservices/slices';

export function SearchParentsModal() {
	const [value, setValue] = useState('');
	const [activeParent, setActiveParent] = useState<string>('');
	const [activeClinic, setActiveClinic] = useState<string>('');
	const [focusedIndex, setFocusedIndex] = useState<number>(-1);
	const scrollRef = useRef<HTMLDivElement | null>(null);
	const modalData = useSelector((state: PemilyRootState) => state.modal);
	const { data: modalD } = modalData;
	const { data, refetch, isPending, fetchNextPage, isFetchingNextPage } = useGetPetParentsList(
		value,
		10,
		modalD.type,
	);
	const parents = data?.pages.flatMap((page) => page?.data?.data?.parents) || [];
	const { ref, inView } = useInView({
		threshold: 0,
	});

	useEffect(() => {
		if (inView) {
			fetchNextPage();
		}
	}, [fetchNextPage, inView]);

	const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		const val = e.target.value;
		setValue(val);
	}, []);

	const handleParent = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			e.stopPropagation();
			const parentId = (e.target as HTMLElement)
				.closest('[data-parentid]')
				?.getAttribute('data-parentid');
			const clinicId = (e.target as HTMLElement)
				.closest('[data-clinicid]')
				?.getAttribute('data-clinicid') as string;
			if (parentId) {
				setActiveParent(parentId);
				setActiveClinic(clinicId);
				const index = parents.findIndex((parent) => parent.parent.parentId === parentId);
				setFocusedIndex(index);
			}
		},
		[parents],
	);

	const onClear = useCallback(() => {
		setValue('');
	}, []);

	const handleKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if (parents.length <= 0) {
				return;
			}

			if (e.code === 'ArrowDown') {
				setFocusedIndex((prevIndex) =>
					prevIndex < parents.length - 1 ? prevIndex + 1 : 0,
				);
			}
			if (e.code === 'ArrowUp') {
				setFocusedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
			}

			if (e.code === 'Enter' && focusedIndex >= 0) {
				const selectedParent = parents[focusedIndex].parent.parentId;
				const selectedClinic = parents[focusedIndex].clinicId;
				setActiveParent(selectedParent);
				setActiveClinic(selectedClinic);
			}
		},
		[parents, focusedIndex],
	);

	useEffect(() => {
		if (parents && parents.length > 0 && focusedIndex >= 0) {
			const parentElement = document.getElementById(parents[focusedIndex]?._id);
			if (parentElement) {
				parentElement.scrollIntoView({
					block: 'nearest',
					behavior: 'smooth',
				});
			}
		}
	}, [focusedIndex, parents]);

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
				{!isPending && parents && parents?.length <= 0 ? (
					<div className="flex flex-col gap-12 items-center justify-center h-full">
						<span className="text-14 font-medium">No Parents found.</span>
					</div>
				) : (
					<Parent
						data={parents as IClinicTypes.IPetParent[]}
						handleParent={handleParent}
						activeParent={activeParent}
						focusedIndex={focusedIndex}
						activeClinic={activeClinic}
					/>
				)}
				<div className="text-center flex flex-col gap-6" ref={ref}>
					{isFetchingNextPage && (
						<>
							<Spinner />
							<span className="text-12 font-medium">Fetching more parents...</span>
						</>
					)}
				</div>
			</div>
		</div>
	);
}

export default SearchParentsModal;
