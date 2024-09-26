import { useGetVaccinationRecords } from '@webservices/api';
import { CategoryLoader, ImagePlaceholder } from '@webservices/ui';
import { useRecordSidebar } from '../../../context/record-sidebar-context';
import VaccinationRecord from '../../atoms/vaccination-record';
import { useRouterQuery } from '@webservices/hooks';

const Vaccination = () => {
	const { activeRecord, selectedDate } = useRecordSidebar();
	const { params } = useRouterQuery();
	const petId = params.get('petId') || undefined;
	const { data, isPending } = useGetVaccinationRecords({
		type: activeRecord,
		date: !petId ? selectedDate : undefined,
		petId,
	});

	if (isPending) {
		return <CategoryLoader columns={1} rows={4} />;
	}

	if (data && data?.data?.vaccinationRecords?.length <= 0) {
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
