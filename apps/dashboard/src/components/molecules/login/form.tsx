'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

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
	});
	const watchMobileNumber = watch('mobileNumber');
	const watchOtp = watch('otp');
	const { mutate: checkUser, isPending } = useCheckUser({ mobileNumber: watchMobileNumber });
	const { mutate: signin, isPending: isLoading } = useSignin();

	useEffect(() => {
		if (watchMobileNumber?.length === 10 && watchOtp?.length === 6) {
			signin({ mobile: Number(watchMobileNumber), otp: Number(watchOtp) });
		}
	}, [signin, watchMobileNumber, watchOtp]);

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
		<form className="space-y-24 w-full mt-24" onSubmit={handleSubmit(onSubmit)}>
			<TextInput
				label=""
				type="numeric"
				placeholder="Enter your Mobile Number"
				error={errors?.mobileNumber}
				maxLength={10}
				readonly={layoutState?.showOtp}
				disabled={layoutState.showOtp}
				{...register('mobileNumber')}
			/>
			{layoutState?.showOtp && (
				<TextInput
					label=""
					type="numeric"
					placeholder="Enter 6 digit OTP"
					error={errors?.otp}
					{...register('otp')}
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
				type="submit"
			>
				<span className="text-14 font-black tracking-[0.9px]">
					{layoutState?.showOtp ? 'SUBMIT' : 'GET OTP'}
				</span>
			</Button>
		</form>
	);
};

export default LoginForm;
