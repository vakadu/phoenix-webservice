'use client';

import { useSelector } from 'react-redux';

import { useGetUser } from '@webservices/api';
import { PemilyRootState } from '@webservices/slices';
import { Roles } from '@webservices/primitives';
import CategoryLoader from '../../category-loader/category-loader';

function StaffName({ id }: { id: string }) {
	const { data } = useGetUser(id as string);
	const { name } = data?.data?.user || {};
	return <p className="text-24 font-semibold">{name}</p>;
}

export default function ClinicDetails() {
	const authState = useSelector((state: PemilyRootState) => state.auth);
	const { role } = authState;
	const { data, isPending } = useGetUser(authState.userId as string);
	const { name, clinicId } = data?.data?.user || {};

	if (isPending) {
		return (
			<div className="w-[250px]">
				<CategoryLoader rows={1} columns={1} coverHeight={24} />
			</div>
		);
	}

	return (
		<div className="flex-1">
			{role === Roles.Staff ? (
				<StaffName id={clinicId as string} />
			) : (
				<p className="text-24 font-semibold">{name}</p>
			)}
		</div>
	);
}
