'use client';

import { useMemo } from 'react';
import { format } from 'date-fns';

import { usePetCertificateVaccination } from '@webservices/api';
import { useRouterQuery } from '@webservices/hooks';
import { ImagePlaceholder, Loading } from '@webservices/ui';

export default function CertificatePdf() {
	const { query, params } = useRouterQuery();
	const petId = query?.id as string;
	const heading = params.get('type');

	const { data, isPending } = usePetCertificateVaccination({ type: heading as string, petId });
	const { clinicData, petAndParentDetail, vaccinations } = data?.data?.certificateData || {};

	const parentDetails = petAndParentDetail?.parent;
	const petDetails = petAndParentDetail;
	const verifyHealth =
		heading === 'HEALTH_CUM_VACCINATION_CERTIFICATE' ||
		heading === 'TRAVEL_CUM_VACCINATION_CERTIFICATE';

	const renderTitle = useMemo(() => {
		if (heading === 'BOARDING_AND_LODGING') {
			return 'BOARDING AND LODGING CONSENT FORM';
		} else {
			const title = heading?.split('_').join(' ');
			return title;
		}
	}, []);

	const renderDesc = useMemo(() => {
		switch (heading) {
			case 'ARV_CERTIFICATE':
				return (
					<div>
						This is to certify that the above pet, owned by{' '}
						<span className="font-bold text-12">
							Mr./Ms. {parentDetails?.name?.trim()?.toUpperCase()}
						</span>
						(description given above), has been inspected and deemed fit for boarding
						under the terms and conditions agreed upon by the owner and the facility.
					</div>
				);
			case 'HEALTH_CUM_VACCINATION_CERTIFICATE':
				return (
					<div>
						This is to certify that the above pet owned by{' '}
						<span className="font-bold text-12">
							Mr./Ms. {parentDetails?.name.trim()?.toUpperCase()}
						</span>
						(description given above) has been examined by the undersigned and is found
						to be in perfect health as on date.The pet is duly immunized against
						following diseases. (PI refer to the vaccination record attached).
					</div>
				);
			case 'TRAVEL_CUM_VACCINATION_CERTIFICATE':
				return (
					<div>
						This is to certify that the above pet owned by{' '}
						<span className="font-bold text-12">
							Mr./Ms. {parentDetails?.name.trim()?.toUpperCase()}
						</span>
						(description given above) has been examined by the undersigned and is found
						to be in perfect health as on date and is fit to travel by Air/Road/Rail.The
						pet is duly immunized against all diseases including Rabies. (Please refer
						to the vaccination record attached for exact status).
					</div>
				);
			case 'EUTHANASIA_CERTIFICATE':
				return (
					<div>
						I, the undersigned (mentioned as owner) do hereby certify that I am the
						rightful owner of the animal mentioned above(mentioned as patient). I do
						hereby give{' '}
						<span className="font-bold text-12">{clinicData?.name.trim()?.toUpperCase()}</span>{' '}
						full and complete authority to euthanize the said animal in whatever manner
						he deems fit. I do hereby, and by these presents forever release the said
						Vets, his/her agents, servants, or representatives from any and all
						liability for so euthanizing the said animal.
						<div className="mt-6">
							I do also certify that the said animal has not bitten any person or
							animal during the last fifteen (15) days, and to the best of my
							knowledge has not been exposed to rabies.
						</div>
					</div>
				);
			case 'DEATH_CERTIFICATE':
				return (
					<div>
						This is to certify that the above pet owned by{' '}
						<span className="font-bold text-12">
							Mr./Ms. {parentDetails?.name.trim()?.toUpperCase()}
						</span>
						(description given above) has been examined by the undersigned, to be dead.
						This information is true to the best of my knowledge.
					</div>
				);
			case 'MICROCHIP_IMPLANTATION_CERTIFICATE':
				return (
					<div>
						This is to certify that the above pet owned by{' '}
						<span className="font-bold text-12">
							Mr./Ms. {parentDetails?.name.trim()?.toUpperCase()}
						</span>
						(description given above) has been implanted with microchip by the
						undersigned for the purpose of identification.
					</div>
				);
			case 'IDENTIFICATION_CERTIFICATE':
				return (
					<div>
						This is to certify that the above pet owned by{' '}
						<span className="font-bold text-12">
							Mr./Ms. {parentDetails?.name.trim()?.toUpperCase()}
						</span>
						(description given above) has been examined for the purpose of
						identification. The information provided is true to the best of the
						knowledge of the undersigned.
					</div>
				);
			case 'BOARDING_AND_LODGING':
				return (
					<div>
						I,the undersigned (mentioned as owner) do hereby certify that I am the
						rightful owner of the animal mentioned above(mentioned as patient). I
						request the vets to keep my pet in boarding for above mentioned dates. I
						will not hold{' '}
						<span className="font-bold text-14">{clinicData?.name?.trim()?.trim()?.toUpperCase()}</span>{' '}
						responsible or caim any compensation for any untoward happening.
						<div className="my-12">
							<div>Normal pick up and drop time - 9.30 a.m to 9.30 p.m</div>
							<div>
								Special pick up and drop time - 9.30 a.m to 11.30 p.m can be
								considered on case to case basis and would invite extra Rs 200/- for
								misc. boarding charges in addition to regular charges.{' '}
							</div>
						</div>
						<div>
							Terms and conditions of boarding:
							<div className="mt-6 ml-8">
								1. The pet should be completely vaccinated else the vaccination
								would be done at clinic at owner's expense.
							</div>
							<div className="ml-8">
								2. The pet should be free from skin infections/communicable diseases
								Otherwise necessary treatment would be done at owner's expense.
							</div>
							<div className="ml-8">
								3. If during the course of boarding the pet fells ill, the necessary
								treatment would be done as deemed fit by the vets.
							</div>
							<div className="ml-8">
								4. We undertake maximum precautions for the safety of your pet but
								even if due to unforeseen circumstances the pet runs away from
								boarding or any other unfortunate mishappening to the pet you will
								not hold vet responsible for the same neither we are liable for any
								compensation whatsoever.
							</div>
							<div className="ml-8">
								5. During the boarding if your pet damages the property of the
								facility or bites/scratches the staff, you have to pay for the
								damages and medical expenses incurred.
							</div>
							<div className="ml-8">
								6. As we keep limited number of pets in boarding, the dates of
								boarding should not be arbitrarily changed by the owner as it
								affects the whole schedule at boarding. Any special circumstances
								can be considered by the vets as on case to case basis for which
								extra fees would be chargeable. I Agree to the above terms and
								conditions.
							</div>
							<div className="mt-12">I Agree to the above terms and conditions.</div>
						</div>
					</div>
				);
			case 'SURGICAL_RISK_NOTE':
				return (
					<div>
						I, the undersigned (mentioned as owner) do hereby certify that I am the
						rightful owner of the animal mentioned above(mentioned as patient). I am
						fully aware and take full responsibility for the complication and risk
						involved in the anesthesia and surgery of this animal. I give my full
						consent for the necessary surgery to be performed and will not hold{' '}
						<span className="font-bold text-14">{clinicData?.name.trim()?.toUpperCase()}</span>{' '}
						responsible or claim any compensation for any untoward happening.
					</div>
				);
			default:
				return null;
		}
	}, [parentDetails, heading, clinicData]);

	if (isPending) {
		return (
			<div className="h-screen flex items-center justify-center">
				<Loading />
			</div>
		);
	}

	return (
		<div id="pdf" className="mx-auto bg-white max-w-[1240px] p-24">
			<div className="bg-purple flex justify-between py-6">
				{/* <div className="justify-center flex-col mx-6">
					<ImagePlaceholder
						src={clinicData?.logoUrl as string}
						containerClasses="w-[100px] h-[100px] "
						imageClasses="rounded-full object-center"
					/>
				</div> */}
				<div className="flex flex-col items-center mx-6 relative">
					<img
						crossOrigin="anonymous" // Correct casing for React
						alt="logo"
						src={clinicData?.logoUrl} // Dynamic logo URL function
						className="w-[100px] h-[100px] rounded-full object-cover"
					/>
				</div>

				<div className="flex-1 flex justify-center flex-col mx-18">
					<h1 className="text-white text-22 font-bold">{clinicData?.name}</h1>
					<div className="flex">
						<p className="text-white text-14 text-left">
							<span className="font-medium">Mob. : </span>
							{clinicData?.businessContact
								? clinicData?.businessContact
								: clinicData?.mobile}
							<span className="pr-8">,</span>
						</p>
						<p className="text-white text-14">
							<span className="font-medium">Address: </span>
							{clinicData?.address?.line1 && `${clinicData?.address?.line1}, `}
							{clinicData?.address?.line2 && `${clinicData?.address?.line2}, `}
							{clinicData?.address?.district && `${clinicData?.address?.district}, `}
							{clinicData?.address?.state && `${clinicData?.address?.state}, `}
							{clinicData?.address?.pincode && clinicData?.address?.pincode}
						</p>
					</div>
				</div>
			</div>
			<h2 className="font-bold text-center my-6 text-18">{renderTitle}</h2>
			<div className="px-24">
				<div className="py-2 border-b-[3px] border-purple text-14 font-bold grid grid-cols-3 gap-32">
					<div className="col-span-1">Owner Details</div>
					<div className="col-span-2">Pet Details</div>
				</div>
				<div className="py-2 grid grid-cols-3 gap-32 border-b border-dashed border-purple">
					<div className="col-span-1">
						<div className="flex items-center py-2">
							<div className="text-14 font-medium">Owner Name:</div>
							<div className="pl-8 text-14">{parentDetails?.name}</div>
						</div>
						<div className="flex items-center py-2">
							<div className="text-14 font-medium">Owner Mob.:</div>
							<div className="pl-8 text-14">{parentDetails?.mobile}</div>
						</div>
						<div className="flex items-center py-2">
							<div className="text-14 font-medium">Address:</div>
							{/* <div className="pl-8">{petAndParentDetail?.petAndParentDetail?.parentAddress}</div> */}
						</div>
					</div>
					<div className="col-span-1">
						<div className="flex items-center py-2">
							<div className="text-14 font-medium">Pet Name:</div>
							<div className="pl-8 text-14">{petDetails?.name}</div>
						</div>
						<div className="flex items-center py-2">
							<div className="text-14 font-medium">Pet Sex:</div>
							<div className="pl-8 text-14">{petDetails?.gender}</div>
						</div>
						<div className="flex items-center py-2">
							<div className="text-14 font-medium">Pet Color:</div>
							<div className="pl-8 text-14"></div>
						</div>
						<div className="flex items-center py-2">
							<div className="text-14 font-medium">Breed:</div>
							<div className="pl-8 text-14">{petDetails?.breed}</div>
						</div>
					</div>
					<div className="col-span-1">
						<div className="flex items-center py-2">
							<div className="text-14 font-medium">Microchip No.:</div>
							<div className="pl-8 text-14"></div>
						</div>
						<div className="flex items-center py-2">
							<div className="text-14 font-medium">Pet DOB:</div>
							<div className="pl-8 text-14">{petDetails?.dob}</div>
						</div>
						<div className="flex items-center py-2">
							<div className="text-14 font-medium">Pet Age:</div>
							<div className="pl-8 text-14"></div>
						</div>
						<div className="flex items-center py-2">
							<div className="text-14 font-medium">Patient code:</div>
							<div className="pl-8 text-14"></div>
						</div>
					</div>
				</div>


			</div>
			<div id="page-break" className="text-14 px-24 mt-16 font-medium">
				{renderDesc}
			</div>
			{heading === 'ARV_CERTIFICATE' && (
				<div className="p-24 mb-42">
					<table className="w-full text-sm font-light">
						<thead className="bg-gray-200">
							<tr>
								<th className="py-3 px-6 text-left text-12 font-bold">Vaccine</th>
								<th className="py-3 px-6 text-left text-12 font-bold">Brand/Mfr.</th>
								<th className="py-3 px-6 text-left text-12 font-bold">Batch/Lot No.</th>
								<th className="py-3 px-6 text-left text-12 font-bold">Given On</th>
								<th className="py-3 px-6 text-left text-12 font-bold">Due Date</th>
							</tr>
						</thead>
						<tbody>
							{vaccinations?.map((vaccination) => {
								if (vaccination.vaccineName === 'Anti-Rabies') {
									const { vaccineName, nextDueDate, lastCompleteDate } =
										vaccination;
									const dueDate = nextDueDate
										? format(nextDueDate, 'yyyy-MM-dd')
										: '';
									const completeDate = lastCompleteDate
										? format(lastCompleteDate, 'yyyy-MM-dd')
										: '';

									return (

										<tr className='border-b border-dashed border-purple' key={vaccineName}>
											<td className="py-4 px-6 text-12 font-medium">{vaccineName}</td>
											<td className="py-4 px-6 text-12 font-medium"></td>
											<td className="py-4 px-6 text-12 font-medium"></td>
											<td className="py-4 px-6 text-12 font-medium">
												{completeDate}
											</td>
											<td className="py-4 px-6 text-12 font-medium">{dueDate}</td>
										</tr>
									);
								}
							})}
						</tbody>
					</table>
				</div>
			)}
			{verifyHealth && (
				<div className="p-24 mb-42">
					<table className="w-full text-sm font-light">
						<thead className="bg-gray-200">
							<tr>
								<th className="py-3 px-6 text-left text-12 font-bold">Vaccine</th>
								<th className="py-3 px-6 text-left text-12 font-bold">Brand/Mfr.</th>
								<th className="py-3 px-6 text-left text-12 font-bold">Batch/Lot No.</th>
								<th className="py-3 px-6 text-left text-12 font-bold">Given On</th>
								<th className="py-3 px-6 text-left text-12 font-bold">Due Date</th>
							</tr>
						</thead>
						<tbody>
							{vaccinations?.map((vaccination) => {
								const { vaccineName, nextDueDate, lastCompleteDate } = vaccination;
								if (petDetails?.type === 'CAT') {
									if (vaccineName === 'DHPPi+L' || vaccineName === 'Corona') {
										return null;
									}
								}
								if (petDetails?.type === 'DOG') {
									if (vaccineName === 'CRP') {
										return null;
									}
								}

								const dueDate = nextDueDate
									? format(nextDueDate, 'yyyy-MM-dd')
									: '';
								const completeDate = lastCompleteDate
									? format(lastCompleteDate, 'yyyy-MM-dd')
									: '';

								return (
									<tr className='border-b border-dashed border-purple' key={vaccineName}>
										<td className="py-4 px-6 font-normal">{vaccineName}</td>
										<td className="py-4 px-6 font-normal"></td>
										<td className="py-4 px-6 font-normal"></td>
										<td className="py-4 px-6 font-normal">{completeDate}</td>
										<td className="py-4 px-6 font-normal">{dueDate}</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			)}
			{heading === 'BOARDING_AND_LODGING' || heading === 'SURGICAL_RISK_NOTE' ? (
				<div className="p-24">
					<div className="grid grid-cols-2">
						<div className="flex flex-col gap-16">
							<span className="h-1 w-[292px] bg-black-1 block"></span>
							<span className="font-medium text-14">Signature of Owner/Agent</span>
						</div>
						<div className="flex items-end flex-col gap-16">
							<span className="h-1 w-[292px] bg-black-1 block"></span>
							<span className="font-medium text-14">
								Name and Signature of explaining Doctor
							</span>
						</div>
					</div>
					{heading === 'SURGICAL_RISK_NOTE' && (
						<div className="flex items-end mt-24">
							<span className="font-medium text-14">Date:</span>
							<span className="h-1 w-[172px] bg-black-1 block"></span>
						</div>
					)}
					{heading === 'BOARDING_AND_LODGING' && (
						<div className="flex gap-16">
							<div className="flex items-end mt-24">
								<span className="font-medium text-14">Date / Time IN:</span>
								<span className="h-1 w-[172px] bg-black-1 block"></span>
							</div>
							<div className="flex items-end mt-24">
								<span className="font-medium text-14">Date / Time OUT:</span>
								<span className="h-1 w-[172px] bg-black-1 block"></span>
							</div>
						</div>
					)}
				</div>
			) : (
				<div className="grid grid-cols-2 p-24">
					<div className="flex items-end">
						<span className="font-medium text-14">Date:</span>
						<span className="h-1 w-[172px] bg-black-1 block"></span>
					</div>
					<div className="flex items-end flex-col gap-16">
						<span className="h-1 w-[292px] bg-black-1 block"></span>
						<span className="font-medium text-14">
							{heading === 'EUTHANASIA_CERTIFICATE' ||
								heading === 'IDENTIFICATION_CERTIFICATE'
								? 'Signature of Owner/Agent'
								: 'Signature of Doctor'}
						</span>
					</div>
				</div>
			)}
			<div className="mb-auto">
				<div className=" bg-purple text-white font-bold text-14 py-6 text-center">
					Please call for an Appointment!
				</div>
				<div className="py-2 flex justify-between items-center">
					<p className="text-14 font-medium">
						<span>Mob. : </span>
						{clinicData?.businessContact
							? clinicData?.businessContact
							: clinicData?.mobile}
					</p>
					<p className="text-14 font-medium">
						<span>Email: </span>
						{clinicData?.email}
					</p>
				</div>
			</div>
		</div>
	);
}
