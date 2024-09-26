import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import dynamic from 'next/dynamic';
import { useCallback } from 'react';

import { useRecordSidebar } from '../../../context/record-sidebar-context';
import { CategoryLoader } from '@webservices/ui';

const UploadRecord = dynamic(() => import('./upload-record'), {
	loading: () => <CategoryLoader rows={1} columns={1} coverHeight={220} />,
});

const ActiveContent = () => {
	const { activeType } = useRecordSidebar();
	switch (activeType) {
		case 'upload':
			return <UploadRecord />;
		// case 'vaccination':
		// 	return <VaccinationForm />;
		// case 'followup':
		// 	return <FollowupForm />;
		default:
			return null;
	}
};

const RecordsSidebar = () => {
	const { showSidebar, resetSidebar } = useRecordSidebar();

	const unMountSidebar = useCallback(() => {
		resetSidebar();
	}, [resetSidebar]);

	return (
		<Dialog
			as="section"
			className="relative z-[12] focus:outline-none"
			open={showSidebar}
			onClose={unMountSidebar}
		>
			<DialogBackdrop
				as="section"
				className="fixed inset-0 bg-gray-700 bg-opacity-60 backdrop-blur"
			/>
			<section className="fixed inset-0 z-50 w-screen">
				<section className="absolute right-0 min-w-[420px] max-w-[420px] h-screen bg-white overflow-y-auto">
					<DialogPanel
						as="section"
						transition={true}
						className="w-full rounded-8 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0 h-[calc(100vh-84px)] px-16"
					>
						<section className="flex items-center py-24 w-full gap-16"></section>
						<ActiveContent />
					</DialogPanel>
				</section>
			</section>
		</Dialog>
	);
};

export default RecordsSidebar;
