'use client';

import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

import { ApiEndpoints } from '@webservices/primitives';
import useGetOtp from '../get-otp/get-otp';
import { setIsNewUser } from '@webservices/slices';

const checkUser = async (payload: { mobileNumber: string }) => {
	try {
		const { data } = await axios.get<
			ICommonTypes.IApiResponse<IAuthTypes.IsUserRegisteredInterface>
		>(
			`${process.env.NEXT_PUBLIC_BASE_PATH}/${ApiEndpoints.IsUserRegistered}/${payload.mobileNumber}`
		);
		return data;
	} catch (err) {
		throw new Error('Network Error');
	}
};

export function useCheckUser({ mobileNumber }: { mobileNumber: string }) {
	const dispatch = useDispatch();
	const { mutate: sendOtp } = useGetOtp();
	return useMutation({
		mutationFn: checkUser,
		onSuccess: (data) => {
			if (data?.status === 'SUCCESS') {
				if (data?.data?.isUser) {
					sendOtp({ mobile: mobileNumber });
				} else {
					toast.error('Your phone number is not registered');
					dispatch(setIsNewUser({ isNewUser: true }));
				}
			} else {
				toast.error('Please try again');
			}
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});
}

export default useCheckUser;
