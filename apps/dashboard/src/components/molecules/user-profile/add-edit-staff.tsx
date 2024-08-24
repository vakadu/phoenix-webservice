'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { CloseIcon } from '@webservices/icons';
import { Button, ButtonWrapper, Modal, TextInput, Switch } from '@webservices/ui';
import { useCreateStaff, useGetStaffById, useUpdateStaff } from '@webservices/api';

const validationSchema = yup.object().shape({
	name: yup.string().required('Name is required'),
});

const AddEditStaff = ({
	open,
	handleClose,
	staffId,
	modalType,
}: {
	open: boolean;
	handleClose: () => void;
	staffId: string | null;
	modalType: 'add' | 'edit' | null;
}) => {
	const {
		register,
		handleSubmit,
		setValue,
		reset,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(validationSchema),
	});
	const [checked, setChecked] = useState(false);
	const { data } = useGetStaffById(staffId as string);
	const staffData = data?.data?.staffs?.[0] || (null as IClinicTypes.IClinicStaff | null);
	const { mutate: updateStaff, isPending } = useUpdateStaff(
		staffData?.staff?.staffId as string,
		handleClose
	);
	const { mutate: createStaff, isPending: isLoading } = useCreateStaff(handleClose);

	useEffect(() => {
		if (modalType === 'edit' && staffData && staffId) {
			setValue('name', staffData?.staff?.name);
			setChecked(staffData?.staff?.active);
		} else {
			reset({
				name: '',
			});
			setChecked(false);
		}
	}, [staffData, staffId, modalType, reset, setValue]);

	const onSubmit = (values: any) => {
		if (modalType === 'edit') {
			const editData = {
				...values,
				active: checked,
			};
			updateStaff(editData);
		} else {
			createStaff(values);
		}
	};

	return (
		<Modal isOpen={open} handleClose={handleClose}>
			<section className="bg-white rounded-8">
				<section className="flex justify-between items-center px-16 py-16 border-b border-grey-divider">
					<label className="font-medium text-18">
						{modalType === 'add' ? 'Add Staff Details' : 'Edit Staff Details'}
					</label>
					<ButtonWrapper onClick={handleClose}>
						<CloseIcon width={16} height={16} />
					</ButtonWrapper>
				</section>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="pb-[42px] space-y-24 mt-[24px] px-24"
				>
					<section className="">
						<TextInput
							label="Name"
							name="name"
							placeholder=""
							error={errors?.name}
							register={register}
						/>
					</section>
					{modalType === 'edit' && (
						<section>
							<Switch
								label="Is staff active?"
								value={checked}
								onChange={() => setChecked(!checked)}
							/>
						</section>
					)}
					<section className="flex justify-end items-center !mt-32">
						<Button
							className="min-w-[220px]"
							isLoading={isPending || isLoading}
							disabled={isPending || isLoading}
						>
							<span className="font-semibold">
								{modalType === 'add' ? 'Add Staff' : 'Edit Staff'}
							</span>
						</Button>
					</section>
				</form>
			</section>
		</Modal>
	);
};

export default AddEditStaff;
