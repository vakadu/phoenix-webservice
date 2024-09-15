'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';

import { CloseIcon } from '@webservices/icons';
import { Button, ButtonWrapper, Modal, TextInput, Switch, Radio } from '@webservices/ui';
import {
	useCreateDoctor,
	useGetDoctorById,
	useGetPetById,
	useUpdateDoctor,
	useUpdatePet,
} from '@webservices/api';
import { format } from 'date-fns';

const validationSchema = yup.object().shape({
	name: yup.string().required('Name is required'),
	breed: yup.string().required('Breed is required'),
});

const AddEditPet = ({
	open,
	handleClose,
	petId,
	modalType,
}: {
	open: boolean;
	handleClose: () => void;
	petId: string | null;
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
	const { data } = useGetPetById(petId as string);
	const { name, breed, type: petType, dob: petDob, gender: petGender } = data?.data?.pet || {};
	const [dob, setDob] = useState<any>(new Date());
	const [gender, setGender] = useState('M');
	const [type, setType] = useState('DOG');

	const { mutate: updatePet, isPending } = useUpdatePet(petId as string, handleClose);
	// const { mutate: createDoctor, isPending: isLoading } = useCreateDoctor(handleClose);

	useEffect(() => {
		if (modalType === 'edit' && name && petId) {
			setValue('name', name);
			setValue('breed', breed || '');
			if (petDob) {
				setDob(new Date(petDob));
			}
			setType(petType || 'DOG');
			setGender(petGender || 'M');
		} else {
			reset({
				name: '',
				breed: '',
			});
			setType(petType || 'DOG');
			setGender(petGender || 'M');
			if (petDob) {
				setDob(new Date(petDob));
			}
		}
	}, [breed, modalType, name, petDob, petGender, petId, petType, reset, setValue]);

	const onSubmit = (values: any) => {
		if (modalType === 'edit') {
			const editData = {
				...values,
				gender,
				type,
				dob: format(dob, 'yyyy-MM-dd'),
			};
			updatePet(editData);
		} else {
			// createDoctor(values);
		}
	};

	return (
		<Modal isOpen={open} handleClose={handleClose}>
			<section className="bg-white rounded-8">
				<section className="flex justify-between items-center px-16 py-16 border-b border-grey-divider">
					<label className="font-medium text-18">
						{modalType === 'add' ? 'Add Pet Details' : 'Edit Pet Details'}
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
							placeholder=""
							error={errors?.name}
							{...register('name')}
						/>
						<TextInput
							label="Breed"
							placeholder=""
							error={errors?.breed}
							{...register('breed')}
						/>
					</section>
					<section className="grid grid-cols-2 gap-[42px]">
						<div>
							<label className="text-14 leading-14 block mb-10">Choose Gender</label>
							<div className="flex gap-24 items-center px-12 rounded-8 border border-grey-divider h-[52px] bg-white">
								<Radio
									label="Male"
									value="M"
									checked={gender === 'M'}
									name="male"
									onChange={() => setGender('M')}
								/>
								<Radio
									label="Female"
									value="F"
									checked={gender === 'F'}
									name="female"
									onChange={() => setGender('F')}
								/>
							</div>
						</div>
						<div>
							<label className="text-14 leading-14 block mb-10">Choose Type</label>
							<div className="flex gap-24 items-center px-12 rounded-8 border border-grey-divider h-[52px] bg-white">
								<Radio
									label="Dog"
									value="DOG"
									checked={type === 'DOG'}
									name="male"
									onChange={() => setType('DOG')}
								/>
								<Radio
									label="Cat"
									value="CAT"
									checked={type === 'CAT'}
									name="female"
									onChange={() => setType('CAT')}
								/>
							</div>
						</div>
					</section>
					<section className="grid grid-cols-2 gap-[42px]">
						<section className="flex flex-col">
							<label className="text-14">Date of Birth</label>
							<DatePicker
								className="mt-[4px] bg-white"
								onChange={setDob}
								selected={dob}
								maxDate={new Date()}
								dateFormat="yyyy-MM-dd"
							/>
						</section>
					</section>
					<section className="flex justify-end items-center !mt-32">
						<Button
							className="min-w-[220px]"
							// isLoading={isPending || isLoading}
							// disabled={isPending || isLoading}
						>
							<span className="font-semibold">
								{modalType === 'add' ? 'Add Pet' : 'Edit Pet'}
							</span>
						</Button>
					</section>
				</form>
			</section>
		</Modal>
	);
};

export default AddEditPet;
