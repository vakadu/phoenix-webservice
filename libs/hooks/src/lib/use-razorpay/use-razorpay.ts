// "use client"

// import { useEffect } from 'react';

// import { PaymentScripts } from '@webservices/primitives';

// declare global {
// 	interface Window {
// 	  	Razorpay: any;
// 	}
// }

// const useScript = (src: string, id: string) => {
//     useEffect(() => {
//         if (!document.getElementById(id)) {
//             const script = document.createElement('script');
//             script.src = src;
//             script.id = id;
//             document.body.appendChild(script);
//         }
//     }, [src, id]);
// };

// export function useRazorpay() {
// 	const RAZORPAY_KEY = process.env['NEXT_PUBLIC_RAZORPAY_KEY'];
//     useScript(PaymentScripts.Razorpay, 'rp_script');

// 	const handleRazorpay = (payload: any) => {
// 		const options = {};
// 		console.log(payload);
		
// 		const data =
// 			payload.paidThrough !== 'card'
// 				? {
// 						callback_url: payload.gopayCallback,
// 						amount: payload.totalOrderAmount * 100,
// 						currency: 'INR',
// 						email: payload.customerEmail,
// 						contact: payload.mobileNumber || '7060863011',
// 						notes: {
// 							address: 'Ground Floor, SJR Cyber, Laskar Hosur Road, Bengaluru'
// 						},
// 						order_id: payload.id,
// 						method: payload.paidThrough,
// 						bank: payload.bankCode
// 				  }
// 				: {
// 						callback_url: payload.gopayCallback,
// 						amount: payload.totalOrderAmount * 100,
// 						currency: 'INR',
// 						email: payload.customerEmail,
// 						contact: payload.mobileNumber || '7060863011',
// 						notes: {
// 							address: 'Ground Floor, SJR Cyber, Laskar Hosur Road, Bengaluru'
// 						},
// 						order_id: payload.id,
// 						method: payload.paidThrough,
// 						'card[name]': payload?.cardData?.card_holder,
// 						'card[number]': payload?.cardData?.card_number.replace(/\s/g, ''),
// 						'card[cvv]': payload?.cardData?.card_cvv,
// 						'card[expiry_month]': payload?.cardData?.card_exipry?.split('/')[0],
// 						'card[expiry_year]': payload?.cardData?.card_exipry?.split('/')[1]
// 				  };
// 				  const res = window.Razorpay({ key: RAZORPAY_KEY, redirect: true });				  
// 				  res.createPayment(data, options);
// 	};

// 	const getRazorpayPayload = (
// 		type: string,
// 		response: PaymentTypes.PaymentResponseModel,
// 		session: LoginTypes.UserDetail,
// 		bank: string | null,
// 		values: any,
// 		isFromShipment: boolean,
// 	) => {
// 		let payload = null;
// 		console.log(type);
		
// 		if (type === 'netbanking' && bank && session) {
// 			payload = {
// 				mobileNumber: session?.phone_number,
// 				customerEmail: session?.email,
// 				orderId: response?.orderId,
// 				paymentId: response?.goPayPaymentId, //orderToken
// 				totalOrderAmount: response?.pgAmountToBeSent,
// 				id: response?.orderToken,
// 				gopayCallback: isFromShipment
// 					? response?.goPayCallbackUrl +
// 					  `?cb=${process.env.NEXT_PUBLIC_RAZORPAY_CB_URL}`
// 					: response?.goPayCallbackUrl,
// 				useWallet: false,
// 				usedWalletBalance: 0,
// 				modeOfPayment: 'RAZORPAY',
// 				paidThrough: 'netbanking',
// 				bankCode: bank,
// 			};
// 		} else if (type === 'upi' && session) {
// 			payload = {
// 				mobileNumber: session?.phone_number,
// 				customerEmail: session?.email,
// 				orderId: response?.orderId,
// 				paymentId: response?.goPayPaymentId, //orderToken
// 				totalOrderAmount: response?.pgAmountToBeSent,
// 				id: response?.orderToken,
// 				gopayCallback: isFromShipment
// 					? response?.goPayCallbackUrl +
// 					  `?cb=${process.env.NEXT_PUBLIC_RAZORPAY_CB_URL}`
// 					: response?.goPayCallbackUrl,
// 				useWallet: false,
// 				usedWalletBalance: 0,
// 				modeOfPayment: 'RAZORPAY',
// 				paidThrough: 'upi',
// 			};
// 		} else if (type === 'card' && values && session) {
// 			payload = {
// 				mobileNumber: session?.phone_number,
// 				customerEmail: session?.email,
// 				orderId: response?.orderId,
// 				paymentId: response?.goPayPaymentId,
// 				totalOrderAmount: response?.pgAmountToBeSent,
// 				id: response?.orderToken,
// 				gopayCallback: isFromShipment
// 					? response?.goPayCallbackUrl +
// 					  `?cb=${process.env.NEXT_PUBLIC_RAZORPAY_CB_URL}`
// 					: response?.goPayCallbackUrl,
// 				useWallet: false,
// 				usedWalletBalance: 0,
// 				modeOfPayment: 'RAZORPAY',
// 				paidThrough: 'card',
// 				cardData: values,
// 			};
// 		}
// 		// if (bestOffer && offerId) {
// 		// 	payload['offer_id'] = bestOffer['pg_offer_id'];
// 		// }
// 		return payload;
// 	};


// 	return {
// 		getRazorpayPayload,
// 		handleRazorpay
// 	}
// }

// export default useRazorpay;