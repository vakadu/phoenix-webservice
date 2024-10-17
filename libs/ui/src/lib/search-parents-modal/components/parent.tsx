import { memo } from 'react';

import { RadioFilledIcon, RadioUnfilledIcon } from '@webservices/icons';

function Parent({
	data,
	handleParent,
	activeParent,
}: {
	data: IClinicTypes.IPetParent[];
	handleParent: (item: IClinicTypes.IPetParent) => void;
	activeParent: string;
}) {
	return (
		<div>
			{data?.map((item) => {
				const {
					_id,
					parent: { name, petNames, mobile },
				} = item;
				return (
					<div
						key={_id}
						className="py-16 border-b px-16 border-b-grey-border1 flex cursor-pointer hover:bg-primary-3 gap-24"
						onClick={() => handleParent(item)}
					>
						{activeParent === _id ? (
							<RadioFilledIcon className="w-24 h-24" />
						) : (
							<RadioUnfilledIcon className="w-24 h-24" />
						)}
						<div className="">
							<div className="flex gap-12">
								<span className="text-14 font-medium">{name}</span>
								<span className="text-14 text-grey-text3">({mobile})</span>
							</div>
							<div className="flex gap-12 items-center mt-12">
								<span className="text-14 font-bold">Pets: </span>
								{petNames.map((pet) => (
									<span className="text-14" key={pet}>
										{pet}
									</span>
								))}
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default memo(Parent);
