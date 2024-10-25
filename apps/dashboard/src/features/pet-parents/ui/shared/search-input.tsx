'use client';

import { memo } from 'react';

import { Button, CategoryLoader } from '@webservices/ui';
import Search from '../../../../core/ui/search';
import PetParent from '../../../../core/ui/pet-parent';
import { PlusIcon } from '@webservices/icons';

function SearchInput({
	searchValue,
	onChange,
	handleClear,
	isPending,
	parents,
	handlePetParent,
	handleAddParent,
}: {
	searchValue: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleClear: () => void;
	isPending: boolean;
	parents: IClinicTypes.IPetParent[] | undefined;
	handlePetParent: (parent: IClinicTypes.IPetParent) => void;
	handleAddParent: () => void;
}) {
	return (
		<div className="col-span-3">
			<div className="flex gap-24">
				<Search
					placeholder="Search by name, pet name etc..."
					value={searchValue}
					handleChange={onChange}
					handleClear={handleClear}
				/>
				<Button onClick={handleAddParent}>
					<span className="font-black tracking-[-0.41px]">Add Parent</span>
				</Button>
			</div>
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
