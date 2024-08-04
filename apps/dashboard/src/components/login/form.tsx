'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { phoneValidator } from '@webservices/helpers';
import { TextInput } from '@webservices/ui';

const schema = yup.object().shape({
	mobileNumber: yup
		.string()
		.required('phone number is required')
		.matches(phoneValidator, 'Phone number is not valid'),
});

const LoginForm = () => {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm({
		resolver: yupResolver(schema),
		mode: 'all',
	});

	const onSubmit = (values) => {};

	return (
		<form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
			<TextInput label="Enter your Mobile Number" name="mobileNumber" type="numeric" />
		</form>
	);
};

export default LoginForm;
