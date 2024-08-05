declare namespace IAuthTypes {
	interface IsUserRegisteredInterface {
		isUser: boolean;
	}
	interface ILoginOtpApiResponse {
		status: 'SUCCESS' | 'ERROR';
		msg: string;
		data: {
			type: string;
		};
		statusCode: number;
	}
	interface ILoginInterface {
		status: 'SUCCESS' | 'ERROR';
		msg: string;
		data: {
			accessToken: string;
			refreshToken: string;
		};
		statusCode: number;
	}
	interface ISignupFormData {
		mobile: number;
		otp: number;
		name: string;
		role: string;
	}
	interface ISigninFormData {
		mobile: number;
		otp: number;
	}
	type ISubscription = 'BASIC' | 'ADVANCE' | 'PREMIUM';
}
