'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useSelector } from 'react-redux';

import { phoneValidator } from '@webservices/helpers';
import { Button, ButtonWrapper, TextInput } from '@webservices/ui';
import { useCheckUser } from '@webservices/api';
import { PemilyRootState } from '@webservices/slices';
import { BackIcon } from '@webservices/icons';
import useLoginOtpHook from '../hooks/otp-hook';

const validationSchema = yup.object().shape({
	mobileNumber: yup
		.string()
		.required('Phone number is required')
		.matches(phoneValidator, 'Phone number is not valid'),
});

const LoginForm = () => {
	const layoutState = useSelector((state: PemilyRootState) => state.layout);
	const {
		register,
		formState: { errors },
		handleSubmit,
		watch,
	} = useForm({
		resolver: yupResolver(validationSchema),
	});
	const watchMobileNumber = watch('mobileNumber');
	const { mutate: checkUser, isPending } = useCheckUser({ mobileNumber: watchMobileNumber });
	const { otp, otpRefs, handleClick, handleKeyDown, handleOtpChange, handleBack } =
		useLoginOtpHook({ mobile: watchMobileNumber });

	const onSubmit = (values: { mobileNumber: string }) => {
		checkUser({ mobileNumber: values.mobileNumber });
	};

	return (
		<div>
			<ButtonWrapper
				onClick={layoutState?.showOtp ? handleBack : () => null}
				className="flex items-center gap-24"
			>
				{layoutState?.showOtp && <BackIcon />}
				<span className="text-[32px] leading-[42px] font-semibold text-left">
					{layoutState?.showOtp
						? 'Enter 6 digit OTP code'
						: 'Get started with your 10 digit mobile number'}
				</span>
			</ButtonWrapper>
			<form className="w-full mt-24" onSubmit={handleSubmit(onSubmit)}>
				{!layoutState?.showOtp && (
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
				)}
				{layoutState?.showOtp && (
					<span className="text-14 text-grey-text3">
						OTP sent to +91-{watchMobileNumber}
					</span>
				)}
				{layoutState?.showOtp && (
					<div className="flex gap-12 mt-24">
						{otp.map((_, i) => {
							return (
								<input
									key={i}
									ref={(input) => (otpRefs.current[i] = input) as any}
									className={`${
										otp[i] !== '' ? 'bg-primary-1 text-white' : 'bg-white'
									} leading-16 h-[52px] w-[52px] px-12 transition duration-300 ease-in-out border focus:ring-1  focus:shadow-sm outline-none focus:border-none
   focus:outline-none focus:ring-opacity-90 rounded-8 focus:ring-brand border-grey-divider text-center text-24 font-medium`}
									onChange={(e) => handleOtpChange(e, i)}
									onKeyDown={(e) => handleKeyDown(e, i)}
									value={otpRefs.current[i]?.value as string}
									onClick={(e) => handleClick(e, i)}
									maxLength={1}
								/>
							);
						})}
					</div>
				)}
				{!layoutState?.showOtp && (
					<Button
						isLoading={isPending}
						disabled={isPending}
						className="w-full rounded-12 mt-24"
						type="submit"
					>
						<span className="text-14 font-black tracking-[0.9px]">GET OTP</span>
					</Button>
				)}
			</form>
		</div>
	);
};

export default LoginForm;
