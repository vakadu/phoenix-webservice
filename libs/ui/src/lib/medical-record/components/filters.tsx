import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';

import { medicalRecordsFilters } from '@webservices/constants';
import FilterItem, { FilterIcon, FilterLabel } from '../../filter-item/filter-item';
import ButtonWrapper from '../../button-wrapper/button-wrapper';
import { UploadIcon } from '@webservices/icons';
import Tooltip from '../../tooltip/tooltip';
import { firstCharCapital } from '@webservices/helpers';
import Button from '../../button/button';
import { openModal } from '@webservices/slices';
import { ModalTypes, USER_EVENTS } from '@webservices/primitives';
import { logEvent } from '@webservices/services';

export default function Filters({
	activeFilter,
	setActiveFilter,
	petId,
	setShowSidebar,
	refetchRecords,
}: {
	activeFilter: string;
	setActiveFilter: (filter: string) => void;
	petId: string | undefined;
	setShowSidebar: (sidebar: boolean) => void;
	refetchRecords: () => void;
}) {
	const dispatch = useDispatch();

	const openParents = () => {
		logEvent({
			name: USER_EVENTS.UPLOAD_RECORD_SIDEBAR,
			events: { filter: activeFilter, type: 'medical-records' },
		});
		dispatch(
			openModal({
				isOpen: true,
				view: ModalTypes.SEARCH_PARENTS,
				center: false,
				maxWidth: 'max-w-3xl',
				data: {
					type: 'medical-records',
					activeFilter,
					refetch: refetchRecords,
				},
			})
		);
	};

	const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
		event.stopPropagation();
		const buttonElement = (event.target as HTMLElement).closest('button');
		const filter = buttonElement?.getAttribute('data-id') as string;
		logEvent({ name: USER_EVENTS.FILTER_ITEM, events: { filter, type: 'medical-records' } });
		if (filter) {
			setActiveFilter(filter);
		}
	};

	return (
		<div className="flex justify-between items-center gap-12 my-12" onClick={handleClick}>
			<div className="flex gap-12">
				{medicalRecordsFilters?.map((record) => {
					const active = activeFilter === record.value;
					return (
						<FilterItem active={active} value={record.value} key={record.id}>
							<FilterIcon active={active}>{record.icon()}</FilterIcon>
							<FilterLabel active={active}>{record.label}</FilterLabel>
						</FilterItem>
					);
				})}
			</div>
			{petId ? (
				<Tooltip
					content={`Upload ${firstCharCapital(activeFilter)}`}
					placement="top"
					arrow
					animation="shift-away"
				>
					<ButtonWrapper
						onClick={() => setShowSidebar(true)}
						className="w-42 h-42 bg-primary-1 rounded-full p-6 shadow-base hover:bg-white hover:border hover:border-primary-1 group"
					>
						<motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
							<UploadIcon
								className="text-white group-hover:text-primary-1"
								width="100%"
								height="100%"
							/>
						</motion.div>
					</ButtonWrapper>
				</Tooltip>
			) : (
				<Button onClick={openParents} className="min-w-[180px] max-w-[240px] !px-12">
					<span className="text-14 font-bold">{`Upload ${firstCharCapital(
						activeFilter
					)}`}</span>
				</Button>
			)}
		</div>
	);
}
