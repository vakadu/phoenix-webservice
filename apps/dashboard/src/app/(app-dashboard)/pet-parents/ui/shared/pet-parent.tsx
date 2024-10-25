'use client';

import { memo } from 'react';

import { CameraIcon, EditIcon, PlusIcon, UserIcon } from '@webservices/icons';
import { ButtonWrapper, ImagePlaceholder } from '@webservices/ui';
import Pet from '../../../../../core/ui/pet';
import usePetParentHook from '../../hooks/pet-parent';

function PetParent({
	parentId,
	memberId,
	refetchParents,
}: {
	parentId: string;
	memberId: string;
	refetchParents: () => void;
}) {
	const { onChange, handlePet, handleAddPet, handleEditParent, profileUrl, parent, pets } =
		usePetParentHook(parentId, memberId, refetchParents);

	return (
		<div className="col-span-2 sticky top-[12px] z-10">
			<div className="bg-white w-full px-16 shadow-base rounded-8 py-12 max-h-[calc(100vh-62px)] overflow-y-scroll">
				<div className="flex gap-32 items-start">
					<div className=" rounded-full w-[142px] h-[142px] bg-white relative">
						{profileUrl && profileUrl !== '' ? (
							<ImagePlaceholder
								src={profileUrl as string}
								containerClasses="w-[142px] h-[142px] "
								imageClasses="rounded-full object-cover"
							/>
						) : (
							<UserIcon width={142} height={142} />
						)}
						<label className="cursor-pointer w-[32px] h-[32px] z-3 rounded-full absolute bg-primary-1 flex items-center justify-center right-0 top-[26px] shadow-base3">
							<input type="file" onChange={onChange} className="w-full hidden" />
							<CameraIcon className="text-white" width={18} height={18} />
						</label>
					</div>
					<div className="flex-1 flex justify-center flex-col gap-6">
						<h4 className="text-24 font-medium">{parent?.name}</h4>
						<p className="text-14">{parent?.mobile}</p>
					</div>
					<ButtonWrapper
						onClick={handleEditParent}
						className="flex items-center justify-center gap-6 border border-primary-1 py-6 px-8 rounded-8 shadow-base bg-primary-1"
					>
						<EditIcon color="#FFF" width={14} height={14} />
						<span className="text-14 font-medium text-white">Edit</span>
					</ButtonWrapper>
				</div>
				<div className="grid grid-cols-2 gap-16 mt-32">
					{pets?.map((pet) => {
						return (
							<Pet
								height="h-[160px]"
								handlePet={() => handlePet(pet)}
								key={pet.petId}
								pet={pet}
							/>
						);
					})}
					<ButtonWrapper
						onClick={handleAddPet}
						className="h-[210px] border rounded-8 border-grey-border2 flex flex-col gap-6 items-center justify-center"
					>
						<span className="w-42 h-42 bg-primary-1 flex items-center justify-center rounded-full">
							<PlusIcon color="#FFF" />
						</span>
						<span className="text-14 font-medium">Add Pet</span>
					</ButtonWrapper>
				</div>
			</div>
		</div>
	);
}

export default memo(PetParent);
