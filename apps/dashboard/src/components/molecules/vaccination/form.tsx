import { MenuItem } from '@headlessui/react';

import { dogAndCatVaccines } from '@webservices/constants';
import { DownIcon } from '@webservices/icons';
import { Button, Dropdown } from '@webservices/ui';
import { useState } from 'react';

const Label = ({ selectedVaccine }: { selectedVaccine: string }) => {
	return (
		<div className="flex items-center gap-12 border border-grey-border1 w-full rounded-8 py-16 px-12 justify-between">
			<span className="text-14">
				{selectedVaccine !== '' ? selectedVaccine : 'Choose a Vaccine'}
			</span>
			<DownIcon />
		</div>
	);
};

const VaccinationForm = () => {
	const [selectedVaccine, setVaccine] = useState('');

	return (
		<section className="flex flex-col h-full">
			<div className="flex-1">
				<h2 className="text-24 font-semibold">Add Vaccination Details</h2>
				<h6 className="text-14 mt-8 mb-24">We will remind you whne vaccination is due</h6>
				<div>
					<label className="text-14 leading-24">Choose a vaccine</label>
					<Dropdown
						menuClasses="!max-h-[320px]"
						label={<Label selectedVaccine={selectedVaccine} />}
					>
						{dogAndCatVaccines.map((vaccine) => {
							return (
								<MenuItem key={vaccine.key}>
									<p
										onClick={() => setVaccine(vaccine.key)}
										className={`px-12 py-12 cursor-pointer hover:bg-primary-3 ${
											selectedVaccine === vaccine.key ? 'bg-primary-3' : ''
										}`}
									>
										{vaccine.label}
									</p>
								</MenuItem>
							);
						})}
					</Dropdown>
				</div>
			</div>
			<Button>
				<span>Add Vaccination</span>
			</Button>
		</section>
	);
};

export default VaccinationForm;
