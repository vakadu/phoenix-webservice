'use client';

import { useMemo } from 'react';

import { usePetCertificateVaccination } from '@webservices/api';
import { useRouterQuery } from '@webservices/hooks';
import { ImagePlaceholder, Loading } from '@webservices/ui';

export default function CertificatePdf() {
	const { query, params } = useRouterQuery();
	const petId = query?.id as string;
	const heading = params.get('type');
	const { data, isPending } = usePetCertificateVaccination({ type: 'VACCINATION', petId });
	const { clinicData, petAndParentDetail, vaccinations } = data?.data?.certificateData || {};

	const parentDetails = petAndParentDetail?.petAndParentDetail?.parent;
	const petDetails = petAndParentDetail?.petAndParentDetail;

	const renderTitle = useMemo(() => {
		switch (heading) {
			case 'ARV_CERTIFICATE':
				return 'ARV VACCINATION CERTIFICATE';
			default:
				return null;
		}
	}, []);

	if (isPending) {
		return (
			<div className="h-screen flex items-center justify-center">
				<Loading />
			</div>
		);
	}

	return (
		<div id="pdf" className="mx-auto bg-white p-16 max-w-screen-xl">
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
			<div>
				<div className="py-12 border-b-[3px] border-purple text-18 font-bold">
					Owner and Pet Details
				</div>
				<div className="grid grid-cols-3 gap-32 mt-16 pb-32 mb-32 border-b border-dashed border-purple ">
					<div className="col-span-1">
						<div className="flex justify-between items-center py-8">
							<div className="text-16 font-bold">Owner:</div>
							<div>{parentDetails?.name}</div>
						</div>
						<div className="flex justify-between items-center py-8">
							<div className="text-16 font-bold">Address:</div>
							{/* <div>{petAndParentDetail?.petAndParentDetail?.parentAddress}</div> */}
						</div>
						<div className="flex justify-between items-center py-8">
							<div className="text-16 font-bold">Breed:</div>
							<div>{petDetails?.breed}</div>
						</div>
						<div className="flex justify-between items-center py-8">
							<div className="text-16 font-bold">Microchip No.:</div>
						</div>
					</div>
					<div className="col-span-1">
						<div className="flex justify-between items-center py-8">
							<div className="text-16 font-bold">Contact No.(LL):</div>
							<div>{parentDetails?.mobile}</div>
						</div>
						<div className="flex justify-between items-center py-8">
							<div className="text-16 font-bold">Pet Name:</div>
							<div>{petDetails?.name}</div>
						</div>
						<div className="flex justify-between items-center py-8">
							<div className="text-16 font-bold">Pet Sex:</div>
							<div>{petDetails?.gender}</div>
						</div>
						<div className="flex justify-between items-center py-8">
							<div className="text-16 font-bold">Pet Color:</div>
							<div></div>
						</div>
					</div>
					<div className="col-span-1">
						<div className="flex justify-between items-center py-8">
							<div className="text-16 font-bold">Owner Ph.:</div>
							<div>{parentDetails?.mobile}</div>
						</div>
						<div className="flex justify-between items-center py-8">
							<div className="text-16 font-bold">Pet DOB:</div>
							<div>{petDetails?.dob}</div>
						</div>
						<div className="flex justify-between items-center py-8">
							<div className="text-16 font-bold">Pet Age:</div>
							<div></div>
						</div>
						<div className="flex justify-between items-center py-8">
							<div className="text-16 font-bold">Patient code:</div>
							<div></div>
						</div>
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
						{clinicData?.email}
					</p>
				</div>
			</footer>
		</div>
	);
}
