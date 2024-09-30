import { ButtonWrapper } from '@webservices/ui';
import { useRecordSidebar } from '../../../context/record-sidebar-context';
import { firstCharCapital } from '@webservices/helpers';

export default function UploadBtn({ record }: { record: string }) {
	const { activeRecord, handleSidebar, showSidebar } = useRecordSidebar();

	const onSidebarChange = () => {
		handleSidebar(!showSidebar);
	};

	return (
		<ButtonWrapper
			onClick={onSidebarChange}
			className="flex shadow-base border bg-primary-1 py-12 px-12 rounded-full"
		>
			{record === 'medical' && (
				<>
					<span className="font-black text-white tracking-[-0.41px]">
						Upload {firstCharCapital(activeRecord as string)}
					</span>
				</>
			)}
			{record === 'vaccination' && (
				<span className="font-black text-white tracking-[-0.41px]">Add Vaccination</span>
			)}
			{record === 'followup' && (
				<span className="font-black text-white tracking-[-0.41px]">Add Followup</span>
			)}
		</ButtonWrapper>
	);
}
