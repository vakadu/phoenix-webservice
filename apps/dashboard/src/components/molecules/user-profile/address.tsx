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
	} = useForm({
		resolver: yupResolver(validationSchema),
	});
	const authState = useSelector((state: PemilyRootState) => state.auth);
	const { data } = useGetUser(authState.userId as string);
	const [type, setType] = useState('HOME');
	const { mutate: getPincode } = usePincode();
	const { mutate: updateAddress, isPending } = useUpdateAddress(
		data?.data?.user?.addressId as string
	);
	const { mutate: createAddress, isPending: isLoading } = useCreateAddress();

	useEffect(() => {
		if (data?.data?.user) {
			setValue('line1', data?.data?.user?.address?.line1 || '');
			setValue('line2', data?.data?.user?.address?.line2 || '');
			setValue('pincode', data?.data?.user?.address?.pincode || '');
			setValue('district', data?.data?.user?.address?.district || '');
			setValue('state', data?.data?.user?.address?.state || '');
			setType(data?.data?.user?.address?.type || 'HOME');
		}
	}, [data?.data?.user, setValue]);

	const handlePincode = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value.length >= 6) {
			getPincode(e.target.value, {
				onSuccess: (addressData) => {
					const { district, state } = addressData?.data?.address as IUserTypes.IAddress;
					setValue('district', district);
					setValue('state', state);
				},
				onError: (error) => {
					console.error('Error fetching pincode:', error);
				},
			});
		}
	};

	const onSubmit = (values: any) => {
		const payload = {
			...values,
			type,
		} as IPayload;
		if (data?.data?.user?.addressId) {
			updateAddress(payload);
		} else {
			payload.isPrimary = true;
			createAddress(payload);
		}
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="max-w-screen-lg pb-[42px] space-y-24 mt-[54px]"
		>
			<section className="grid grid-cols-2 gap-[42px]">
				<TextInput
					label="Line1"
					name="line1"
					placeholder=""
					error={errors?.line1}
					register={register}
				/>
				<TextInput
					label="Line2"
					name="line2"
					placeholder=""
					error={errors?.line2}
					register={register}
				/>
			</section>
			<section className="grid grid-cols-2 gap-[42px]">
				<TextInput
					label="Pincode"
					name="pincode"
					placeholder=""
					error={errors?.pincode}
					register={register}
					type="numeric"
					maxLength={6}
					minLength={6}
					onChange={handlePincode}
				/>
				<TextInput
					label="District"
					name="district"
					placeholder=""
					error={errors?.district}
					register={register}
					readonly={true}
					disabled={true}
				/>
			</section>
			<section className="grid grid-cols-2 gap-[42px]">
				<TextInput
					label="State"
					name="state"
					placeholder=""
					error={errors?.state}
					register={register}
					readonly={true}
					disabled={true}
				/>
				<section>
					<label className="text-14 leading-14 block mb-10">Choose Gender</label>
					<section className="flex gap-24 items-center px-12 rounded-8 border border-grey-divider h-[52px]">
						<Radio
							label="Home"
							value="HOME"
							checked={type === 'HOME'}
							name="home"
							onChange={() => setType('HOME')}
						/>
						<Radio
							label="Work"
							value="WORK"
							checked={type === 'WORK'}
							name="work"
							onChange={() => setType('WORK')}
						/>
						<Radio
							label="Other"
							value="OTHER"
							checked={type === 'OTHER'}
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
