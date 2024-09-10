'use client';

import { FieldError, UseFormRegister } from 'react-hook-form';

interface TextInputProps {
	label: string;
	name: string;
	inputClasses?: string;
	placeholder?: string;
	register?: UseFormRegister<any>;
	error?: FieldError;
	onChange?: any;
	rest?: React.InputHTMLAttributes<HTMLInputElement>;
}

export function Textarea({
	label,
	name,
	inputClasses,
	placeholder = '',
	error,
	register,
	onChange,
	...rest
}: TextInputProps) {
	const hasErrorInput = error
		? 'border-red-1 focus:ring-red-1'
		: 'focus:ring-brand border-grey-divider';
	const hasErrorLabel = error ? 'text-red-1' : 'text-grey-text2';

	return (
		<section className="relative">
			<label className={`text-14 leading-14 mb-[10px] block cursor-pointer ${hasErrorLabel}`}>
				{label}
			</label>
			<section className="relative">
				<textarea
					{...rest}
					{...(register ? register(name) : {})}
					name={name}
					className={`bg-white text-16 leading-16 px-12 transition duration-300 ease-in-out border focus:ring-1  focus:shadow-sm outline-none focus:border-none py-12 resize-none
   focus:outline-none focus:ring-opacity-90 rounded-8 w-full ${hasErrorInput} ${inputClasses}`}
					placeholder={placeholder}
					onChange={onChange}
					rows={10}
				/>
			</section>
			{error && <p className={`text-12 ${hasErrorLabel}`}>{error.message}</p>}
		</section>
	);
}

export default Textarea;
