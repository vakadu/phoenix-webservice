'use client';

import { useCallback, useEffect, useState } from 'react';

import Search from '../../atoms/search';
import { debounce } from '@webservices/helpers';
import { useGetPetParentsMutation } from '@webservices/api';
import { CategoryLoader } from '@webservices/ui';
import PetParent from '../../atoms/pet-parent';
import { useRouterQuery } from '@webservices/hooks';

const PetParents = () => {
	const [value, setValue] = useState('');
	const { mutate: getPetParents, data, isPending } = useGetPetParentsMutation();
	const { router } = useRouterQuery();

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

	const handleClear = useCallback(() => {
		getPetParents('');
		setValue('');
	}, []);

	const handlePetParent = useCallback((parent: IClinicTypes.IPetParent) => {
		router.push(`/user/${parent.parent.parentId}`);
	}, []);

	return (
		<div className="bg-white px-32 py-24">
			<div className="max-w-3xl mx-auto">
				<Search
					placeholder="Search by name, pet name etc..."
					value={value}
					handleChange={onChange}
					handleClear={handleClear}
				/>
				{isPending ? (
					<CategoryLoader rows={3} columns={1} />
				) : (
					data?.data?.parents?.map((parent) => {
						return (
							<PetParent
								handlePetParent={handlePetParent}
								key={parent?._id}
								parent={parent}
								active={false}
							/>
						);
					})
				)}
			</div>
		</div>
	);
};

export default PetParents;
