'use client';

import { memo } from 'react';

import { Button, CategoryLoader } from '@webservices/ui';
import Search from '../../../components/atoms/search';
import PetParent from '../../../components/atoms/pet-parent';

function SearchInput({
	searchValue,
	onChange,
	handleClear,
	isPending,
	parents,
	handlePetParent,
}: {
	searchValue: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleClear: () => void;
	isPending: boolean;
	parents: IClinicTypes.IPetParent[] | undefined;
	handlePetParent: (parent: IClinicTypes.IPetParent) => void;
}) {
	return (
		<div className="col-span-3">
			<div className="flex items-center justify-between my-12">
				<h1 className="text-24 font-semibold">Search</h1>
				<Button>
					<span className="font-black tracking-[-0.41px]">Add Parent</span>
				</Button>
			</div>
			<Search
				placeholder="Search by name, pet name etc..."
				value={searchValue}
				handleChange={onChange}
				handleClear={handleClear}
			/>
			{isPending ? (
				<CategoryLoader rows={3} columns={1} />
			) : (
				parents?.map((parent) => {
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
}

export default memo(SearchInput);