'use client';

import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import axios from 'axios';

import { ApiEndpoints } from '@webservices/primitives';

type OtpPayload = {
	mobile: string;
};

const sendOtp = async (payload: OtpPayload) => {
	const { data } = await axios.post(
		`${process.env.NEXT_PUBLIC_BASE_PATH}/${ApiEndpoints.Otp}`,
		payload
	);
	return data;
};

export function useGetOtp(options?: UseMutationOptions<any, Error, OtpPayload>) {
	return useMutation({
		mutationFn: sendOtp,
		onSuccess: (data) => {},
		onError: (error) => {},
	});
}

export default useGetOtp;
