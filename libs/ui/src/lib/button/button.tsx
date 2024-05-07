'use client';

import { ButtonHTMLAttributes, useState, useRef, forwardRef, useImperativeHandle } from 'react';
import cn from 'classnames';

import ButtonDrip from './button-drip';

/* eslint-disable-next-line */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	color?: ColorNames;
	size?: SizeNames;
	variant?: VariantNames;
	shape?: ShapeNames;
	uppercase?: boolean;
	disabled?: boolean;
	isLoading?: boolean;
	loadingText?: string;
}

type ShapeNames = 'rounded' | 'circle' | 'sharp';
type VariantNames = 'ghost' | 'solid' | 'transparent';
type ColorNames =
	| 'primary'
	| 'white'
	| 'gray'
	| 'success'
	| 'info'
	| 'warning'
	| 'danger'
	| 'black'
	| 'blackWhite';
type SizeNames = 'large' | 'medium' | 'small';

const shapes: Record<ShapeNames, string[]> = {
	rounded: ['rounded-4'],
	circle: ['rounded-full'],
	sharp: ['rounded-0'],
};

const variants: Record<VariantNames, string[]> = {
	ghost: ['bg-transparent'],
	solid: ['text-white'],
	transparent: ['bg-transparent hover:transparent dark:hover:transparent'],
};

const colors: Record<ColorNames, string[]> = {
	primary: ['text-brand', 'bg-brand', 'border-brand'],
	white: ['text-black', 'bg-white', 'border-white'],
	gray: ['text-gray-900', 'bg-grey-bg', 'border-grey-border'],
	success: ['text-green-dark', 'bg-green-dark', 'border-green-dark'],
	info: ['text-blue-500', 'bg-blue-500', 'border-blue-500'],
	warning: ['text-yellow-500', 'bg-yellow-500', 'border-yellow-500'],
	danger: ['text-red-500', 'bg-red-500', 'border-red-500'],
	black: ['text-white', 'bg-black', 'border-black dark:border-grey-dark-shade'],
	blackWhite: ['text-black', 'bg-black', 'border-black'],
};

const sizes: Record<SizeNames, string[]> = {
	large: ['px-34 h-54 text-16 font-medium tracking-0.05'],
	medium: ['px-24 h-42 text-14'],
	small: ['px-16 h-32 text-12'],
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			children,
			className,
			disabled,
			shape = 'rounded',
			variant = 'solid',
			color = 'primary',
			size = 'large',
			uppercase,
			isLoading,
			onClick,
			loadingText = 'Processing...',
			...buttonProps
		},
		ref: React.Ref<HTMLButtonElement | null>
	) => {
		const [dripShow, setDripShow] = useState<boolean>(false);
		const [dripX, setDripX] = useState<number>(0);
		const [dripY, setDripY] = useState<number>(0);

		const colorClassNames = colors[color];
		const sizeClassNames = sizes[size];
		let buttonColorClassNames = '';
		let buttonDripColor = '';

		const buttonRef = useRef<HTMLButtonElement>(null);
		useImperativeHandle(ref, () => buttonRef.current);

		function dripCompletedHandle() {
			setDripShow(false);
			setDripX(0);
			setDripY(0);
		}

		const clickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
			if (buttonRef.current) {
				const rect = buttonRef.current.getBoundingClientRect();
				setDripShow(true);
				setDripX(event.clientX - rect.left);
				setDripY(event.clientY - rect.top);
			}
			onClick && onClick(event);
		};

		switch (variant) {
			case 'ghost':
				buttonColorClassNames = `border-2 border-solid ${colorClassNames[2]} ${colorClassNames[0]}`;
				buttonDripColor = 'rgba(0, 0, 0, 0.2)';
				break;
			case 'transparent':
				buttonColorClassNames = `bg-transparent`;
				buttonDripColor = 'rgba(0, 0, 0, 0.3)';
				break;
			case 'solid':
				buttonColorClassNames = `${colorClassNames[1]}`;
				buttonDripColor = 'rgba(255, 255, 255, 0.3)';
				break;
			default:
				break;
		}

		return (
			<button
				ref={buttonRef}
				onClick={clickHandler}
				disabled={disabled}
				className={cn(
					'relative inline-flex shadow-3 shrink-0 items-center justify-center overflow-hidden text-center outline-none transition-all',
					className,
					!disabled ? buttonColorClassNames : 'cursor-not-allowed bg-grey-light',
					sizeClassNames,
					shapes[shape],
					uppercase && 'uppercase',
					variants[variant],
					color === 'white' || color === 'gray' || color === 'black' ? '!text-black' : ''
				)}
				{...buttonProps}
			>
				{isLoading && (
					<>
						<svg
							role="status"
							className={`animate-spin w-18 h-18 text-transparent fill-white`}
							viewBox="0 0 100 101"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
								fill="currentColor"
							/>
							<path
								d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
								fill="currentFill"
							/>
						</svg>
						<span className="text-14 mx-6">{loadingText}</span>
					</>
				)}
				{dripShow && (
					<ButtonDrip
						x={dripX}
						y={dripY}
						color={
							['white', 'gray'].indexOf(color) !== -1
								? 'rgba(0, 0, 0, 0.1)'
								: buttonDripColor
						}
						onCompleted={dripCompletedHandle}
					/>
				)}
				{isLoading ? null : children}
			</button>
		);
	}
);

export default Button;
