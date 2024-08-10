'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import DatePicker from 'react-date-picker';
import { useSelector } from 'react-redux';

import { Button, Radio, TextInput } from '@webservices/ui';
import { useGetUser, useUpdateUserDetails } from '@webservices/api';
import { PemilyRootState } from '@webservices/slices';
import { CalenderIcon } from '@webservices/icons';
import { format } from 'date-fns';

const validationSchema = yup.object().shape({
	name: yup.string().required('Name is required'),
	mobile: yup.string(),
	email: yup.string().email('Invalid email'),
});

const ProfileForm = () => {
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
			className="max-w-screen-lg mx-auto pb-[42px] space-y-24"
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
						className="mt-[4px]"
						onChange={setDob}
						value={dob}
						calendarIcon={<CalenderIcon width={18} height={18} />}
						clearIcon={null}
						maxDate={new Date()}
					/>
				</section>
			</section>
			<section className="grid grid-cols-2 gap-[42px]">
				<section>
					<label className="text-14">Choose Gender</label>
					<section className="flex gap-24 mt-8">
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
			<section className="flex justify-end mt-[32px]">
				<Button className="min-w-[250px]" isLoading={isPending} disabled={isPending}>
					<span>SUBMIT</span>
				</Button>
			</section>
		</form>
	);
};

export default ProfileForm;
