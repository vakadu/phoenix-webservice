import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { useGetParentById, useGetPets, useGetUserProfileUrl } from '@webservices/api';
import { createFormDataForImage } from '@webservices/helpers';
import { CameraIcon, EditIcon, PlusIcon, UserIcon } from '@webservices/icons';
import { ApiEndpoints, ModalTypes } from '@webservices/primitives';
import { openModal } from '@webservices/slices';
import { ButtonWrapper, ImagePlaceholder } from '@webservices/ui';
import Pet from '../../atoms/pet';
import { useRouterQuery } from '@webservices/hooks';
import { HttpService } from '@webservices/services';

export default function PetParentDetails({
	memberId,
	parentId,
	refetch,
}: {
	memberId: string;
	parentId: string;
	refetch: () => void;
}) {
	const { data, refetch: refetchUrl } = useGetUserProfileUrl(parentId as string);
	const { data: parentData, refetch: refecthUser } = useGetParentById(parentId);
	const { profileUrl } = data?.data || {};
	const { parent } = parentData?.data?.parents?.[0] || {};
	const dispatch = useDispatch();
	const { data: petsData } = useGetPets(parentId as string);
	const { pets } = petsData?.data || {};
	const { router } = useRouterQuery();

	const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const formData = createFormDataForImage(file, 'file');
			try {
				const { data } = await HttpService.patch(
					`${process.env.NEXT_PUBLIC_BASE_PATH}/${ApiEndpoints.UploadClinicMemberProfile}/${parentId}`,
					formData,
					{
						headers: {
							'Content-Type': 'multipart/form-data',
							'cache-control': 'no-cache',
						},
					}
				);
				if (data.status === 'SUCCESS') {
					refetchUrl();
					refecthUser();
				}
			} catch (err) {
				throw new Error('Network Error');
			}
		}
	};

	const handleEditParent = () => {
		dispatch(
			openModal({
				isOpen: true,
				view: ModalTypes.ADD_EDIT_PARENT,
				type: 'edit',
				data: {
					parentId: parentId,
					memberId: memberId,
				},
				refetch,
			})
		);
	};

	const handlePet = useCallback((pet: ICommonTypes.IPet) => {
		router.push(`/pet/${pet.petId}?parentId=${parentId}`);
	}, []);

	const handleAddPet = useCallback(() => {
		dispatch(
			openModal({
				isOpen: true,
				view: ModalTypes.ADD_EDIT_PET,
				type: 'add',
				data: {
					parentId,
				},
				refetch: refetch,
			})
		);
	}, []);

	return (
		<div className="col-span-2 sticky top-[12px] z-10">
			<div className="bg-white w-full px-16 shadow-base rounded-8 py-12 ">
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
