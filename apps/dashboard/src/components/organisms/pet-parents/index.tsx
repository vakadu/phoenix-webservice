'use client';

import { useState } from 'react';
import PetParentsSearch from '../../molecules/pet-parents/search';
import ParentDetails from '../../molecules/pet-parents/parent';

const PetParents = () => {
	const [parentId, setParentId] = useState('');

	return (
		<div className="px-16">
			<h1 className="text-24 font-semibold pb-24">Search</h1>
			<div className="grid grid-cols-5 gap-24">
				<PetParentsSearch handleParent={setParentId} />
				{parentId !== '' && <ParentDetails parentId={parentId} />}
			</div>
		</div>
	);
};

export default PetParents;
