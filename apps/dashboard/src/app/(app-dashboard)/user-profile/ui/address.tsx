'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useSelector } from 'react-redux';

import { Button, Radio, TextInput } from '@webservices/ui';
import { useCreateAddress, useGetUser, usePincode, useUpdateAddress } from '@webservices/api';
import { PemilyRootState } from '@webservices/slices';

const validationSchema = yup.object().shape({
	line1: yup.string().required('Line1 is required'),
	line2: yup.string(),
	pincode: yup
		.string()
		.required('Pincode is required')
		.matches(/^[1-9][0-9]{5}$/, 'The pincode should consist of 6 digits.'),
	district: yup.string().required('district is required'),
	state: yup.string().required('state is required'),
});

interface IPayload {
	line1: string;
	line2: string;
	pincode: string;
	district: string;
	state: string;
	type: string;
	isPrimary: boolean;
}

const AddressForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		watch,
	} = useForm({
		resolver: yupResolver(validationSchema),
	});
	const authState = useSelector((state: PemilyRootState) => state.auth);
	const { data } = useGetUser(authState.userId as string);
	const [addressType, setType] = useState('HOME');
	const { mutate: getPincode } = usePincode();
	const { mutate: updateAddress, isPending } = useUpdateAddress(
		data?.data?.user?.addressId as string
	);
	const { mutate: createAddress, isPending: isLoading } = useCreateAddress();
	const { line1, line2, pincode, district, state, type } = data?.data?.user?.address || {};
	const watchPincode = watch('pincode');

	useEffect(() => {
		if (data?.data?.user) {
			setValue('line1', line1 || '');
			setValue('line2', line2 || '');
			setValue('pincode', pincode || '');
			setValue('district', district || '');
			setValue('state', state || '');
			setType(type || 'HOME');
		}
	}, [data?.data?.user, district, line1, line2, pincode, setValue, state, type]);

	useEffect(() => {
		if (watchPincode?.length === 6) {
			handlePincode(watchPincode);
		}
	}, [watchPincode]);

	const handlePincode = (pincode: string) => {
		getPincode(pincode, {
			onSuccess: (addressData) => {
				const { district, state } = addressData?.data?.address as IUserTypes.IAddress;
				setValue('district', district);
				setValue('state', state);
			},
			onError: (error) => {
				console.error('Error fetching pincode:', error);
			},
		});
	};

	const onSubmit = (values: any) => {
		const payload = {
			...values,
			type: addressType,
		} as IPayload;
		if (data?.data?.user?.addressId) {
			updateAddress(payload);
		} else {
			payload.isPrimary = true;
			createAddress(payload);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<section className="grid grid-cols-2 gap-24 mb-24">
				<TextInput
					label="Line1"
					placeholder=""
					error={errors?.line1}
					{...register('line1')}
				/>
				<TextInput
					label="Line2"
					placeholder=""
					error={errors?.line2}
					{...register('line2')}
				/>
			</section>
			<section className="grid grid-cols-2 gap-24 mb-24">
				<TextInput
					label="Pincode"
					placeholder=""
					error={errors?.pincode}
					type="numeric"
					maxLength={6}
					minLength={6}
					{...register('pincode')}
				/>
				<TextInput
					label="District"
					placeholder=""
					error={errors?.district}
					readonly={true}
					disabled={true}
					{...register('district')}
				/>
			</section>
			<section className="grid grid-cols-2 gap-24 mb-24">
				<TextInput
					label="State"
					placeholder=""
					error={errors?.state}
					readonly={true}
					disabled={true}
					{...register('state')}
				/>
				<section>
					<label className="text-14 leading-14 block mb-10">Choose Gender</label>
					<section className="flex gap-24 items-center px-12 rounded-8 border border-grey-divider h-[52px] bg-white">
						<Radio
							label="Home"
							value="HOME"
							checked={addressType === 'HOME'}
							name="home"
							onChange={() => setType('HOME')}
						/>
						<Radio
							label="Work"
							value="WORK"
							checked={addressType === 'WORK'}
							name="work"
							onChange={() => setType('WORK')}
						/>
						<Radio
							label="Other"
							value="OTHER"
							checked={addressType === 'OTHER'}
							name="other"
							onChange={() => setType('OTHER')}
						/>
					</section>
				</section>
			</section>
			<section className="!mt-[42px]">
				<Button
					className="min-w-[250px]"
					isLoading={isPending || isLoading}
					disabled={isPending || isLoading}
				>
					<span className="font-bold">Save Address</span>
				</Button>
			</section>
		</form>
	);
};

export default AddressForm;
