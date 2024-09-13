import { useCallback, useEffect, useState } from 'react';

import Search from '../../atoms/search';
import { CategoryLoader } from '@webservices/ui';
import PetParent from '../../atoms/pet-parent';
import { debounce } from '@webservices/helpers';
import { useGetPetParentsMutation } from '@webservices/api';

const PetParentsSearch = ({ handleParent }: { handleParent: (p: string) => void }) => {
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
		// router.push(`/user/${parent.parent.parentId}`);
		// setParentId(parent.parent.parentId);
		handleParent(parent.parent.parentId);
	}, []);

	return (
		<div className="col-span-3">
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
	);
};

export default PetParentsSearch;
