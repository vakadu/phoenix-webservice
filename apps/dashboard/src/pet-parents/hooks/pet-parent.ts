'use client';

import { useDispatch } from 'react-redux';

import { createFormDataForImage } from '@webservices/helpers';
import { useRouterQuery } from '@webservices/hooks';
import { ApiEndpoints, ModalTypes } from '@webservices/primitives';
import { HttpService } from '@webservices/services';
import { openModal } from '@webservices/slices';
import { useCallback } from 'react';
import { useGetParentById, useGetPets, useGetUserProfileUrl } from '@webservices/api';

export default function usePetParentHook(
	parentId: string,
	memberId: string,
	refetchParents: () => void
) {
	const dispatch = useDispatch();
	const { router } = useRouterQuery();
	const { data, refetch: refetchUrl } = useGetUserProfileUrl(parentId as string);
	const { data: parentData, refetch: refecthUser } = useGetParentById(parentId as string);
	const { profileUrl } = data?.data || {};
	const { parent } = parentData?.data?.parents?.[0] || {};
	const { data: petsData } = useGetPets(parentId as string);
	const { pets } = petsData?.data || {};

	const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const formData = createFormDataForImage(file, 'file');
			try {
				const { data } = await HttpService.patch(
					`${process.env.NEXT_PUBLIC_BASE_PATH}/${ApiEndpoints.UploadClinicMemberProfile}/${parentId}`,
					formData,
					{
						headers: {
							'Content-Type': 'multipart/form-data',
							'cache-control': 'no-cache',
						},
					}
				);
				if (data.status === 'SUCCESS') {
					refetchUrl();
					refecthUser();
				}
			} catch (err) {
				throw new Error('Network Error');
			}
		}
	};

	const handleEditParent = useCallback(() => {
		dispatch(
			openModal({
				isOpen: true,
				view: ModalTypes.ADD_EDIT_PARENT,
				type: 'edit',
				data: {
					parentId: parentId,
					memberId: memberId,
				},
				refetch: refetchParents,
			})
		);
	}, []);

	const handlePet = useCallback((pet: ICommonTypes.IPet) => {
		router.push(`/pet/${pet.petId}?parentId=${parentId}`);
	}, []);

	const handleAddPet = useCallback(() => {
		dispatch(
			openModal({
				isOpen: true,
				view: ModalTypes.ADD_EDIT_PET,
				type: 'add',
				data: {
					parentId,
				},
				refetch: refetchParents,
			})
		);
	}, []);

	return {
		handleAddPet,
		handlePet,
		handleEditParent,
		onChange,
		profileUrl,
		parent,
		pets,
	};
}
