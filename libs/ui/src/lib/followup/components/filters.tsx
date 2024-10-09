import { follwupFilters } from '@webservices/constants';
import FilterItem, { FilterIcon, FilterLabel } from '../../filter-item/filter-item';

export default function Filters({
	activeFilter,
	setActiveFilter,
}: {
	activeFilter: string;
	setActiveFilter: (filter: string) => void;
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
		<div className="flex gap-12 my-12" onClick={handleClick}>
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
	);
}
