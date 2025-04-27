'use client';

import { useMemo } from 'react';
import { format, addMonths, differenceInYears, differenceInMonths, differenceInDays, addYears } from 'date-fns';

import { usePetCertificateVaccination } from '@webservices/api';
import { useRouterQuery } from '@webservices/hooks';
import { Loading } from '@webservices/ui';

export default function CertificatePdf() {
	const { query, params } = useRouterQuery();
	const petId = query?.id as string;
	const heading = params.get('type');

	const { data, isPending } = usePetCertificateVaccination({ type: heading as string, petId });
	const { clinicData, petAndParentDetail, vaccinations }: any = data?.data?.certificateData || {};

	const parentDetails = petAndParentDetail?.parent;
	const petDetails = petAndParentDetail;
	const verifyHealth =
		heading === 'HEALTH_CUM_VACCINATION_CERTIFICATE' ||
		heading === 'TRAVEL_CUM_VACCINATION_CERTIFICATE';

	const renderTitle = useMemo(() => {
		if (heading === 'BOARDING_AND_LODGING') {
			return 'BOARDING AND LODGING CONSENT FORM';
		} else if (heading === 'STERILIZATION_CERTIFICATE') {
			return 'SPAY/NEUTER CERTIFICATE';
		} else {
			const title = heading?.split('_').join(' ');
			return title;
		}
	}, []);


	const calculateAge = (birthDateString: string) => {
		const birthDate = new Date(birthDateString);
		const today = new Date();

		// Validation: Check if the birth date is valid and not in the future
		if (isNaN(birthDate.getTime()) || birthDate > today) {
			return `${0}Y, ${0}M, ${0}D`;  // Return years, months, and days
		}

		// Step 1: Calculate the difference in full years
		const years = differenceInYears(today, birthDate);
		const adjustedDateAfterYears = addYears(birthDate, years);

		// Step 2: Calculate the difference in months
		const months = differenceInMonths(today, adjustedDateAfterYears);
		const adjustedDateAfterMonths = addMonths(adjustedDateAfterYears, months);

		// Step 3: Calculate the difference in days
		const days = differenceInDays(today, adjustedDateAfterMonths);

		// Return in the desired format
		if (years === 0) {
			if (months === 0) {
				return `${days}D`;  // Return only days if under a month
			}
			return `${months}M, ${days}D`; // Return months and days if under a year
		}

		return `${years}Y, ${months}M, ${days}D`;  // Return years, months, and days
	};

	const renderDesc = useMemo(() => {
		switch (heading) {
			case 'ARV_CERTIFICATE':
				return (
					<>
						<div>
							This is to certify that the pet described above, owned by{' '}
							<span className="font-bold text-[12px]">
								Mr./Ms. {parentDetails?.name?.trim()?.toUpperCase()}
							</span>{' '}
							(as detailed above), has been thoroughly examined by the undersigned and is found to be in excellent health as of the date of examination.
						</div>
						<div className="mt-12">
							Additionally, the pet is fully vaccinated against Rabies, as indicated in the vaccination record below.
						</div>
					</>
				);
			case 'HEALTH_CUM_VACCINATION_CERTIFICATE':
				return (
					<>
						<div>
							This is to certify that the pet described above, owned by{' '}
							<span className="font-bold text-[12px]">
								Mr./Ms. {parentDetails?.name?.trim()?.toUpperCase()}
							</span>{' '}
							(as detailed above), has been thoroughly examined by the undersigned and is found to be in excellent health as of the date of examination.
						</div>
						<div className="mt-12">
							Additionally, the pet is fully immunized against the following diseases (please refer to the attached vaccination record for further details).
						</div>
					</>
				);
			case 'TRAVEL_CUM_VACCINATION_CERTIFICATE':
				return (
					<>
						<div>
							This is to certify that the pet described above, owned by{' '}
							<span className="font-bold text-[12px]">
								Mr./Ms. {parentDetails?.name?.trim()?.toUpperCase()}
							</span>{' '}
							(as detailed above), has been thoroughly examined by the undersigned and is found to be in excellent health as of the date of examination. The pet is fit to travel by Air, Road or Rail.
						</div>
						<div className="mt-12">
							Additionally, the pet is fully immunized against all contagious diseases, including Rabies. (Please refer to the attached vaccination record for detailed information on the immunization status).
						</div>
					</>
				);
			case 'EUTHANASIA_CERTIFICATE':
				return (
					<div>
						I, the undersigned, hereby certify that I am the rightful owner of the animal described above (hereinafter referred to as the 'patient'). I grant{' '}
						<span className="font-bold text-12">{clinicData?.name.trim()?.toUpperCase()}</span>{' '}
						full authority to euthanize the said animal in any manner deemed appropriate by the attending veterinarian. By signing this document, I hereby release the veterinarian, as well as their agents, employees, or representatives, from any and all liability associated with the euthanasia of the animal.
						<div className="mt-12">
							Furthermore, I certify that the animal has not bitten any person or other animal within the last fifteen (15) days and, to the best of my knowledge, has not been exposed to rabies.
						</div>
					</div>
				);
			case 'DEATH_CERTIFICATE':
				return (
					<div>
						This is to certify that the pet described above, owned by{' '}
						<span className="font-bold text-12">
							Mr./Ms. {parentDetails?.name.trim()?.toUpperCase()}
						</span>{' '}
						(as detailed above), has been examined by the undersigned and is confirmed to be dead. This statement is made to the best of my knowledge and belief.
					</div>
				);
			case 'MICROCHIP_IMPLANTATION_CERTIFICATE':
				return (
					<div>
						This is to certify that the pet described above, owned by{' '}
						<span className="font-bold text-12">
							Mr./Ms. {parentDetails?.name.trim()?.toUpperCase()}
						</span>{' '}
						(as detailed above), has been implanted with a microchip by the undersigned for the purpose of identification.
					</div>
				);
			case 'IDENTIFICATION_CERTIFICATE':
				return (
					<div>
						This is to certify that the pet described above, owned by{' '}
						<span className="font-bold text-12">
							Mr./Ms. {parentDetails?.name.trim()?.toUpperCase()}
						</span>{' '}
						(as detailed above), has been examined for identification purposes. The information provided is accurate to the best of the undersigned's knowledge.
					</div>
				);
			case 'BOARDING_AND_LODGING':
				return (
					<div>
						I, the undersigned (referred to as the owner), hereby certify that I am the rightful owner of the pet described above (referred to as the patient). I request that the veterinarians at{' '}
						<span className="font-bold text-14">{clinicData?.name?.trim()?.trim()?.toUpperCase()}</span>{' '}
						provide boarding services for my pet during the specified dates. I acknowledge that I will not hold{' '}
						<span className="font-bold text-14">{clinicData?.name?.trim()?.trim()?.toUpperCase()}</span>{' '}
						responsible for any unforeseen incidents, nor will I claim any compensation for such events.

						<div className="my-12">
							<div>Normal pick-up and drop-off time: 9:00 AM to 9:30 PM.</div>
							<div>
								Special pick-up and drop-off time (between 9:30 PM and 11:30 PM) may be considered on a case-by-case basis, subject to an additional charge of Rs 200/- for miscellaneous boarding expenses, in addition to the regular charges.
							</div>
						</div>
						<div className="mt-12">
							Terms and Conditions of Boarding:
							<div className="mt-6 ml-8">
								1. The pet must be fully vaccinated. if not, the vaccination will be administered at the clinic's discretion and at the owner's expense.
							</div>
							<div className="ml-6">
								2. The pet must be free from skin infections and communicable diseases. If any such condition is found, necessary treatment will be administered at the owner's expense.
							</div>
							<div className="ml-6">
								3. In the event that the pet falls ill during boarding, necessary treatment will be provided by the attending veterinarians.
							</div>
							<div className="ml-6">
								4. While maximum precautions will be taken for the safety of your pet, in the case of unforeseen circumstances (e.g., the pet running away or any other unfortunate incident), the veterinarians will not be held responsible, and no compensation will be provided.
							</div>
							<div className="ml-6">
								5. If your pet causes any damage to the property of the facility or injures the staff (e.g., biting or scratching), you will be liable for the cost of the damages and any medical expenses incurred.
							</div>
							<div className="ml-6">
								6. As we accommodate a limited number of pets in boarding, changes to the boarding dates by the owner must be avoided, as it disrupts the entire boarding schedule. Any special circumstances will be considered by the veterinarians on a case-by-case basis, and additional charges may apply.
							</div>
							<div className="mt-12">I acknowledge and agree to the terms and conditions outlined above.</div>
						</div>
					</div>
				);
			case 'SURGICAL_RISK_NOTE':
				return (
					<div>
						I, the undersigned (referred to as the owner), hereby certify that I am the rightful owner of the animal mentioned above (referred to as the patient). I acknowledge and fully understand the potential risks and complications involved with the administration of anesthesia and the surgery of my pet. I give my explicit consent for the necessary surgical procedures to be performed and accept full responsibility for any outcomes. I further agree that I will not hold{' '}
						<span className="font-bold text-14">{clinicData?.name.trim()?.toUpperCase()}</span>{' '}
						liable or seek compensation for any unforeseen circumstances or complications that may arise during or after the procedure.
					</div>
				);
			case 'STERILIZATION_CERTIFICATE':
				return (
					<div>
						This is to certify that the pet described above, owned by{' '}
						<span className="font-bold text-12">
							Mr./Ms. {parentDetails?.name.trim()?.toUpperCase()}
						</span>{' '}
						(as detailed above), has been spayed/castrated at <span className="font-bold text-14">{clinicData?.name.trim()?.toUpperCase()}</span>{' '}
						. The information provided is accurate to the best of the undersigned's knowledge.
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
		<div id="pdf" className="mx-auto bg-white w-[793px] h-[1122px] px-24 pt-50 pb-50 flex flex-col">
			<div className="bg-purple flex justify-between py-10">
				<div className="flex flex-col items-center mx-10 relative">
					<img
						crossOrigin="anonymous"
						alt="logo"
						src={clinicData?.logoUrl}
						className="w-[100px] h-[100px] rounded-full object-fill"
					/>
				</div>
				<div className="flex-1 flex justify-center flex-col mx-14">
					<div className="text-white text-20 font-bold">{clinicData?.name}</div>
					<div className="text-white text-14 font-medium">
						<span>Mobile : </span>
						{clinicData?.businessContact
							? clinicData?.businessContact
							: clinicData?.mobile}
					</div>
					<div className="text-white text-14 font-medium text-justify">
						<span>Address: </span>
						{clinicData?.address?.line1 && `${clinicData?.address?.line1}, `}
						{clinicData?.address?.line2 && `${clinicData?.address?.line2}, `}
						{clinicData?.address?.district && `${clinicData?.address?.district}, `}
						{clinicData?.address?.state && `${clinicData?.address?.state}, `}
						{clinicData?.address?.pincode && clinicData?.address?.pincode}
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
							<div className="text-12 font-medium">Owner Name:</div>
							<div className="pl-8 text-12 font-medium">{parentDetails?.name}</div>
						</div>
						<div className="flex items-center py-2">
							<div className="text-12 font-medium">Owner Mob.:</div>
							<div className="pl-8 text-12 font-medium">{parentDetails?.mobile}</div>
						</div>
						<div className="flex items-center py-2">
							<div className="text-12 font-medium">Address:</div>
							<div className="pl-8 text-12 font-medium">
								{petAndParentDetail?.parentAddress?.address?.line1 && `${petAndParentDetail?.parentAddress?.address?.line1}, `}
								{petAndParentDetail?.parentAddress?.address?.line2 && `${petAndParentDetail?.parentAddress?.address?.line2}, `}
								{petAndParentDetail?.parentAddress?.address?.district && `${petAndParentDetail?.parentAddress?.address?.district}, `}
								{petAndParentDetail?.parentAddress?.address?.state && `${petAndParentDetail?.parentAddress?.address?.state}, `}
								{petAndParentDetail?.parentAddress?.address?.pincode && petAndParentDetail?.parentAddress?.address?.pincode}
							</div>
						</div>
					</div>
					<div className="col-span-1">
						<div className="flex items-center py-2">
							<div className="text-12 font-medium">Pet Name:</div>
							<div className="pl-8 text-12 font-medium">{petDetails?.name}</div>
						</div>
						<div className="flex items-center py-2">
							<div className="text-12 font-medium">Pet Type:</div>
							<div className="pl-8 text-12 font-medium">{petDetails?.type}</div>
						</div>
						<div className="flex items-center py-2">
							<div className="text-12 font-medium">Pet Sex:</div>
							<div className="pl-8 text-12 font-medium">{petDetails?.gender}</div>
						</div>
						<div className="flex items-center py-2">
							<div className="text-12 font-medium">Pet Color:</div>
							<div className="pl-8 text-12 font-medium"></div>
						</div>
						<div className="flex items-center py-2">
							<div className="text-12 font-medium">Pet Breed:</div>
							<div className="pl-8 text-12 font-medium">{petDetails?.breed}</div>
						</div>
					</div>
					<div className="col-span-1">
						<div className="flex items-center py-2">
							<div className="text-12 font-medium">Pet DOB:</div>
							<div className="pl-8 text-12 font-medium">{format(petDetails?.dob as string, 'do MMM, yyyy')}</div>
						</div>
						<div className="flex items-center py-2">
							<div className="text-12 font-medium">Pet Age:</div>
							<div className="pl-8 text-12 font-medium">{calculateAge(petDetails?.dob as string)}</div>
						</div>
						<div className="flex items-center py-2">
							<div className="text-12 font-medium">Patient code:</div>
							<div className="pl-8 text-12 font-medium">{petDetails?.oldCode ? petDetails?.oldCode : petDetails.code}</div>
						</div>
						<div className="flex items-center py-2">
							<div className="text-12 font-medium">Microchip No.:</div>
							<div className="pl-8 text-12 font-medium">{petDetails?.microChipNo ? petDetails?.microChipNo : ''}</div>
						</div>
						<div className="flex items-center py-2">
							<div className="text-12 font-medium">Reg No.:</div>
							<div className="pl-8 text-12 font-medium"></div>
						</div>
					</div>
				</div>


			</div>
			<div
				id="page-break"
				className="text-13 px-24 mt-16 font-medium text-justify"
				style={{ wordSpacing: '-0.1em', lineHeight: '1.4' }}
			>
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
							{vaccinations?.map((vaccination: any) => {
								if (vaccination.vaccineName === 'Anti-Rabies') {
									const { vaccineName, nextDueDate, lastCompleteDate } =
										vaccination;
									const dueDate = nextDueDate
										? format(nextDueDate, 'do MMM, yyyy')
										: '';
									const completeDate = lastCompleteDate
										? format(lastCompleteDate, 'do MMM, yyyy')
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
							{vaccinations?.map((vaccination: any) => {
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
									? format(nextDueDate, 'do MMM, yyyy')
									: '';
								const completeDate = lastCompleteDate
									? format(lastCompleteDate, 'do MMM, yyyy')
									: '';

								return (
									<tr className='border-b border-dashed border-purple' key={vaccineName}>
										<td className="py-4 px-6 text-12 font-medium">{vaccineName}</td>
										<td className="py-4 px-6 text-12 font-medium"></td>
										<td className="py-4 px-6 text-12 font-medium"></td>
										<td className="py-4 px-6 text-12 font-medium">{completeDate}</td>
										<td className="py-4 px-6 text-12 font-medium">{dueDate}</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			)}
			{heading === 'BOARDING_AND_LODGING' || heading === 'SURGICAL_RISK_NOTE' ? (
				<div className="px-24 pt-50">
					<div className="grid grid-cols-2">
						<div className="flex flex-col gap-6">
							<span className="h-1 w-[292px] bg-black-1 block"></span>
							<span className="font-medium text-14">Signature of Owner/Agent</span>
						</div>
						<div className="flex items-end flex-col gap-6">
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
						<div className="flex gap-6">
							<div className="flex items-end my-10">
								<span className="font-medium text-14">Date / Time IN:</span>
								<span className="h-1 w-[172px] bg-black-1 block"></span>
							</div>
							<div className="flex items-end my-10">
								<span className="font-medium text-14">Date / Time OUT:</span>
								<span className="h-1 w-[172px] bg-black-1 block"></span>
							</div>
						</div>
					)}
				</div>
			) : (
				<div className="grid grid-cols-2 px-24 pt-40">
					<div className="flex items-end">
						<span className="font-medium text-14">Date:</span>
						<span className="h-1 w-[172px] bg-black-1 block"></span>
					</div>
					<div className="flex items-end flex-col gap-6">
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
			<div className="mt-auto">
				<div className=" bg-purple text-white font-bold text-14 py-6 text-center">
					Please call for an appointment!
				</div>
				<div className="flex justify-between items-center">
					<p className="text-14 font-medium">
						<span>Mobile : </span>
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
