import React from 'react';

/* eslint-disable-next-line */
export interface InputNormalProps {
	containerClasses?: string;
	inputClasses?: string;
	type: string;
	inputMode: "numeric" | "email" | "search" | "text" | "tel" | "url" | "none" | "decimal";
	label: string;
	labelClasses?: string;
	errorMessage: string;
	placeholder: string;
	disabled?: boolean;
}

export const InputNormal = React.forwardRef<HTMLInputElement, InputNormalProps>(
	(
		{
			containerClasses, inputClasses, type, inputMode, label, labelClasses, errorMessage, placeholder, disabled = false,
			...rest
		},
		ref,
	) => {		
		const parentClass = `${errorMessage ? 'border-red-dark focus:ring-red-dark text-red-dark placeholder-red-dark' : 'focus:ring-brand'} ${inputClasses}`;
		const labelClass = `${errorMessage ? 'text-red-dark' : 'text-grey-textDark dark:text-white'} ${labelClasses}`;

		if (inputMode === 'numeric' && type !== 'number') {
			type = 'number';
		} else if (inputMode === 'email' && type !== 'email') {
			type = 'email';
		}

		return(
			<section className={`relative ${containerClasses}`}>
				<label className={`text-14 leading-[32px] font-semibold ${labelClass}`}>
					{ label }
				</label>
				<section className='relative'>
					<input 
						{ ...rest }
						ref={ref}
						type={type}
						inputMode={inputMode}
						placeholder={placeholder}
						disabled={disabled}
						className={`h-[52px] border-2 focus:border-none border-grey-border focus:ring-2 focus:shadow-sm outline-none w-full block transition-all duration-0.6 ease-smooth rounded-4 px-12 text-14 ${parentClass}`} 
					/>	
				</section>
				{
					errorMessage && errorMessage !== '' &&
						<p className='text-12 text-red-dark mt-4'>
							{ errorMessage }
						</p>
				}
			</section>
		)
	}
);

export default InputNormal;
