'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';

import { otpValidator, phoneValidator } from '@webservices/helpers';
import { Button, ButtonWrapper, TextInput } from '@webservices/ui';
import { useCheckUser, useSignin } from '@webservices/api';
import { PemilyRootState, setOtp } from '@webservices/slices';

const getSchema = (showOtp: boolean) => {
	return yup.object().shape({
		mobileNumber: yup
			.string()
			.required('Phone number is required')
			.matches(phoneValidator, 'Phone number is not valid'),
		otp: showOtp
			? yup.string().required('OTP is required').matches(otpValidator, 'OTP is not valid')
			: yup.string().notRequired(),
	});
};

const LoginForm = () => {
	const dispatch = useDispatch();
	const layoutState = useSelector((state: PemilyRootState) => state.layout);
	const {
		register,
		formState: { errors },
		handleSubmit,
		watch,
	} = useForm({
		resolver: yupResolver(getSchema(layoutState.showOtp)),
		mode: 'all',
	});
	const watchMobileNumber = watch('mobileNumber');
	const { mutate: checkUser, isPending } = useCheckUser({ mobileNumber: watchMobileNumber });
	const { mutate: signin, isPending: isLoading } = useSignin();

	const resetMobileNumber = () => {
		dispatch(setOtp({ showOtp: false }));
	};

	const onSubmit = (values: any) => {
		if (layoutState.showOtp) {
			signin({ mobile: Number(values.mobileNumber), otp: Number(values?.otp) });
		} else {
			checkUser({ mobileNumber: values.mobileNumber });
		}
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
				maxLength={10}
				readonly={layoutState?.showOtp}
				disabled={layoutState.showOtp}
			/>
			{layoutState?.showOtp && (
				<TextInput
					label="Enter OTP"
					name="otp"
					type="numeric"
					placeholder=""
					error={errors?.otp}
					register={register}
					maxLength={6}
				/>
			)}
			{layoutState?.showOtp && (
				<ButtonWrapper
					onClick={resetMobileNumber}
					className="text-14 font-medium text-brand cursor-pointer !mt-8"
				>
					Want to change the mobile number?
				</ButtonWrapper>
			)}
			<Button
				isLoading={isPending || isLoading}
				disabled={isPending || isLoading}
				className="w-full"
			>
				<span className="text-14 font-black tracking-[0.9px]">
					{layoutState?.showOtp ? 'SUBMIT' : 'GET OTP'}
				</span>
			</Button>
		</form>
	);
};

export default LoginForm;
