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
	const [userDob, setDob] = useState<any>(new Date());
	const [userGender, setGender] = useState('M');
	const { mutate: updateUser, isPending } = useUpdateUserDetails();
	const { name, mobile, email, dob, gender } = data?.data?.user || {};

	useEffect(() => {
		if (data?.data?.user) {
			setValue('name', name as string);
			setValue('mobile', mobile);
			setValue('email', email);
			if (dob) {
				setDob(new Date(dob));
			}
			setGender(gender || 'M');
		}
	}, [data?.data?.user, dob, email, gender, mobile, name, setValue]);

	const onSubmit = (values: any) => {
		const payload = {
			name: values.name,
			email: values.email,
			gender: userGender,
			dob: format(userDob, 'yyyy-MM-dd'),
		};
		updateUser(payload);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<section className="grid grid-cols-2 gap-24 mb-24">
				<TextInput
					label="Name"
					placeholder="Enter your Mobile Number"
					error={errors?.name}
					{...register('name')}
				/>
				<TextInput
					label="Mobile Number"
					type="numeric"
					placeholder=""
					error={errors?.mobile}
					maxLength={10}
					readonly={true}
					disabled={true}
					{...register('mobile')}
				/>
			</section>
			<section className="grid grid-cols-2 gap-24 mb-24">
				<TextInput
					label="Email"
					placeholder="Enter your Email ID"
					error={errors?.email}
					{...register('email')}
				/>
				<section className="flex flex-col">
					<label className="text-14">Date of Birth</label>
					<DatePicker
						className="mt-[4px] bg-white"
						onChange={setDob}
						selected={userDob}
						maxDate={new Date()}
						dateFormat="yyyy-MM-dd"
					/>
				</section>
			</section>
			<section className="grid grid-cols-2 gap-24 mb-24">
				<section>
					<label className="text-14 leading-14 block mb-10">Choose Gender</label>
					<section className="flex gap-24 items-center px-12 rounded-8 border border-grey-divider h-[52px] bg-white">
						<Radio
							label="Male"
							value="M"
							checked={userGender === 'M'}
							name="male"
							onChange={() => setGender('M')}
						/>
						<Radio
							label="Female"
							value="F"
							checked={userGender === 'F'}
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
