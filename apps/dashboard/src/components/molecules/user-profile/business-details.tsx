'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useSelector } from 'react-redux';

import { Button, TextInput } from '@webservices/ui';
import { useGetUser, useUpdateBusiness } from '@webservices/api';
import { PemilyRootState } from '@webservices/slices';
import { phoneValidator } from '@webservices/helpers';

const validationSchema = yup.object().shape({
	ownerName: yup.string().required('Owner Name is required'),
	pan: yup.string(),
	gstNo: yup.string(),
	businessContact: yup
		.string()
		.matches(phoneValidator, 'Phone number is not valid')
		.notRequired(),
});

const BusinessForm = () => {
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
	const { mutate: updateBusiness, isPending } = useUpdateBusiness();

	useEffect(() => {
		if (data?.data?.user) {
			setValue('ownerName', data?.data?.user?.ownerName || '');
			setValue('pan', data?.data?.user?.pan || '');
			setValue('gstNo', data?.data?.user?.gstNo || '');
			setValue('businessContact', data?.data?.user?.businessContact || '');
		}
	}, [data?.data?.user, setValue]);

	const onSubmit = (values: any) => {
		const { businessContact, ...restValues } = values;
		const payload = { ...restValues };
		if (businessContact !== '') {
			payload.businessContact = Number(businessContact);
		}
		updateBusiness(payload);
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="max-w-screen-lg pb-[42px] space-y-24 mt-[54px]"
		>
			<section className="grid grid-cols-2 gap-[42px]">
				<TextInput
					label="Business Contact Number"
					name="businessContact"
					type="numeric"
					placeholder=""
					error={errors?.businessContact}
					register={register}
					maxLength={10}
				/>
				<TextInput
					label="Owner Name"
					name="ownerName"
					placeholder=""
					error={errors?.ownerName}
					register={register}
				/>
			</section>
			<section className="grid grid-cols-2 gap-[42px]">
				<TextInput
					label="PAN"
					name="pan"
					placeholder="FLKPXXXXXX"
					error={errors?.pan}
					register={register}
				/>
				<TextInput
					label="GST No"
					name="gstNo"
					placeholder="29AAXXXXXXXXXXX"
					error={errors?.gstNo}
					register={register}
				/>
			</section>
			<section className="!mt-[42px]">
				<Button className="min-w-[250px]" isLoading={isPending} disabled={isPending}>
					<span className="font-bold">Save</span>
				</Button>
			</section>
		</form>
	);
};

export default BusinessForm;
