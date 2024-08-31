import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';

import { useRecordSidebar } from '../../../context/record-sidebar-context';
import SearchBar from './search-bar';
import { CloseIcon } from '@webservices/icons';

const RecordsSidebar = () => {
	const sidebar = useRecordSidebar();

	return (
		<Dialog
			as="section"
			className="relative z-[12] focus:outline-none"
			open={sidebar?.showSidebar}
			onClose={() => sidebar?.handleSidebar(!sidebar?.showSidebar)}
		>
			<DialogBackdrop
				as="section"
				className="fixed inset-0 bg-gray-700 bg-opacity-60 backdrop-blur"
			/>
			<section className="fixed inset-0 z-50 w-screen">
				<section className="absolute right-0 min-w-[380px] max-w-[380px] h-screen bg-white overflow-y-auto">
					{/* <DialogTitle
						as="button"
						onClick={() => sidebar?.handleSidebar(!sidebar?.showSidebar)}
						className="flex items-center justify-between mt-24 px-16 w-full"
					>
						<h3></h3>
						<CloseIcon width={18} height={18} />
					</DialogTitle> */}
					<DialogPanel
						as="section"
						transition
						className="w-full rounded-8 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0 h-screen"
					>
						<SearchBar />
					</DialogPanel>
				</section>
			</section>
		</Dialog>
	);
};

export default RecordsSidebar;
