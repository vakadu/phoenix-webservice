import { memo } from 'react';

import useRecord from '../hooks/record.hook';
import CategoryLoader from '../../category-loader/category-loader';
import ImagePlaceholder from '../../image-placeholder/image-placeholder';
import RecordItem from './record-item';

interface IRecord {
	activeFilter: string;
	petId: string;
}

function Record({ activeFilter, petId }: IRecord) {
	const { isPending, medicalRecords, refetch } = useRecord({ activeFilter, petId });

	if (isPending) {
		return <CategoryLoader columns={1} rows={4} />;
	}

	if (medicalRecords && medicalRecords?.length <= 0) {
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
		<div className="mt-12 pb-32">
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
