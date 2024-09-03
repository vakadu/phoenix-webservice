import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import dynamic from 'next/dynamic';
import { useCallback, useMemo } from 'react';

import { useRecordSidebar } from '../../../context/record-sidebar-context';
import { BackIcon } from '@webservices/icons';
import { ButtonWrapper } from '@webservices/ui';
import { firstCharCapital } from '@webservices/helpers';
import { useRecordHeader } from '../../../context/record-header-context';

const UploadRecord = dynamic(() => import('./upload-record'), {
	loading: () => <p>Loading...</p>,
});

const SearchBar = dynamic(() => import('./search-bar'), {
	loading: () => <p>Loading...</p>,
});

const PetsList = dynamic(() => import('./pets-list'), {
	loading: () => <p>Loading...</p>,
});

const backItems = ['pet-parents', 'pets', 'upload'];

const ActiveContent = ({
	activeType,
	parentId,
	petId,
	activeClinicId,
	handleSidebar,
}: {
	activeType: string | null;
	parentId: string | null;
	petId: string | null;
	activeClinicId: string | null;
	handleSidebar: (s: boolean) => void;
}) => {
	const { activeRecord } = useRecordHeader();
	const btnTxt = `Upload ${firstCharCapital(activeRecord as string)}`;
	switch (activeType) {
		case 'pet-parents':
			return <SearchBar />;
		case 'pets':
			return <PetsList parentId={parentId as string} />;
		case 'upload':
			return (
				<UploadRecord
					btnTxt={btnTxt}
					parentId={parentId as string}
					petId={petId as string}
					activeClinicId={activeClinicId as string}
					activeRecord={activeRecord as string}
					handleSidebar={handleSidebar}
				/>
			);
		default:
			return <SearchBar />;
	}
};

const RecordsSidebar = () => {
	const {
		showSidebar,
		resetSidebar,
		activeType,
		handleActiveType,
		activeParentId,
		activePetId,
		activeClinicId,
		handleSidebar,
	} = useRecordSidebar();

	const renderTitle = useMemo(() => {
		switch (activeType) {
			case 'pet-parents':
				return 'Search for Pet Parents';
			case 'pets':
				return 'Select Pet';
			case 'upload':
				return 'Upload';
			default:
				return 'Search for Pet Parents';
		}
	}, [activeType]);

	const unMountSidebar = useCallback(() => {
		resetSidebar();
	}, [resetSidebar]);

	const handleBack = () => {
		const indexOf = backItems.indexOf(activeType);
		const prev = backItems[indexOf - 1];
		handleActiveType(prev);
	};

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
						className="w-full rounded-8 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0 h-[calc(100vh-84px)]"
					>
						<section className="flex items-center py-24 w-full gap-16 px-16">
							{activeType !== 'pet-parents' && (
								<ButtonWrapper onClick={handleBack}>
									<BackIcon />
								</ButtonWrapper>
							)}
							<h3 className="text-24 font-semibold">{renderTitle}</h3>
						</section>
						<ActiveContent
							activeType={activeType}
							parentId={activeParentId}
							petId={activePetId}
							activeClinicId={activeClinicId}
							handleSidebar={handleSidebar}
						/>
					</DialogPanel>
				</section>
			</section>
		</Dialog>
	);
};

export default RecordsSidebar;
