import { useGetParentById } from '@webservices/api';
import { Button } from '@webservices/ui';

const ParentDetails = ({ id, handleEdit }: { id: string; handleEdit: () => void }) => {
	const { data } = useGetParentById(id);
	const parent = data?.data?.parents?.[0];

	return (
		<div className="flex flex-col gap-16">
			<span className="text-16 font-medium"> {parent?.parent?.name}</span>
			<Button onClick={handleEdit} variant="ghost">
				<span className="font-black tracking-[-0.41px]">Edit</span>
			</Button>
		</div>
	);
};

export default ParentDetails;
