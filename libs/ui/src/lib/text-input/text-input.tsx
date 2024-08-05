'use client';

import { FieldError, UseFormRegister } from 'react-hook-form';

interface TextInputProps {
	label: string;
	name: string;
	type?: 'numeric' | 'email' | 'search' | 'text' | 'tel' | 'url' | 'none' | 'decimal';
	inputClasses?: string;
	placeholder?: string;
	disabled?: boolean;
	register?: UseFormRegister<any>;
	error?: FieldError;
	readonly?: boolean;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	rest?: React.InputHTMLAttributes<HTMLInputElement>;
}

export function TextInput({
	label,
	type = 'text',
	name,
	inputClasses,
	placeholder = '',
	disabled = false,
	error,
	register,
	readonly = false,
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
				<input
					{...rest}
					{...(register ? register(name) : {})}
					name={name}
					className={`bg-white text-16 leading-16 py-12 px-12 transition duration-300 ease-in-out border focus:ring-1  focus:shadow-sm outline-none focus:border-none
   focus:outline-none focus:ring-opacity-90 rounded-8 w-full ${hasErrorInput} ${inputClasses}`}
					type={type}
					placeholder={placeholder}
					disabled={disabled}
					readOnly={readonly}
					onChange={onChange}
				/>
			</section>
			{error && <p className={`text-12 ${hasErrorLabel}`}>{error.message}</p>}
		</section>
	);
}

export default TextInput;
