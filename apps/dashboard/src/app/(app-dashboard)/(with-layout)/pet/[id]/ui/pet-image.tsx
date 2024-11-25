'use client';

import { useDispatch } from 'react-redux';

import { useGetPetById, useGetPetProfileImage, useUpdatePetImage } from '@webservices/api';
import { ButtonWrapper, CategoryLoader, ImagePlaceholder } from '@webservices/ui';
import { CameraIcon, EditIcon } from '@webservices/icons';
import { createFormDataForImage } from '@webservices/helpers';
import { useRouterQuery } from '@webservices/hooks';
import { openModal } from '@webservices/slices';
import { ModalTypes, USER_EVENTS } from '@webservices/primitives';
import PetBasicDetails from './shared/pet-basic-details';
import { logEvent } from '@webservices/services';

const PetImage = () => {
	const { query } = useRouterQuery();
	const { data: profileData, refetch, isPending } = useGetPetById(query?.id as string);
	const { data: profileImage } = useGetPetProfileImage(query?.id as string);
	const { profileUrl } = profileImage?.data || {};
	const { name, breed, gender, type, dob, code } = profileData?.data?.pet || {};
	const { mutate: updatePetImage } = useUpdatePetImage(query?.id as string);
	const dispatch = useDispatch();

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const formData = createFormDataForImage(file, 'file');
			logEvent({ name: USER_EVENTS.PET_PROFILE_IMAGE_CLICK });
			updatePetImage(formData);
		}
	};

	const handleEditPet = () => {
		logEvent({ name: USER_EVENTS.PET_MODAL, events: { petId: query?.id, type: 'edit' } });
		dispatch(
			openModal({
				view: ModalTypes.ADD_EDIT_PET,
				type: 'edit',
				data: {
					petId: query?.id,
				},
				refetch,
				center: true,
			})
		);
	};

	if (isPending) {
		return <CategoryLoader rows={1} columns={1} coverHeight={440} />;
	}

	return (
		<div className="col-span-1 bg-white rounded-[16px] shadow-base flex justify-center items-center flex-col py-32 px-16 sticky top-54">
			<ButtonWrapper onClick={handleEditPet} className="!absolute top-12 right-12">
				<EditIcon width={18} height={18} />
			</ButtonWrapper>
			<div>
				<div className=" rounded-full w-[168px] h-[168px] bg-white relative">
					{profileUrl && profileUrl !== '' ? (
						<ImagePlaceholder
							src={profileUrl as string}
							containerClasses="w-[160px] h-[160px] "
							imageClasses="rounded-full object-cover"
						/>
					) : (
						<ImagePlaceholder
							src={type === 'CAT' ? '/images/Cat.png' : '/images/Dog.png'}
							containerClasses="w-full h-[160px]"
							imageClasses="rounded-full object-cover"
						/>
					)}
					<label className="cursor-pointer w-[32px] h-[32px] z-3 rounded-full absolute bg-primary-1 flex items-center justify-center right-0 top-[26px] shadow-base3">
						<input type="file" onChange={onChange} className="w-full hidden" />
						<CameraIcon className="text-white" width={18} height={18} />
					</label>
				</div>
			</div>
			<PetBasicDetails
				name={name as string}
				gender={gender as string}
				dob={dob as string}
				breed={breed as string}
				type={type as string}
				code={code as string}
			/>
		</div>
	);
};

export default PetImage;
