'use client';

import { useState } from 'react';

import UserProfileImage from '../../molecules/user/profile-image';
import Pets from '../../molecules/user/pets';
import { useRouterQuery } from '@webservices/hooks';
import { useGetParentById } from '@webservices/api';

const User = () => {
	const { query } = useRouterQuery();
	const { data: parentData, refetch } = useGetParentById(query['parent-id'] as string);
	const { name } = parentData?.data.parents?.[0].parent || {};
	const [show, setShow] = useState(false);

	return (
		<section className="grid grid-cols-5 px-16 gap-[42px]">
			<div className="col-span-1">
				<UserProfileImage id={query['parent-id'] as string} />
			</div>
			<div className="col-span-4">
				<div className="flex gap-12 mb-24 items-end">
					<h2 className="text-32 font-semibold">{name}</h2>
					<span
						onClick={() => setShow(true)}
						className="relative bottom-6 text-14 border-b border-primary-1 text-primary-1 cursor-pointer"
					>
						Edit
					</span>
				</div>
				<Pets id={query['parent-id'] as string} />
			</div>
		</section>
	);
};

export default User;
