'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { phoneValidator } from '@webservices/helpers';
import { Button, TextInput } from '@webservices/ui';
import { useCheckUser } from '@webservices/api';
import { useSelector } from 'react-redux';
import { PemilyRootState } from '@webservices/slices';

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
		watch,
	} = useForm({
		resolver: yupResolver(schema),
		mode: 'all',
	});
	const watchMobileNumber = watch('mobileNumber');
	const { mutate: checkUser, isPending } = useCheckUser({ mobileNumber: watchMobileNumber });
	const layoutState = useSelector((state: PemilyRootState) => state.layout);
	console.log(layoutState);

	const onSubmit = (values: { mobileNumber: string }) => {
		checkUser({ mobileNumber: values.mobileNumber });
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
			<Button isLoading={isPending} disabled={isPending} className="w-full">
				<span className="text-16 font-black">GET OTP</span>
			</Button>
		</form>
	);
};

export default LoginForm;
