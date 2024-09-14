import { useCallback } from 'react';

import Search from '../../atoms/search';
import { CategoryLoader } from '@webservices/ui';
import PetParent from '../../atoms/pet-parent';

interface IPetParent {
	parentId: string;
	memberId: string;
}

const PetParentsSearch = ({
	handleParent,
	value,
	onChange,
	handleClear,
	isPending,
	data,
}: {
	handleParent: (p: IPetParent) => void;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleClear: () => void;
	isPending: boolean;
	data: IClinicTypes.IPetParent[];
}) => {
	const handlePetParent = useCallback(
		(parent: IClinicTypes.IPetParent) => {
			const parentData: IPetParent = {
				parentId: parent.parent.parentId,
				memberId: parent?.memberId,
			};
			handleParent(parentData);
		},
		[handleParent]
	);

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
				data?.map((parent) => {
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
