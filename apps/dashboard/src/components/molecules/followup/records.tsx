import { useGetFollowRecords } from '@webservices/api';
import { CategoryLoader, ImagePlaceholder } from '@webservices/ui';
import { useRecordSidebar } from '../../../context/record-sidebar-context';
import FollowupRecord from '../../atoms/followup-record';
import { useRouterQuery } from '@webservices/hooks';

const Followups = () => {
	const { activeRecord, selectedDate } = useRecordSidebar();
	const { params } = useRouterQuery();
	const petId = params.get('petId') || undefined;
	const { data, isPending } = useGetFollowRecords({
		type: activeRecord,
		date: !petId ? selectedDate : undefined,
		petId,
	});

	if (isPending) {
		return <CategoryLoader columns={1} rows={4} />;
	}

	if (data && data?.data?.followUpRecords?.length <= 0) {
		return (
			<div className="mt-[124px] flex flex-col gap-24 justify-center items-center">
				<ImagePlaceholder
					containerClasses="w-[120px] h-[120px]"
					src="/images/no-records.svg"
				/>
				<p className="text-18 font-medium">No Records found.</p>
			</div>
		);
	}

	return (
		<section className="mt-12 pb-32">
			{data?.data?.followUpRecords?.map((followUpRecord) => (
				<FollowupRecord
					key={followUpRecord._id}
					record={followUpRecord}
					activeRecord={activeRecord}
					selectedDate={selectedDate}
				/>
			))}
		</section>
	);
};

export default Followups;
