'use client';

import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useGetPetParentsMutation } from '@webservices/api';
import { debounce } from '@webservices/helpers';
import { openModal } from '@webservices/slices';
import { ModalTypes, USER_EVENTS } from '@webservices/primitives';
import { logEvent } from '@webservices/services';

export default function useSearchHook() {
	const [parentDetails, setParentDetails] = useState<IClinicTypes.IPetParent>();
	const [value, setValue] = useState('');
	const { mutate: getPetParents, data, isPending } = useGetPetParentsMutation();
	const dispatch = useDispatch();

	useEffect(() => {
		getPetParents('');
	}, []);

	const debouncedFilter = useCallback(
		debounce((input: string) => {
			getPetParents(input);
		}, 300),
		[]
	);

	const refetchParents = useCallback(() => {
		getPetParents(value);
	}, [value]);

	const onChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const val = e.target.value;
			setValue(val);
			debouncedFilter(val);
		},
		[debouncedFilter]
	);

	const handleClear = useCallback(() => {
		logEvent({
			name: USER_EVENTS.SEARCH_PET_PARENT_CLEAR,
			events: {
				clearedValue: value,
			},
		});
		getPetParents('');
		setValue('');
	}, []);

	const handlePetParent = useCallback((parent: IClinicTypes.IPetParent) => {
		logEvent({
			name: USER_EVENTS.SEARCH_PET_PARENT_ITEM_SUGGESTION,
			events: {
				searchValue: value,
				...parent,
			},
		});
		setParentDetails(parent);
	}, []);

	const handleAddParent = () => {
		logEvent({
			name: USER_EVENTS.SEARCH_PET_PARENT_ADD_PARENT_MODAL,
			events: {
				parentId: parentDetails?.parent?.parentId,
				memberId: parentDetails?.memberId,
				type: 'add',
			},
		});
		dispatch(
			openModal({
				isOpen: true,
				view: ModalTypes.ADD_EDIT_PARENT,
				type: 'add',
				data: {
					parentId: parentDetails?.parent?.parentId,
					memberId: parentDetails?.memberId,
				},
				refetch: refetchParents,
			})
		);
	};

	return {
		getPetParents,
		onChange,
		handleClear,
		refetchParents,
		parents: data?.data?.parents,
		isPending,
		searchValue: value,
		handlePetParent,
		parentDetails,
		setParentDetails,
		handleAddParent,
	};
}
