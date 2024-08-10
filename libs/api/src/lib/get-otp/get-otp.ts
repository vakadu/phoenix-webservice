'use client';

import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

import { ApiEndpoints } from '@webservices/primitives';
import { setOtp } from '@webservices/slices';

type OtpPayload = {
	mobile: string;
};

const sendOtp = async (payload: OtpPayload) => {
	try {
		const { data } = await axios.post(
			`${process.env.NEXT_PUBLIC_BASE_PATH}/${ApiEndpoints.Otp}`,
			payload
		);
		return data;
	} catch (err) {
		throw new Error('Network Error');
	}
};

export function useGetOtp() {
	const dispatch = useDispatch();
	return useMutation({
		mutationFn: sendOtp,
		onSuccess: (data) => {
			dispatch(setOtp({ showOtp: true }));
			toast.success('OTP sent successfully!');
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});
}

export default useGetOtp;
