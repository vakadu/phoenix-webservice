import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';

import { ApiEndpoints } from '@webservices/primitives';
import { showSnackbar } from '@webservices/slices';

const signin = async (payload: IAuthTypes.ISigninFormData) => {
	try {
		const { data } = await axios.post<ICommonTypes.IApiResponse<IAuthTypes.ILoginInterface>>(
			`${process.env.NEXT_PUBLIC_BASE_PATH}/${ApiEndpoints.SignIn}`,
			payload
		);
		return data;
	} catch (err) {
		throw new Error('Network Error');
	}
};

export const useSignin = () => {
	const dispatch = useDispatch();
	return useMutation({
		mutationFn: signin,
		onSuccess: (data) => {
			dispatch(
				showSnackbar({
					message: 'Logged in!',
				})
			);
		},
		onError: (error) => {
			dispatch(
				showSnackbar({
					message: error.message,
				})
			);
		},
	});
};

export default useSignin;
