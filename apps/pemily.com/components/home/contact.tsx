'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

import { Button, ImagePlaceholder, InputNormal } from '@webservices/ui';
import { setOpen } from '@webservices/slices';
import { useDispatch } from 'react-redux';

const schema = yup.object().shape({
	name: yup.string().required('Name is required'),
	mobileNumber: yup
		.string()
		.required('Mobile number is required')
		.matches(/^[6-9]\d{9}$/, 'please enter a valid mobile number')
		.max(10),
	message: yup.string(),
});

const Contact = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		resolver: yupResolver(schema),
	});
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();

	const submit = async (values: { name: string; mobileNumber: string; message?: string }) => {
		setLoading(true);
		const url = `${process.env.NEXT_PUBLIC_BASE_PATH}/lead/create`;
		// const url = 'https://api.pemilyy.com/lead/create';

		const data = {
			name: values.name,
			mobile: Number(values.mobileNumber),
			type: 'Vet Clinic Appointment',
		} as {
			name: string;
			mobile: number;
			type: 'Vet Clinic Appointment';
			query?: string;
		};
		if (values.message) {
			data.query = values.message;
		}
		const response = await axios.post(url, data);
		try {
			if (response?.data?.status === 'SUCCESS') {
				reset();
				setLoading(false);
				dispatch(
					setOpen({
						message: 'Data submitted successfully',
					})
				);
			} else {
				setLoading(false);
				dispatch(
					setOpen({
						message: 'Unable to submit data. Please try again',
					})
				);
			}
		} catch (err) {
			setLoading(false);
			setOpen({
				message: 'Unable to submit data. Please try again',
			});
		}
	};

	return (
		<section id="contact" className="px-16 lg:px-[94px] relative py-[64px]">
			<h2 className="text-[24px] leading-[34px] font-medium text-left my-24">
				What can we help with?
			</h2>
			<section className="lg:grid lg:grid-cols-3 lg:gap-42">
				<form className="col-span-2" onSubmit={handleSubmit(submit)}>
					<section className="grid md:grid-cols-2 lg:gap-42 mb-24">
						<InputNormal
							label="Name"
							placeholder=""
							type="text"
							inputMode="text"
							{...register('name')}
							errorMessage={errors?.name?.message as string}
							containerClasses="lg:mb-0 mb-24"
						/>
						<InputNormal
							label="Mobile Number"
							placeholder=""
							type="text"
							inputMode="numeric"
							{...register('mobileNumber')}
							errorMessage={errors?.mobileNumber?.message as string}
						/>
					</section>
					<InputNormal
						label="Tell us whats on your mind (Optional)"
						placeholder=""
						type="text"
						inputMode="text"
						{...register('message')}
						errorMessage={errors?.message?.message as string}
					/>
					<Button
						disabled={loading}
						isLoading={loading}
						loadingText="Submitting"
						className="mt-24 min-w-[220px] w-full lg:w-auto"
					>
						Submit
					</Button>
				</form>
				<section className="col-span-1 flex justify-center items-center mt-24 lg:mt-0">
					<ImagePlaceholder
						src="/images/dog.png"
						containerClasses="h-[256px] w-[253px]"
						imageClasses="object-cover"
					/>
				</section>
			</section>
		</section>
	);
};

export default Contact;
