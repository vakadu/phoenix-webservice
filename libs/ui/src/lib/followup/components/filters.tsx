import { motion } from 'framer-motion';

import { follwupFilters } from '@webservices/constants';
import FilterItem, { FilterIcon, FilterLabel } from '../../filter-item/filter-item';
import Tooltip from '../../tooltip/tooltip';
import ButtonWrapper from '../../button-wrapper/button-wrapper';
import { UploadIcon } from '@webservices/icons';

export default function Filters({
	activeFilter,
	setActiveFilter,
	petId,
	setShowSidebar,
}: {
	activeFilter: string;
	setActiveFilter: (filter: string) => void;
	petId: string | undefined;
	setShowSidebar: (sidebar: boolean) => void;
}) {
	const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
		event.stopPropagation();
		const buttonElement = (event.target as HTMLElement).closest('button');
		const filter = buttonElement?.getAttribute('data-id') as string;
		if (filter) {
			setActiveFilter(filter);
		}
	};

	return (
		<div className="flex justify-between items-center gap-12 my-12" onClick={handleClick}>
			<div className="flex gap-12">
				{follwupFilters?.map((record) => {
					const active = activeFilter === record.value;
					return (
						<FilterItem active={active} value={record.value} key={record.id}>
							<FilterIcon active={active}>{record.icon()}</FilterIcon>
							<FilterLabel active={active}>{record.label}</FilterLabel>
						</FilterItem>
					);
				})}
			</div>
			{petId && (
				<Tooltip content="Upload Followup" placement="top" arrow animation="shift-away">
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
			)}
		</div>
	);
}
