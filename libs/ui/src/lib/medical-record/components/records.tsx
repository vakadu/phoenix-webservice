import { memo } from 'react';

import useRecord from '../hooks/record.hook';
import CategoryLoader from '../../category-loader/category-loader';
import ImagePlaceholder from '../../image-placeholder/image-placeholder';
import RecordItem from './record-item';

interface IRecord {
	activeFilter: string;
	petId: string;
	selectedDate: string;
}

function Record({ activeFilter, petId, selectedDate }: IRecord) {
	const { isPending, medicalRecords, refetch } = useRecord({ activeFilter, petId, selectedDate });

	if (isPending) {
		return <CategoryLoader columns={1} rows={4} />;
	}

	if (medicalRecords && medicalRecords?.length <= 0) {
		return (
			<div className="py-[82px] flex flex-col gap-24 justify-center items-center">
				<ImagePlaceholder
					containerClasses="w-[120px] h-[180px]"
					src="/images/no-records.svg"
				/>
				<p className="text-16 font-medium">No Records found.</p>
			</div>
		);
	}

	return (
		<div className="mt-12 min-h-[395px]">
			{medicalRecords?.map((record) => {
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

export default memo(Record);
