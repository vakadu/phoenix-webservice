import { useCallback, useState } from 'react';

import Search from '../../atoms/search';
import { debounce } from '@webservices/helpers';
import { useGetPetParentsMutation } from '@webservices/api';
import PetParent from '../../atoms/pet-parent';

const SearchBar = () => {
	const [value, setValue] = useState('');
	const { mutate: getPetParents, data, isPending } = useGetPetParentsMutation();

	const debouncedFilter = useCallback(
		debounce((input: string) => {
			getPetParents(input);
		}, 300),
		[]
	);
	console.log(data);

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

	return (
		<section className="py-24 px-16">
			<Search value={value} handleChange={onChange} handleClear={handleClear} />
			{isPending ? (
				<p className="text-14 mt-24">Fetching parents...</p>
			) : (
				data?.data?.parents?.map((parent) => {
					return <PetParent key={parent?._id} parent={parent} />;
				})
			)}
		</section>
	);
};

export default SearchBar;
