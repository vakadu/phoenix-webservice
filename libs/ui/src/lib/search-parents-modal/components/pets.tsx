'use client';

import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { useDispatch, useSelector } from 'react-redux';

import { useGetPets } from '@webservices/api';
import CategoryLoader from '../../category-loader/category-loader';
import Pet from './pet';
import { closeModal, PemilyRootState } from '@webservices/slices';
import RecordUpload from './record-upload';
import VaccinationForm from '../../vaccination-form/vaccination-form';

function PetsList({ activeParent, activeClinic }: { activeParent: string; activeClinic: string }) {
	const { data, isPending } = useGetPets(activeParent as string);
	const [activePet, setActivePet] = useState('');
	const [focusedIndex, setFocusedIndex] = useState(-1);
	const modalData = useSelector((state: PemilyRootState) => state.modal);
	const recordType = modalData?.data?.type;
	const activeFilter = modalData?.data?.activeFilter;
	const refetch = modalData?.data?.refetch;
	const dispatch = useDispatch();

	const petsData = useMemo(() => {
		return data?.data?.pets || [];
	}, [data?.data?.pets]);

	const handleKeyDown = useCallback(
		(ev: KeyboardEvent) => {
			if (petsData?.length <= 0) {
				return;
			}
			let newIndex = focusedIndex;

			if (ev.code === 'ArrowLeft') {
				newIndex = focusedIndex > 0 ? focusedIndex - 1 : 0;
			} else if (ev.code === 'ArrowRight') {
				newIndex =
					focusedIndex < petsData.length - 1 ? focusedIndex + 1 : petsData.length - 1;
			}
			if (newIndex !== focusedIndex) {
				setFocusedIndex(newIndex);
				setActivePet(petsData[newIndex]?.petId);
			}
		},
		[focusedIndex, petsData]
	);

	useEffect(() => {
		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [handleKeyDown]);

	const handlePet = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			e.stopPropagation();
			const id = (e.target as HTMLElement)
				.closest('[data-id]')
				?.getAttribute('data-id') as string;
			const index = petsData?.findIndex((pet) => pet.petId === id);
			setActivePet(id);
			setFocusedIndex(index);
		},
		[petsData]
	);

	const handleClose = useCallback(() => {
		dispatch(closeModal());
	}, []);

	if (isPending) {
		return (
			<div className="pt-16 ml-[48px] text-14 font-medium">
				<CategoryLoader rows={1} backgroundColor="#FFF" />
			</div>
		);
	}

	if (petsData.length <= 0) {
		return <div className="pt-16 ml-[48px] text-14 font-medium">No Pets found.</div>;
	}

	return (
		<div className="pt-16 ml-[48px]">
			<div onClick={handlePet}>
				<Swiper
					navigation
					pagination
					modules={[Navigation]}
					className="pet"
					slidesPerView={5}
				>
					{petsData?.map((pet, index) => {
						const active = activePet === pet.petId;
						return (
							<SwiperSlide key={pet.petId}>
								<Pet
									pet={pet}
									height="h-[92px]"
									containerStyles={active ? 'bg-white p-8 shadow-base' : 'p-8'}
									index={index}
								/>
							</SwiperSlide>
						);
					})}
				</Swiper>
			</div>
			{Boolean(activePet) && recordType === 'medical-records' && (
				<RecordUpload
					filter={activeFilter}
					parentId={activeParent}
					petId={activePet}
					refetch={refetch}
					activeClinic={activeClinic}
				/>
			)}
			{Boolean(activePet) && recordType === 'vaccination' && (
				<VaccinationForm
					parentId={activeParent}
					petId={activePet}
					refetch={refetch}
					handleClose={handleClose}
					type="modal"
				/>
			)}
		</div>
	);
}

export default memo(PetsList);
