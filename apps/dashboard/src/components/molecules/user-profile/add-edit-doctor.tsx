'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { CloseIcon } from '@webservices/icons';
import { Button, ButtonWrapper, Modal, TextInput, Switch } from '@webservices/ui';
import { useCreateDoctor, useGetDoctorById, useUpdateDoctor } from '@webservices/api';

const validationSchema = yup.object().shape({
	name: yup.string().required('Name is required'),
	degree: yup.string().required('Degree is required'),
	experience: yup
		.string()
		.required('Experience in years is required')
		.matches(/^\d+$/, 'Expereince should contain only digits'),
	speciality: yup.string().required('Speciality is required'),
});

const AddEditDoctor = ({
	open,
	handleClose,
	doctorId,
	modalType,
}: {
	open: boolean;
	handleClose: () => void;
	doctorId: string | null;
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
	const { data } = useGetDoctorById(doctorId as string);
	const doctorData = data?.data?.doctors?.[0] || (null as IClinicTypes.IClinicDoctor | null);
	const { mutate: updateDoctor, isPending } = useUpdateDoctor(
		doctorData?.doctor?.doctorId as string,
		handleClose
	);
	const { mutate: createDoctor, isPending: isLoading } = useCreateDoctor(handleClose);

	useEffect(() => {
		if (modalType === 'edit' && doctorData && doctorId) {
			setValue('name', doctorData?.doctor?.name);
			setValue('degree', doctorData?.doctor?.degree);
			setValue(
				'experience',
				doctorData?.doctor?.experience ? String(doctorData?.doctor?.experience) : ''
			);
			setValue('speciality', doctorData?.doctor?.speciality);
			setChecked(doctorData?.doctor?.active);
		} else {
			reset({
				name: '',
				degree: '',
				experience: '',
				speciality: '',
			});
			setChecked(false);
		}
	}, [doctorData, doctorId, modalType, reset, setValue]);

	const onSubmit = (values: any) => {
		if (modalType === 'edit') {
			const editData = {
				...values,
				active: checked,
			};
			updateDoctor(editData);
		} else {
			createDoctor(values);
		}
	};

	return (
		<Modal isOpen={open} handleClose={handleClose}>
			<section className="bg-white rounded-8">
				<section className="flex justify-between items-center px-16 py-16 border-b border-grey-divider">
					<label className="font-medium text-18">
						{modalType === 'add' ? 'Add Doctor Details' : 'Edit Doctor Details'}
					</label>
					<ButtonWrapper onClick={handleClose}>
						<CloseIcon width={16} height={16} />
					</ButtonWrapper>
				</section>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="pb-[42px] space-y-24 mt-[24px] px-24"
				>
					<section className="grid grid-cols-2 gap-[42px]">
						<TextInput
							label="Name"
							name="name"
							placeholder=""
							error={errors?.name}
							register={register}
						/>
						<TextInput
							label="Degree"
							name="degree"
							placeholder=""
							error={errors?.degree}
							register={register}
						/>
					</section>
					<section className="grid grid-cols-2 gap-[42px]">
						<TextInput
							label="Experience in Years"
							name="experience"
							placeholder=""
							error={errors?.experience}
							register={register}
						/>
						<TextInput
							label="Speciality"
							name="speciality"
							placeholder=""
							error={errors?.speciality}
							register={register}
						/>
					</section>
					{modalType === 'edit' && (
						<section>
							<Switch
								label="Is doctor active?"
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
								{modalType === 'add' ? 'Add Doctor' : 'Edit Doctor'}
							</span>
						</Button>
					</section>
				</form>
			</section>
		</Modal>
	);
};

export default AddEditDoctor;
