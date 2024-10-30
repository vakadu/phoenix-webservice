'use client';

import { memo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useUpdateMedicalRecord } from '@webservices/api';
import Modal from '../../modal/modal';
import Textarea from '../../textarea/textarea';
import Button from '../../button/button';
import { logEvent } from '@webservices/services';
import { USER_EVENTS } from '@webservices/primitives';

const validationSchema = yup.object().shape({
	comment: yup.string().required('Comment is required'),
});

const CommentModal = ({
	isOpen,
	handleClose,
	id,
	comment,
	refetch,
	activeFilter,
}: {
	isOpen: boolean;
	handleClose: () => void;
	id: string;
	comment: string;
	refetch: () => void;
	activeFilter: string;
}) => {
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(validationSchema),
	});
	const { mutate: updateMedicalRecord, isPending } = useUpdateMedicalRecord({
		id,
		refetch,
		handleClose,
	});

	useEffect(() => {
		if (comment && comment !== '') {
			setValue('comment', comment);
		}
	}, [comment]);

	const onSubmit = (values: { comment: string }) => {
		const commentData = {
			type: activeFilter,
			comment: values.comment,
		};
		logEvent({
			name: USER_EVENTS.COMMENT_SUBMIT,
			events: { id, ...commentData },
		});
		updateMedicalRecord(commentData);
	};

	return (
		<Modal isOpen={isOpen} handleClose={handleClose}>
			<section className="bg-white max-w-xl mx-auto rounded-8">
				<p className="py-12 px-16 text-18 font-semibold border-b border-grey-border1">
					Edit Comment
				</p>
				<form className="p-16" onSubmit={handleSubmit(onSubmit)}>
					<Textarea
						label="Comment"
						name="comment"
						placeholder=""
						error={errors?.comment}
						register={register}
					/>
					<Button disabled={isPending} isLoading={isPending} className="w-full mt-32">
						<span className="font-black tracking-[-0.41px]">Save Notes</span>
					</Button>
				</form>
			</section>
		</Modal>
	);
};

export default memo(CommentModal);
