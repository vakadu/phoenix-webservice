import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import dynamic from 'next/dynamic';
import { useCallback, useMemo } from 'react';

import { useRecordSidebar } from '../../../context/record-sidebar-context';
import { BackIcon } from '@webservices/icons';
import { ButtonWrapper, CategoryLoader } from '@webservices/ui';
import { firstCharCapital } from '@webservices/helpers';
import VaccinationForm from '../vaccination/form';

const UploadRecord = dynamic(() => import('./upload-record'), {
	loading: () => <CategoryLoader rows={1} columns={1} coverHeight={220} />,
});

const SearchBar = dynamic(() => import('./search-bar'), {
	loading: () => <CategoryLoader rows={3} columns={1} />,
});

const PetsList = dynamic(() => import('./pets-list'), {
	loading: () => <CategoryLoader rows={3} columns={2} coverHeight={140} />,
});

const backItems = ['pet-parents', 'pets', 'upload'];

const ActiveContent = () => {
	const {
		activeType,
		activeParentId,
		activePetId,
		activeClinicId,
		handleSidebar,
		activeRecord,
		selectedDate,
	} = useRecordSidebar();
	console.log(activeType);

	const btnTxt = `Upload ${firstCharCapital(activeRecord as string)}`;
	switch (activeType) {
		case 'pet-parents':
			return <SearchBar />;
		case 'pets':
			return <PetsList parentId={activeParentId as string} />;
		case 'upload':
			return (
				<UploadRecord
					btnTxt={btnTxt}
					parentId={activeParentId as string}
					petId={activePetId as string}
					activeClinicId={activeClinicId as string}
					activeRecord={activeRecord as string}
					handleSidebar={handleSidebar}
					selectedDate={selectedDate}
				/>
			);
		case 'vaccination':
			return <VaccinationForm />;
		default:
			return <SearchBar />;
	}
};

const RecordsSidebar = () => {
	const { showSidebar, resetSidebar, activeType, handleActiveType, recordType } =
		useRecordSidebar();

	if (recordType === 'vaccination') {
		backItems[backItems.length - 1] = 'vaccination';
	}

	const renderTitle = useMemo(() => {
		switch (activeType) {
			case 'pet-parents':
				return 'Search for Pet Parents';
			case 'pets':
				return 'Select Pet';
			case 'upload':
				return 'Upload';
			case 'vaccination':
				return '';
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
						className="w-full rounded-8 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0 h-[calc(100vh-84px)] px-16"
					>
						<section className="flex items-center py-24 w-full gap-16">
							{activeType !== 'pet-parents' && (
								<ButtonWrapper onClick={handleBack}>
									<BackIcon />
								</ButtonWrapper>
							)}
							<h3 className="text-24 font-semibold">{renderTitle}</h3>
						</section>
						<ActiveContent />
					</DialogPanel>
				</section>
			</section>
		</Dialog>
	);
};

export default RecordsSidebar;
