import { useGetUser } from '@webservices/api';
import { Roles } from '@webservices/primitives';

export default function HeaderDetails({
	name,
	role,
	clinicId,
}: {
	name?: string;
	role: string;
	clinicId?: string | undefined;
}) {
	const { data } = useGetUser(clinicId);
	const { name: userName } = data?.data?.user || {};

	return (
		<div className="flex-1 items-center flex">
			<p className="text-24 font-semibold">{role === Roles.Staff ? userName : name}</p>
		</div>
	);
}
