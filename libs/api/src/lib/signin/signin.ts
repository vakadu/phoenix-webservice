import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

import { ApiEndpoints, ModalTypes } from '@webservices/primitives';
import { authenticateUser, openModal, setOtp } from '@webservices/slices';
import { useRouterQuery } from '@webservices/hooks';

const signin = async (payload: IAuthTypes.ISigninFormData) => {
	try {
		const { data } = await axios.post<ICommonTypes.IApiResponse<IAuthTypes.ILoginInterface>>(
			`${process.env.NEXT_PUBLIC_BASE_PATH}/${ApiEndpoints.SignIn}`,
			payload
		);
		return data;
	} catch (err: any) {
		throw new Error(err.response?.data?.msg);
	}
};

export const useSignin = () => {
	const dispatch = useDispatch();
	const { router } = useRouterQuery();

	return useMutation({
		mutationFn: signin,
		onSuccess: (data) => {
			dispatch(setOtp({ showOtp: false }));
			dispatch(
				openModal({
					isOpen: true,
					view: ModalTypes.LOADING_MODAL,
				})
			);
			dispatch(
				authenticateUser({
					token: data?.data?.accessToken,
					refreshToken: data?.data?.refreshToken,
					navigateFunction: () => router.push('/medical-records'),
				})
			);
			toast.success('Logged in!');
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});
};

export default useSignin;
