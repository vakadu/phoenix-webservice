import { DaysItem } from '@webservices/ui';
import { useRecordSidebar } from '../../../context/record-sidebar-context';

const Days = () => {
	const { selectedDate, handleDate } = useRecordSidebar();

	return <DaysItem selectedDate={selectedDate} handleDate={handleDate} />;
};

export default Days;
