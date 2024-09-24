'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';

import { useCreateParent, useGetParentById, useUpdateParent } from '@webservices/api';
import { phoneValidator } from '@webservices/helpers';
import TextInput from '../text-input/text-input';
import Button from '../button/button';
import Switch from '../switch/switch';
import { PemilyRootState } from '@webservices/slices';

const getValidationSchema = (type: 'add' | 'edit') =>
	yup.object().shape({
		mobileNumber:
			type === 'add'
				? yup
						.string()
						.required('Phone number is required')
						.matches(phoneValidator, 'Phone number is not valid')
				: yup.string().notRequired(),
		name:
			type === 'edit'
				? yup.string().required('Name is required')
				: yup.string().notRequired(),
		comment: yup.string(),
	});

const AddEditParent = () => {
	const dispatch = useDispatch();
	const modalState = useSelector((state: PemilyRootState) => state.modal);
	const { parentId, memberId } = modalState.data;
	const validationSchema = getValidationSchema(modalState.type as 'add' | 'edit');
	const {
		handleSubmit,
		formState: { errors },
		setValue,
		register,
		reset,
	} = useForm({
		resolver: yupResolver(validationSchema),
	});
	const [checked, setChecked] = useState(false);
	const { data } = useGetParentById(parentId as string);
	const parentData = data?.data?.parents?.[0] || (null as IClinicTypes.IPetParent | null);
	const { mutate: updateParent, isPending } = useUpdateParent({
		memberId,
		parentId,
		refetchParents: modalState.refetch as () => void,
	});
	const { mutate: createParent, isPending: isLoading } = useCreateParent({
		refetch: modalState.refetch as () => void,
	});

	useEffect(() => {
		if (modalState.type === 'edit' && parentData && parentId) {
			setValue('name', parentData?.parent?.name);
			setValue('comment', parentData?.comment);
			setChecked(parentData?.active);
		} else {
			reset({
				mobileNumber: '',
			});
			setChecked(false);
		}
	}, [modalState.type, parentData, parentId, reset, setValue]);

	const onSubmit = (values: any) => {
		if (modalState.type === 'edit') {
			const updateData = {
				name: values.name,
				active: checked,
				...(values.comment.length > 0 && { comment: values.comment }),
			};
			updateParent(updateData);
		} else {
			createParent(values);
		}
	};

	return (
		<section className="bg-white rounded-8">
			<section className="flex justify-between items-center px-16 py-16 border-b border-grey-divider">
				<label className="font-medium text-18">
					{modalState.type === 'add' ? 'Add Parent Details' : 'Edit Parent Details'}
				</label>
			</section>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="pb-[42px] space-y-24 mt-[24px] px-24"
			>
				{modalState.type === 'add' && (
					<section className="grid grid-cols-2 gap-[42px]">
						<TextInput
							label="Mobile Number"
							placeholder=""
							error={errors?.mobileNumber}
							{...register('mobileNumber')}
						/>
					</section>
				)}
				{modalState.type === 'edit' && (
					<>
						<section className="grid grid-cols-2 gap-[42px]">
							<TextInput
								label="Name"
								placeholder=""
								error={errors?.name}
								{...register('name')}
							/>
							<TextInput
								label="Comment"
								placeholder=""
								error={errors?.name}
								{...register('comment')}
							/>
						</section>
						<section>
							<Switch
								label="Is parent active?"
								value={checked}
								onChange={() => setChecked(!checked)}
							/>
						</section>
					</>
				)}
				<section className="flex justify-end items-center !mt-32">
					<Button
						className="min-w-[220px]"
						isLoading={isPending || isLoading}
						disabled={isPending || isLoading}
					>
						<span className="font-black tracking-[-0.41px]">
							{modalState.type === 'add' ? 'Add Parent' : 'Edit Parent'}
						</span>
					</Button>
				</section>
			</form>
		</section>
	);
};

export default AddEditParent;
