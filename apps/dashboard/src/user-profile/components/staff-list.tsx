'use client';

import { useState } from 'react';

import { useGetStaff, useUpdateClinicMemberProfile } from '@webservices/api';
import UserProfileImage from '../../atoms/user-profile';
import { EditIcon, PlusIcon, UploadIcon } from '@webservices/icons';
import { BoxLoader, ButtonWrapper } from '@webservices/ui';
import { createFormDataForImage } from '@webservices/helpers';
import AddEditStaff from './add-edit-staff';

const StaffList = () => {
	const { data, isPending } = useGetStaff();
	const [open, setOpen] = useState(false);
	const [staffId, setStaffId] = useState<string | null>(null);
	const [modalType, setModalType] = useState<'add' | 'edit' | null>(null);
	const { mutate: uploadClinicMemberProfile } = useUpdateClinicMemberProfile(staffId as string);

	const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
		event.stopPropagation();
		const buttonElement = (event.target as HTMLElement).closest('button');
		const id = buttonElement?.getAttribute('data-id') as string;
		setStaffId(id);
		setOpen(!open);
		setModalType('edit');
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
		setStaffId(id);
		const file = event.target.files?.[0];
		if (file) {
			const formData = createFormDataForImage(file, 'file');
			uploadClinicMemberProfile(formData);
		}
	};

	const handleAdd = () => {
		setOpen(!open);
		setModalType('add');
		setStaffId(null);
	};

	if (isPending) {
		return <BoxLoader rows={2} columns={7} coverHeight={144} />;
	}

	return (
		<>
			<AddEditStaff
				staffId={staffId}
				modalType={modalType}
				open={open}
				handleClose={() => setOpen(false)}
			/>
			<section
				onClick={handleClick}
				className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-24 "
			>
				{data?.data?.staffs?.map((staff) => {
					return (
						<section key={staff?.staff?.staffId}>
							<section className="cursor-pointer w-full relative">
								<UserProfileImage
									id={staff?.staff?.staffId}
									containerClasses="!w-full !h-[154px]"
									imageClasses="!rounded-8"
									iconHeight={154}
									iconWidth="100%"
								/>
							</section>
							<section className="flex justify-between items-center py-6 w-full gap-6">
								<span className="font-medium flex-1 text-left">
									{staff?.staff?.name}
								</span>
								<section className="flex gap-8">
									<label className="cursor-pointer w-24 h-24 flex items-center justify-center">
										<input
											type="file"
											onChange={(e) => handleChange(e, staff?.staff?.staffId)}
											className="w-full hidden"
										/>
										<UploadIcon className="w-22 h-22" />
									</label>
									<ButtonWrapper
										data-id={staff?.staff?.staffId}
										className="w-24 h-24 flex items-center justify-center"
									>
										<EditIcon className="w-16 h-16" />
									</ButtonWrapper>
								</section>
							</section>
						</section>
					);
				})}
				<ButtonWrapper
					onClick={handleAdd}
					className="w-[154px] h-[154px] border-[2px] border-dashed border-primary-1 rounded-8 flex items-center justify-center cursor-pointer"
				>
					<section className="w-[58px] h-[58px] bg-primary-1 flex items-center justify-center rounded-full">
						<PlusIcon className="text-white" />
					</section>
				</ButtonWrapper>
			</section>
		</>
	);
};

export default StaffList;
