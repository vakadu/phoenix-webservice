'use client';

import React from 'react';

import styles from './input.module.css';

/* eslint-disable-next-line */
export interface InputViewProps {
	containerClasses?: string;
	inputClasses?: string;
	type: string;
	inputMode?: 'numeric' | 'email' | 'text' | 'password';
	label: string;
	labelClasses?: string;
	errorMessage: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputViewProps>(
	(
		{
			containerClasses, inputClasses, type, inputMode, label, labelClasses, errorMessage,
			...rest
		},
		ref,
	) => {		
		const parentClass = `${errorMessage ? 'border-red-dark' : 'border-grey-lighter'} text-16 text-darkBlack dark:text-white bg-transparent border-[1.5px]`;
		const labelClass = `${errorMessage ? 'text-red-dark' : 'text-grey-textInput dark:text-white'} bg-white dark:bg-transparent !text-14`;

		if (inputMode === 'numeric' && type !== 'number') {
			type = 'number';
		} else if (inputMode === 'email' && type !== 'email') {
			type = 'email';
		}
		
		return(
			<div className={containerClasses}>
				<label className={styles['input']}>
					<input 
						{ ...rest }
						ref={ref}
						type={type}
						className={`${styles['field']} ${inputClasses} ${parentClass} peer`}
						placeholder=" "
					/>
					<span className={`${styles['label']} ${labelClasses} ${labelClass}`}>{label}</span>
				</label>
				{
					errorMessage && errorMessage !== '' &&
						<p className='text-12 text-red-dark mt-4'>
							{ errorMessage }
						</p>
				}
			</div>
		)
	}
);

export default Input;
