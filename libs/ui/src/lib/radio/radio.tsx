import React from 'react';

/* eslint-disable-next-line */
export interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string;
	checked: boolean;
	container?: string;
	labelClasses?: string;
	radioClasses?: string;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>((
	{
		label, checked, container, radioClasses, labelClasses, ...rest
	},
	ref,
) => {
	return (
		<section className={`cursor-pointer ${container}`}>
			<section className="w-full">
				<label className='relative cursor-pointer w-full flex items-center'>
					<input
						{ ...rest }
						ref={ref}
						type='radio'
						className='absolute top-0 left-0 invisible peer'
						checked={checked}
					/>
					<span className={`relative w-18 h-18 inline-block border-2 
						border-grey-text rounded-full peer-checked:border-brand 
						dark:peer-checked:border-white before:content-[""] 
						before:absolute before:left-1/2 before:top-1/2 
						before:-translate-x-1/2 before:-translate-y-1/2 before:w-8 before:h-8
						 before:bg-brand before:dark:bg-white before:rounded-full 
						 before:hidden before:peer-checked:block ${radioClasses}`}
					/>
					<p className={`text-14 pl-12 ${labelClasses}`}>
						{ label }
					</p>
				</label>
			</section>
		</section>
	);
})

export default Radio;
