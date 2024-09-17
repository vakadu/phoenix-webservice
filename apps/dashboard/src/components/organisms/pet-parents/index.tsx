'use client';

import { useCallback, useEffect, useState } from 'react';

import PetParentsSearch from '../../molecules/pet-parents/search';
import Pets from '../../molecules/user/pets';
import UserProfileImage from '../../molecules/user/profile-image';
import ParentDetails from '../../molecules/user/details';
import AddEditParent from '../../molecules/user/add-edit-parent';
import { Button } from '@webservices/ui';
import { useGetPetParentsMutation } from '@webservices/api';
import { debounce } from '@webservices/helpers';

interface IPetParent {
	parentId: string;
	memberId: string;
}

const PetParents = () => {
	const [parent, setParent] = useState<IPetParent>({
		parentId: '',
		memberId: '',
	});
	const [show, setShow] = useState(false);
	const [type, setType] = useState<'add' | 'edit'>('add');
	const [value, setValue] = useState('');
	const { mutate: getPetParents, data, isPending } = useGetPetParentsMutation();

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

	const handleModal = (type: 'add' | 'edit') => {
		setShow(true);
		setType(type);
	};

	return (
		<div className="px-16">
			<div className="grid grid-cols-5 gap-24 mb-24">
				<div className="flex items-center justify-between col-span-3">
					<h1 className="text-24 font-semibold">Search</h1>
					<Button onClick={() => handleModal('add')}>
						<span className="font-black tracking-[-0.41px]">Add Parent</span>
					</Button>
				</div>
			</div>
			<div className="grid grid-cols-5 gap-24">
				<PetParentsSearch
					handleParent={setParent}
					value={value}
					onChange={onChange}
					handleClear={handleClear}
					data={data?.data?.parents as IClinicTypes.IPetParent[]}
					isPending={isPending}
				/>
				{/* {parent.parentId !== '' && (
					<div className="sticky top-[calc(72px)] bg-white w-full shadow-base col-span-2 rounded-8 h-[calc(100vh-160px)] overflow-y-scroll no-scrollbar">
						<div className="flex px-16 gap-32 py-32 items-center">
							<UserProfileImage id={parent.parentId} />
							<ParentDetails
								handleEdit={() => handleModal('edit')}
								id={parent.parentId}
							/>
						</div>
						<Pets id={parent.parentId} />
					</div>
				)} */}
			</div>
			<AddEditParent
				open={show}
				handleClose={() => setShow(false)}
				parent={parent}
				modalType={type}
				refetchParents={refetchParents}
			/>
		</div>
	);
};

export default PetParents;
