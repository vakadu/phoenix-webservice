'use client';

import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useSignin } from '@webservices/api';
import { setOtp } from '@webservices/slices';

const defaultOtp = new Array(6).fill('');

export default function useLoginOtpHook({ mobile }: { mobile: string }) {
	const [otp, updateOtp] = useState(defaultOtp);
	const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
	const { mutate: signin } = useSignin();
	const dispatch = useDispatch();

	const resetMobileNumber = () => {
		dispatch(setOtp({ showOtp: false }));
	};

	const handleBack = () => {
		resetMobileNumber();
		updateOtp(defaultOtp);
	};

	const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
		e.preventDefault();
		const value = e.target.value;
		const temp = [...otp];
		temp[i] = value.slice(value.length - 1);
		updateOtp(temp);

		const combinedOtp = temp.join('');
		if (combinedOtp.length === 6) {
			signin({ mobile: Number(mobile), otp: Number(combinedOtp) });
		}

		if (value && i < otp.length - 1) {
			otpRefs.current[i + 1]?.focus();
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, i: number) => {
		if (e.key === 'Backspace') {
			if (i > 0) {
				if (otp[i] === '') {
					otpRefs.current[i - 1]?.focus();
				}
			}
		}
	};

	const handleClick = (e: React.MouseEvent<HTMLInputElement>, i: number) => {
		otpRefs.current[i]?.setSelectionRange(1, 1);
	};

	return {
		handleClick,
		handleKeyDown,
		handleOtpChange,
		otp,
		otpRefs,
		handleBack,
	};
}
