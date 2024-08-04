'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { phoneValidator } from '@webservices/helpers';
import { Button, TextInput } from '@webservices/ui';
import { useGetOtp } from '@webservices/api';

const schema = yup.object().shape({
	mobileNumber: yup
		.string()
		.required('phone number is required')
		.matches(phoneValidator, 'Phone number is not valid'),
});

const LoginForm = () => {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm({
		resolver: yupResolver(schema),
		mode: 'all',
	});
	const { mutate: sendOtp } = useGetOtp();

	const onSubmit = (values: { mobileNumber: string }) => {
		sendOtp({ mobile: values.mobileNumber });
	};

	return (
		<form className="space-y-24" onSubmit={handleSubmit(onSubmit)}>
			<TextInput
				label="Mobile Number"
				name="mobileNumber"
				type="numeric"
				placeholder="Enter your Mobile Number"
				error={errors?.mobileNumber}
				register={register}
			/>
			<Button className="w-full">
				<span className="text-16 font-black">GET OTP</span>
			</Button>
		</form>
	);
};

export default LoginForm;
