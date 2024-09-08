'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';

import { Button, Radio, TextInput } from '@webservices/ui';
import { useGetUser, useUpdateUserDetails } from '@webservices/api';
import { PemilyRootState } from '@webservices/slices';
import { CalenderIcon } from '@webservices/icons';

const validationSchema = yup.object().shape({
	name: yup.string().required('Name is required'),
	mobile: yup.string(),
	email: yup.string().email('Invalid email'),
});

const PersonalDetailsForm = () => {
	const {
		register,
		formState: { errors },
		handleSubmit,
		setValue,
	} = useForm({
		resolver: yupResolver(validationSchema),
		mode: 'all',
	});
	const authState = useSelector((state: PemilyRootState) => state.auth);
	const { data } = useGetUser(authState.userId as string);
	const [dob, setDob] = useState<any>(new Date());
	const [gender, setGender] = useState('M');
	const { mutate: updateUser, isPending } = useUpdateUserDetails();

	useEffect(() => {
		if (data?.data?.user) {
			setValue('name', data?.data?.user?.name);
			setValue('mobile', data?.data?.user?.mobile);
			setValue('email', data?.data?.user?.email);
			if (data?.data?.user?.dob) {
				setDob(new Date(data?.data?.user?.dob));
			}
			setGender(data?.data?.user?.gender || 'M');
		}
	}, [data?.data?.user, setValue]);

	const onSubmit = (values: any) => {
		const payload = {
			name: values.name,
			email: values.email,
			gender,
			dob: format(dob, 'yyyy-MM-dd'),
		};
		updateUser(payload);
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="max-w-screen-lg pb-[42px] space-y-24 mt-[54px]"
		>
			<section className="grid grid-cols-2 gap-[42px]">
				<TextInput
					label="Name"
					name="name"
					placeholder="Enter your Mobile Number"
					error={errors?.name}
					register={register}
				/>
				<TextInput
					label="Mobile Number"
					name="mobile"
					type="numeric"
					placeholder=""
					error={errors?.mobile}
					register={register}
					maxLength={10}
					readonly={true}
					disabled={true}
				/>
			</section>
			<section className="grid grid-cols-2 gap-[42px]">
				<TextInput
					label="Email"
					name="email"
					placeholder="Enter your Email ID"
					error={errors?.email}
					register={register}
				/>
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
			<section className="grid grid-cols-2 gap-[42px]">
				<section>
					<label className="text-14 leading-14 block mb-10">Choose Gender</label>
					<section className="flex gap-24 items-center px-12 rounded-8 border border-grey-divider h-[52px] bg-white">
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
					</section>
				</section>
			</section>
			<section className="!mt-[42px]">
				<Button className="min-w-[250px]" isLoading={isPending} disabled={isPending}>
					<span className="font-bold">Save Profile</span>
				</Button>
			</section>
		</form>
	);
};

export default PersonalDetailsForm;
