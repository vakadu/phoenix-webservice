'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import Select, { StylesConfig, SingleValue } from 'react-select';

import TextInput from '../text-input/text-input';
import Button from '../button/button';
import { PemilyRootState } from '@webservices/slices';
import { useCreatePet, useGetPetById, usePetBreed, useUpdatePet } from '@webservices/api';
import DatePicker from 'react-datepicker';
import Radio from '../radio/radio';
import toast from 'react-hot-toast';

interface OptionType {
	value: string;
	label: string;
}

const validationSchema = yup.object().shape({
	name: yup.string().required('Name is required'),
});

const customStyles: StylesConfig<OptionType, false> = {
	control: (provided, state) => ({
		...provided,
		borderColor: state.isFocused ? '#007A65' : '#D3DADD',
		boxShadow: 'none',
	}),
	option: (provided, state) => ({
		...provided,
		backgroundColor: state.isFocused ? '#007A65' : undefined,
		color: state.isFocused ? '#fff' : '#000',
		fontSize: '14px',
	}),
};

export function AddEditPet() {
	const modalState = useSelector((state: PemilyRootState) => state.modal);
	const {
		handleSubmit,
		formState: { errors },
		setValue,
		register,
		reset,
	} = useForm({
		resolver: yupResolver(validationSchema),
	});
	const { data } = useGetPetById(modalState.data?.petId as string);
	const { name, breed, type: petType, dob: petDob, gender: petGender } = data?.data?.pet || {};
	const [dob, setDob] = useState<any>(new Date());
	const [gender, setGender] = useState('M');
	const [type, setType] = useState<string>('');
	const { mutate: updatePet, isPending } = useUpdatePet(modalState.data?.petId as string);
	const { mutate: createPet, isPending: isLoading } = useCreatePet({
		parentId: modalState?.data?.parentId,
		refetchParents: modalState?.refetch as () => void,
	});
	const { data: breedData } = usePetBreed({ type });
	const [selectedBreed, setSelectedBreed] = useState<SingleValue<OptionType>>(null);
	console.log(breed);

	useEffect(() => {
		if (modalState.type === 'edit' && name && modalState.data?.petId) {
			setValue('name', name);
			if (breed) {
				setSelectedBreed({ value: breed, label: breed });
			}
			if (petDob) {
				setDob(new Date(petDob));
			}
			if (petType) {
				setType(petType);
			}
			setGender(petGender || 'M');
		} else {
			reset({
				name: '',
			});
			setType('');
			setSelectedBreed(null);
			setGender(petGender || 'M');
			if (petDob) {
				setDob(new Date(petDob));
			}
		}
	}, [
		breed,
		modalState.data?.petId,
		modalState.type,
		name,
		petDob,
		petGender,
		petType,
		reset,
		setValue,
	]);

	const handleChange = (option: SingleValue<OptionType>) => {
		setSelectedBreed(option);
	};

	const onSubmit = (values: any) => {
		if (!type) {
			toast.error('Choose type');
			return;
		}
		if (!selectedBreed) {
			toast.error('Choose Breed');
			return;
		}
		if (modalState.type === 'edit') {
			const payload = {
				...values,
				gender,
				breed: selectedBreed?.value,
				type,
				dob: format(dob, 'yyyy-MM-dd'),
			};
			updatePet(payload);
		} else {
			const payload = {
				...values,
				gender,
				type,
				breed: selectedBreed?.value,
				dob: format(dob, 'yyyy-MM-dd'),
				parentId: modalState?.data?.parentId,
			};
			createPet(payload);
		}
	};

	return (
		<div className="bg-white rounded-8">
			<div className="flex justify-between items-center px-16 py-16 border-b border-grey-divider">
				<label className="font-medium text-18">
					{modalState.type === 'add' ? 'Add Pet Details' : 'Edit Pet Details'}
				</label>
			</div>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="pb-[42px] space-y-24 mt-[24px] px-24"
			>
				<div className="grid grid-cols-2 gap-[42px]">
					<TextInput
						label="Name"
						placeholder=""
						error={errors?.name}
						{...register('name')}
					/>
					<div className="flex flex-col">
						<label className="text-14">Date of Birth</label>
						<DatePicker
							className="mt-[4px] bg-white"
							onChange={setDob}
							selected={dob}
							maxDate={new Date()}
							dateFormat="yyyy-MM-dd"
						/>
					</div>
				</div>
				<div className="grid grid-cols-2 gap-[42px]">
					<div>
						<label className="text-14 leading-14 block mb-10">Choose Type</label>
						<div className="flex gap-24 items-center px-12 rounded-8 border border-grey-divider h-[52px] bg-white">
							<Radio
								label="Dog"
								value="DOG"
								checked={type === 'DOG'}
								name="male"
								onChange={() => {
									setType('DOG');
									setSelectedBreed(null);
								}}
							/>
							<Radio
								label="Cat"
								value="CAT"
								checked={type === 'CAT'}
								name="female"
								onChange={() => {
									setType('CAT');
									setSelectedBreed(null);
								}}
							/>
						</div>
					</div>
					{type && (
						<div>
							<label className="text-14 leading-14 mb-[10px] block cursor-pointer">
								Choose Breed
							</label>
							<Select
								options={breedData}
								className="h-[52px] react-select-container"
								classNamePrefix="react-select"
								styles={customStyles}
								onChange={handleChange}
								value={selectedBreed}
							/>
						</div>
					)}
				</div>
				<div className="grid grid-cols-2 gap-[42px]">
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
				</div>
				<div className="flex justify-end items-center !mt-32">
					<Button
						className="min-w-[220px]"
						isLoading={isPending || isLoading}
						disabled={isPending || isLoading}
					>
						<span className="font-semibold">
							{modalState.type === 'add' ? 'Add Pet' : 'Edit Pet'}
						</span>
					</Button>
				</div>
			</form>
		</div>
	);
}

export default AddEditPet;
