'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useSelector } from 'react-redux';

import { Button, ImagePlaceholder, TextInput } from '@webservices/ui';
import { useGetUser, useUpdateBusiness } from '@webservices/api';
import { PemilyRootState } from '@webservices/slices';
import {
	createFormDataForImage,
	gstValidator,
	panValidator,
	phoneValidator,
} from '@webservices/helpers';
import { CameraIcon, UserIcon } from '@webservices/icons';
import { useGetClinicLogo, useUploadClinicLogo } from '@dashboard/core/api';
import Link from 'next/link';

// const validationSchema = yup.object().shape({
// 	ownerName: yup.string(),
// 	pan: yup.string().matches(panValidator, 'Pan is not valid'),
// 	gstNo: yup.string().matches(gstValidator, 'Gst is not valid'),
// 	businessContact: yup.string().matches(phoneValidator, 'Phone number is not valid'),
// });

const BusinessForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm();
	const authState = useSelector((state: PemilyRootState) => state.auth);
	const { data } = useGetUser(authState.userId as string);
	const { mutate: updateBusiness, isPending } = useUpdateBusiness();
	const { ownerName, pan, gstNo, businessContact } = data?.data?.user || {};
	const { data: getLogo } = useGetClinicLogo();
	const { mutate: uploadLogo } = useUploadClinicLogo();

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

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		console.log(file);

		if (file) {
			const formData = createFormDataForImage(file, 'file');
			console.log(formData);

			uploadLogo(formData);
		}
	};

	return (
		<div className="flex gap-32">
			<div>
				<div className=" rounded-full w-[168px] h-[168px] bg-white relative border border-primary-1">
					{getLogo?.data?.logoUrl && getLogo?.data?.logoUrl !== '' ? (
						<ImagePlaceholder
							src={getLogo?.data?.logoUrl as string}
							containerClasses="w-[160px] h-[160px] "
							imageClasses="rounded-full object-cover"
						/>
					) : (
						<UserIcon width={160} height={160} />
					)}
					<label className="cursor-pointer w-[32px] h-[32px] z-3 rounded-full absolute bg-primary-1 flex items-center justify-center right-0 top-[26px] shadow-base3">
						<input type="file" onChange={onChange} className="w-full hidden" />
						<CameraIcon className="text-white" width={18} height={18} />
					</label>
				</div>
				<Link
					href="/preview"
					className="mt-16 max-w-[120px] border border-purple text-center py-6 rounded-full mx-auto bg-purple cursor-pointer block"
				>
					<span className="text-14 font-semibold text-white">See Preview</span>
				</Link>
			</div>
			<form className="flex-1" onSubmit={handleSubmit(onSubmit)}>
				<section className="grid grid-cols-2 gap-24 mb-24">
					<TextInput
						label="Business Contact Number"
						type="numeric"
						placeholder=""
						maxLength={10}
						{...register('businessContact')}
					/>
					<TextInput label="Owner Name" placeholder="" {...register('ownerName')} />
				</section>
				<section className="grid grid-cols-2 gap-24 mb-24">
					<TextInput label="PAN" placeholder="FLKPXXXXXX" {...register('pan')} />
					<TextInput
						label="GST No"
						placeholder="29AAXXXXXXXXXXX"
						{...register('gstNo')}
					/>
				</section>
				<section className="!mt-[42px]">
					<Button className="min-w-[250px]" isLoading={isPending} disabled={isPending}>
						<span className="font-bold">Save</span>
					</Button>
				</section>
			</form>
		</div>
	);
};

export default BusinessForm;
