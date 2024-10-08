'use client';

import { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import cn from 'classnames';

import ButtonDrip from './button-drip';
import { LoadingIcon } from '@webservices/icons';

export interface ButtonViewProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	isLoading?: boolean;
	disabled?: boolean;
}

export const ButtonWrapper = forwardRef<HTMLButtonElement, ButtonViewProps>(
	(
		{ children, className, onClick, isLoading, disabled, ...buttonProps },
		ref: React.Ref<HTMLButtonElement | null>
	) => {
		const [dripShow, setDripShow] = useState<boolean>(false);
		const [dripX, setDripX] = useState<number>(0);
		const [dripY, setDripY] = useState<number>(0);
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

		return (
			<button
				ref={buttonRef}
				onClick={clickHandler}
				className={cn(
					'relative outline-none transition-all overflow-hidden',
					disabled ? '!bg-grey-light' : '',
					className
				)}
				disabled={disabled}
				{...buttonProps}
			>
				{isLoading && <LoadingIcon />}
				{dripShow && (
					<ButtonDrip
						x={dripX}
						y={dripY}
						color="rgba(0, 0, 0, 0.1)"
						onCompleted={dripCompletedHandle}
					/>
				)}
				{isLoading ? null : children}
			</button>
		);
	}
);

export default ButtonWrapper;
