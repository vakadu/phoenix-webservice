import { useGetVaccinationRecords } from '@webservices/api';
import { CategoryLoader } from '@webservices/ui';
import { useRecordSidebar } from '../../../context/record-sidebar-context';
import VaccinationRecord from '../../atoms/vaccination-record';

const Vaccination = () => {
	const { activeRecord, selectedDate } = useRecordSidebar();
	const { data, isPending } = useGetVaccinationRecords({
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

	if (data && data?.data?.vaccinationRecords?.length <= 0) {
		return (
			<section className="px-16 mt-24">
				<p className="text-16 font-semibold">No records found</p>
			</section>
		);
	}

	return (
		<section className="px-16 mt-12">
			{data?.data?.vaccinationRecords?.map((vaccinationRecord) => (
				<VaccinationRecord
					key={vaccinationRecord._id}
					record={vaccinationRecord}
					activeRecord={activeRecord}
					selectedDate={selectedDate}
				/>
			))}
		</section>
	);
};

export default Vaccination;