'use client';

import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import axios from 'axios';

import { ApiEndpoints } from '@webservices/primitives';

type OtpPayload = {
	mobile: string;
};

const checkUser = async (payload: { mobileNumber: string }) => {
	try {
		const data = await axios.get<IAuthTypes.IsUserRegisteredInterface>(
			`${process.env.NEXT_PUBLIC_BASE_PATH}/${ApiEndpoints.IsUserRegistered}/${payload.mobileNumber}`
		);
		return data;
	} catch (error: any) {
		console.error('Error sending OTP:', error);
		throw error;
	}
};

export function useCheckUser(options?: UseMutationOptions<any, Error, OtpPayload>) {
	return useMutation({
		mutationFn: checkUser,
		onSuccess: (data) => {},
		onError: (error) => {},
	});
}

export default useCheckUser;
