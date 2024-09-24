'use client';

import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import PetParentsSearch from '../../molecules/pet-parents/search';
import { Button } from '@webservices/ui';
import { useGetPetParentsMutation } from '@webservices/api';
import { debounce } from '@webservices/helpers';
import { openModal } from '@webservices/slices';
import { ModalTypes } from '@webservices/primitives';
import PetParentDetails from '../../molecules/pet-parents/pet-parent';

const PetParents = () => {
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

	const refetchParents = () => {
		getPetParents(value);
	};

	const onChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const val = e.target.value;
			setValue(val);
			debouncedFilter(val);
		},
		[debouncedFilter]
	);

	const handleClear = useCallback(() => {
		getPetParents('');
		setValue('');
	}, []);

	const handleAddParent = () => {
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

	return (
		<>
			<div className="grid grid-cols-5 gap-24 mb-24">
				<div className="flex items-center justify-between col-span-3">
					<h1 className="text-24 font-semibold">Search</h1>
					<Button onClick={handleAddParent}>
						<span className="font-black tracking-[-0.41px]">Add Parent</span>
					</Button>
				</div>
			</div>
			<div className="grid grid-cols-5 gap-24 items-start">
				<PetParentsSearch
					handleParent={setParentDetails}
					value={value}
					onChange={onChange}
					handleClear={handleClear}
					data={data?.data?.parents as IClinicTypes.IPetParent[]}
					isPending={isPending}
				/>
				{parentDetails && (
					<PetParentDetails parentDetails={parentDetails} refetch={refetchParents} />
				)}
			</div>
		</>
	);
};

export default PetParents;
