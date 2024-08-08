import axios, { AxiosResponse } from 'axios';

import { ApiEndpoints } from '@webservices/primitives';
import { pemilyStore, updateUser } from '@webservices/slices';
import { HttpService } from './http-service';

let isAlreadyFetchingAccessToken = false;
type AccessTokenSubscriber = (accessToken: string) => void;
let subscribers: AccessTokenSubscriber[] = [];

async function ResetTokenAndReattemptRequest(error: any): Promise<AxiosResponse> {
	const retryOriginalRequest = new Promise<AxiosResponse>((resolve) => {
		addSubscriber((accessToken: string) => {
			error.config.headers.Authorization = `Bearer ${accessToken}`;
			resolve(HttpService(error.config));
		});
	});

	if (!isAlreadyFetchingAccessToken) {
		isAlreadyFetchingAccessToken = true;

		try {
			const resp = await axios.post(
				`${process.env.NEXT_PUBLIC_BASE_PATH}/${ApiEndpoints.RefreshToken}`,
				{
					refreshToken: pemilyStore.getState().auth.refreshToken,
				}
			);

			if (resp?.data?.status === 'SUCCESS') {
				pemilyStore.dispatch(
					updateUser({
						...pemilyStore.getState().auth,
						token: resp?.data?.data?.accessToken,
					})
				);
				onAccessTokenFetched(resp?.data?.data?.accessToken);
			} else {
				// logout();
			}
		} catch (err) {
			// logout();
			// Handle errors
		} finally {
			isAlreadyFetchingAccessToken = false;
		}
	}
	return retryOriginalRequest;
}

function onAccessTokenFetched(accessToken: string) {
	subscribers.forEach((callback) => callback(accessToken));
	subscribers = [];
}

function addSubscriber(callback: AccessTokenSubscriber) {
	subscribers.push(callback);
}

export { ResetTokenAndReattemptRequest };
