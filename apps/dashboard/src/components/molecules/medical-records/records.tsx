import { useGetMedicalRecords } from '@webservices/api';
import MedicalRecord from '../../atoms/medical-record';
import { CategoryLoader, ImagePlaceholder } from '@webservices/ui';
import { useRecordSidebar } from '../../../context/record-sidebar-context';
import { useRouterQuery } from '@webservices/hooks';

const Records = () => {
	const { params } = useRouterQuery();
	const petId = params.get('petId') || undefined;
	const { activeRecord, selectedDate } = useRecordSidebar();
	const { data, isPending } = useGetMedicalRecords({
		type: activeRecord,
		date: !petId ? selectedDate : undefined,
		petId,
	});

	if (isPending) {
		return <CategoryLoader columns={1} rows={4} />;
	}

	if (data && data?.data?.medicalRecords?.length <= 0) {
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
			{data?.data?.medicalRecords?.map((medicalRecord) => (
				<MedicalRecord key={medicalRecord._id} record={medicalRecord} />
			))}
		</section>
	);
};

export default Records;
