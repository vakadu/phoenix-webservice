import ImagePlaceholder from '../../image-placeholder/image-placeholder';
import useCertificate from '../hooks/use-certificate';
import RecordItem from '../components/item';
import CategoryLoader from '../../category-loader/category-loader';

export default function Certificate({ activeFilter, petId }: { activeFilter: string, petId: string }) {
	const { records, refetch, isPending } = useCertificate({ activeFilter, petId });

	if (isPending) {
		return <CategoryLoader columns={1} rows={4} />;
	}

	if (records && records?.length <= 0) {
		return (
			<div className="py-[82px] flex flex-col gap-24 justify-center items-center">
				<ImagePlaceholder
					containerClasses="w-[120px] h-[150px]"
					src="/images/no-records.svg"
				/>
				<p className="text-16 font-medium">No Records found.</p>
			</div>
		);
	}

	return (
		<div className="mt-12 min-h-[360px]">
			{records?.map((record) => {
				return (
					<RecordItem
						key={record._id}
						record={record}
						refetch={refetch}
						activeFilter={activeFilter}
					/>
				);
			})}
		</div>
	);
}
