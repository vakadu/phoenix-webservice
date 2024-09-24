import { useGetUserProfileUrl, useUpdateClinicMemberProfile } from '@webservices/api';
import { createFormDataForImage } from '@webservices/helpers';
import { CameraIcon, EditIcon, UserIcon } from '@webservices/icons';
import { ModalTypes } from '@webservices/primitives';
import { openModal } from '@webservices/slices';
import { ButtonWrapper, ImagePlaceholder } from '@webservices/ui';
import { useDispatch } from 'react-redux';

export default function PetParentDetails({
	parentDetails,
	refetch,
}: {
	parentDetails: IClinicTypes.IPetParent;
	refetch: () => void;
}) {
	const { data } = useGetUserProfileUrl(parentDetails?.parent?.parentId as string);
	const { mutate: uploadClinicMemberProfile } = useUpdateClinicMemberProfile(
		parentDetails?.memberId as string
	);
	const { profileUrl } = data?.data || {};
	const dispatch = useDispatch();

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const formData = createFormDataForImage(file, 'file');
			uploadClinicMemberProfile(formData);
		}
	};

	const handleEditParent = () => {
		dispatch(
			openModal({
				isOpen: true,
				view: ModalTypes.ADD_EDIT_PARENT,
				type: 'edit',
				data: {
					parentId: parentDetails?.parent?.parentId,
					memberId: parentDetails?.memberId,
				},
				refetch,
			})
		);
	};

	return (
		<div className="col-span-2 sticky top-[12px] z-10">
			<div className="bg-white w-full px-16 shadow-base rounded-8 py-12 flex gap-32 items-start">
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
					<h4 className="text-24 font-medium">{parentDetails?.parent?.name}</h4>
					<p className="text-14">{parentDetails?.parent?.mobile}</p>
				</div>
				<ButtonWrapper
					onClick={handleEditParent}
					className="flex items-center justify-center gap-6 border border-primary-1 py-6 px-8 rounded-8 shadow-base bg-primary-1"
				>
					<EditIcon color="#FFF" width={14} height={14} />
					<span className="text-14 font-medium text-white">Edit</span>
				</ButtonWrapper>
			</div>
		</div>
	);
}
