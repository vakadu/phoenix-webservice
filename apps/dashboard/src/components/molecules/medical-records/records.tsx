import { useGetMedicalRecords } from '@webservices/api';
import { useRecordHeader } from '../../../context/record-header-context';

const Records = () => {
	const { activeRecord } = useRecordHeader();
	const { data } = useGetMedicalRecords({ type: activeRecord });
	return <section></section>;
};

export default Records;
