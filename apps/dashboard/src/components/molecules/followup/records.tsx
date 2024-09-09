import { useGetFollowRecords } from '@webservices/api';
import { CategoryLoader } from '@webservices/ui';
import { useRecordSidebar } from '../../../context/record-sidebar-context';
import FollowupRecord from '../../atoms/followup-record';

const Followups = () => {
	const { activeRecord, selectedDate } = useRecordSidebar();
	const { data, isPending } = useGetFollowRecords({
		type: activeRecord,
		date: selectedDate,
	});

	if (isPending) {
		return (
			<section className="px-16 mt-12">
				<CategoryLoader columns={1} rows={4} />
			</section>
		);
	}

	if (data && data?.data?.followUpRecords?.length <= 0) {
		return (
			<section className="px-16 mt-24">
				<p className="text-16 font-semibold">No records found</p>
			</section>
		);
	}

	return (
		<section className="px-16 mt-12">
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
