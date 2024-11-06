'use client';

import { usePetCertificateVaccination } from '@webservices/api';
import { useRouterQuery } from '@webservices/hooks';
import { ImagePlaceholder } from '@webservices/ui';
import { useMemo } from 'react';

export default function CertificatePdf() {
	const { query, params } = useRouterQuery();
	const petId = query?.id as string;
	const heading = params.get('type');
	const { data } = usePetCertificateVaccination({ type: 'VACCINATION', petId });
	const { clinicData, petAndParentDetail, vaccinations } = data?.data?.certificateData || {};

	const renderTitle = useMemo(() => {
		switch (heading) {
			case 'ARV_CERTIFICATE':
				return 'ARV VACCINATION CERTIFICATE';
			default:
				return null;
		}
	}, []);

	return (
		<div className="mx-auto bg-white p-16">
			<div className="bg-purple flex justify-between p-32 gap-32">
				<ImagePlaceholder
					src={clinicData?.logoUrl as string}
					containerClasses="w-[114px] h-[114px] "
					imageClasses="rounded-full object-cover"
				/>
				<div className="flex-1 items-center flex justify-center flex-col">
					<h1 className="text-center text-white text-32 font-bold">{clinicData?.name}</h1>
					<div className="text-center flex items-center justify-center">
						<p className="text-white text-16">
							<span className="font-medium">Tel. Ph: </span>
							{clinicData?.businessContact
								? clinicData?.businessContact
								: clinicData?.mobile}
						</p>
						<span className="px-6 text-white">|</span>
						<p className="text-white text-16">
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
			<h2 className="font-bold text-center my-24 text-32">{renderTitle}</h2>
			<div className="mt-8">
				<h3 className="text-xl font-bold">Owner and Pet Details</h3>
				<div className="grid grid-cols-2 gap-4 mt-4">
					<div>
						<label
							htmlFor="owner"
							className="block text-gray-700 text-sm font-bold mb-2"
						>
							Owner:
						</label>
						<input
							type="text"
							id="owner"
							value="Josh"
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-7 00 leading-tight focus:outline-none focus:shadow-outline"
							readOnly
						/>
					</div>
					<div>
						<label htmlFor="pet" className="block text-gray-700 text-sm font-bold mb-2">
							Pet:
						</label>
						<input
							type="text"
							id="pet"
							value="Buddy"
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							readOnly
						/>
					</div>
				</div>
			</div>

			<div className="mt-8">
				<h3 className="text-xl font-bold">Vaccination Details</h3>
				<div className="grid grid-cols-2 gap-4 mt-4">
					<div>
						<label
							htmlFor="vaccine"
							className="block text-gray-700 text-sm font-bold mb-2"
						>
							Vaccine:
						</label>
						<input
							type="text"
							id="vaccine"
							value="Rabies"
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							readOnly
						/>
					</div>
					<div>
						<label
							htmlFor="date"
							className="block text-gray-700 text-sm font-bold mb-2"
						>
							Date:
						</label>
						<input
							type="text"
							id="date"
							value="2023-10-01"
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							readOnly
						/>
					</div>
				</div>
			</div>

			<footer>
				<div className="text-center py-12 bg-purple text-white font-bold text-18">
					Please call for an Appointment
				</div>
				<div className="py-12 flex justify-between items-center">
					<p className="text-16">
						<span className="font-medium">Tel. Ph: </span>
						{clinicData?.businessContact
							? clinicData?.businessContact
							: clinicData?.mobile}
					</p>
					<p>
						<span className="font-medium">Email: </span>
					</p>
				</div>
			</footer>

			{/* <div className="mt-8 text-center">
				<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
					Print Certificate
				</button>
			</div> */}
		</div>
	);
}
