import { memo } from 'react';

import { EnterIcon, RadioFilledIcon, RadioUnfilledIcon } from '@webservices/icons';
import Pets from './pets';

function Parent({
	data,
	handleParent,
	activeParent,
	focusedIndex,
	activeClinic,
}: {
	data: IClinicTypes.IPetParent[];
	handleParent: (e: React.MouseEvent<HTMLDivElement>) => void;
	activeParent: string;
	focusedIndex: number;
	activeClinic: string;
}) {
	return (
		<div onClick={handleParent}>
			{data?.map((item, index) => {
				const {
					_id,
					clinicId,
					parent: { name, petNames, mobile, parentId },
				} = item;
				const active = focusedIndex === index;
				const currentActiveParent = activeParent === _id;
				return (
					<div
						key={_id}
						id={_id}
						data-id={_id}
						data-parentid={parentId}
						data-clinicid={clinicId}
						className={`py-16 border-b px-16 border-b-grey-border1 cursor-pointer hover:bg-primary-3 ${
							active ? 'bg-primary-3' : ''
						}`}
					>
						<div className="flex gap-24 justify-between">
							<div className="flex gap-24 items-center flex-1">
								{currentActiveParent ? (
									<RadioFilledIcon className="w-24 h-24" />
								) : (
									<RadioUnfilledIcon className="w-24 h-24" />
								)}
								<div className="">
									<div className="flex gap-12">
										<span className="text-14 font-medium">{name}</span>
										<span className="text-14 text-grey-text3">({mobile})</span>
									</div>
									{!currentActiveParent && (
										<div className="flex gap-12 items-center mt-12">
											<span className="text-14 font-bold">Pets: </span>
											{petNames.map((pet) => (
												<span className="text-14" key={pet}>
													{pet}
												</span>
											))}
										</div>
									)}
								</div>
							</div>
							{active && !currentActiveParent && (
								<div className="flex items-center gap-6">
									<span className="text-14">Select</span>
									<div className="w-24 h-24 p-4 bg-white rounded-8 flex justify-center items-center border border-grey-divider">
										<EnterIcon />
									</div>
								</div>
							)}
						</div>
						{currentActiveParent && (
							<Pets activeParent={activeParent} activeClinic={activeClinic} />
						)}
					</div>
				);
			})}
		</div>
	);
}

export default memo(Parent);
