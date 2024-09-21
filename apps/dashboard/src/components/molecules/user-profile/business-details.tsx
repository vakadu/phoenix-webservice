'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useSelector } from 'react-redux';

import { Button, TextInput } from '@webservices/ui';
import { useGetUser, useUpdateBusiness } from '@webservices/api';
import { PemilyRootState } from '@webservices/slices';
import { gstValidator, panValidator, phoneValidator } from '@webservices/helpers';

const validationSchema = yup.object().shape({
	ownerName: yup.string().required('Owner Name is required'),
	pan: yup.string().matches(panValidator, 'Pan is not valid').notRequired(),
	gstNo: yup.string().matches(gstValidator, 'Gst is not valid').notRequired(),
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
	const { ownerName, pan, gstNo, businessContact } = data?.data?.user || {};

	useEffect(() => {
		if (data?.data?.user) {
			setValue('ownerName', ownerName || '');
			setValue('pan', pan || '');
			setValue('gstNo', gstNo || '');
			setValue('businessContact', businessContact || '');
		}
	}, [businessContact, data?.data?.user, gstNo, ownerName, pan, setValue]);

	const onSubmit = (values: any) => {
		const { businessContact, ...restValues } = values;
		const payload = { ...restValues };
		if (businessContact !== '') {
			payload.businessContact = Number(businessContact);
		}
		updateBusiness(payload);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<section className="grid grid-cols-2 gap-24 mb-24">
				<TextInput
					label="Business Contact Number"
					type="numeric"
					placeholder=""
					error={errors?.businessContact}
					maxLength={10}
					{...register('businessContact')}
				/>
				<TextInput
					label="Owner Name"
					placeholder=""
					error={errors?.ownerName}
					{...register('ownerName')}
				/>
			</section>
			<section className="grid grid-cols-2 gap-24 mb-24">
				<TextInput
					label="PAN"
					placeholder="FLKPXXXXXX"
					error={errors?.pan}
					{...register('pan')}
				/>
				<TextInput
					label="GST No"
					placeholder="29AAXXXXXXXXXXX"
					error={errors?.gstNo}
					{...register('gstNo')}
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
