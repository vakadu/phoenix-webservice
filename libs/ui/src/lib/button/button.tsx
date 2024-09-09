'use client';

import { ButtonHTMLAttributes, useState, useRef, forwardRef, useImperativeHandle } from 'react';
import cn from 'classnames';

import ButtonDrip from './button-drip';
import { LoadingIcon } from '@webservices/icons';

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
	large: ['px-34 h-56 text-16 font-medium tracking-0.05'],
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
					'relative inline-flex shadow-3 shrink-0 items-center justify-center overflow-hidden text-center outline-none transition-all hover:shadow-base2',
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
						<LoadingIcon />
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
