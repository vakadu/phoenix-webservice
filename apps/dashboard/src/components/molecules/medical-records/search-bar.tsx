import { useCallback, useEffect, useState } from 'react';

import Search from '../../atoms/search';
import { debounce } from '@webservices/helpers';
import { useGetPetParentsMutation } from '@webservices/api';
import PetParent from '../../atoms/pet-parent';
import { useRecordSidebar } from '../../../context/record-sidebar-context';
import { CategoryLoader } from '@webservices/ui';

const SearchBar = () => {
	const [value, setValue] = useState('');
	const { mutate: getPetParents, data, isPending } = useGetPetParentsMutation();
	const { handleActiveParent, activeParentId, handleActiveType } = useRecordSidebar();

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
		setValue('');
	}, []);

	const handlePetParent = useCallback((parent: IClinicTypes.IPetParent) => {
		handleActiveParent(parent?.parent?.parentId);
		handleActiveType('pets');
	}, []);

	return (
		<section className="px-16">
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
							active={parent?.parent?.parentId === activeParentId}
						/>
					);
				})
			)}
		</section>
	);
};

export default SearchBar;
