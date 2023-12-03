'use client';

import cn from 'classnames';
export type LoaderSizeTypes = 'large' | 'medium' | 'small';
export type LoaderVariantTypes = 'blink' | 'scaleUp' | 'moveUp';

/* eslint-disable-next-line */
export interface LoaderViewProps extends React.HTMLAttributes<HTMLDivElement | HTMLSpanElement> {
	tag?: 'div' | 'span';
	size?: LoaderSizeTypes;
	variant?: LoaderVariantTypes;
	showOnlyThreeDots?: boolean;
	className?: string;
};

const variants = {
	blink: 'animate-blink',
	scaleUp: 'animate-scale-up',
	moveUp: 'animate-move-up',
};

const sizes = {
	small: 'w-1.5 h-1.5',
	medium: 'w-3 h-3',
	large: 'w-6 h-6',
};

function handleLoaderPosition(size: LoaderSizeTypes) {
	return size === 'small' ? 'relative top-1.5' : 'relative top-3';
}
  
function handleVariantClasses(
	variant: LoaderVariantTypes,
	size: LoaderSizeTypes
  ) {
	return variant === 'moveUp' && size === 'small'
	  ? 'animate-move-up-small'
	  : variants[variant];
}

export function LoaderView({ tag = 'div', size = 'medium', variant = 'moveUp', 
	showOnlyThreeDots, className, 
}: LoaderViewProps) {
	const Component = tag;
	console.log(variant);
	

	return (
		<Component
			className={cn(
				'flex items-center gap-2',
				variant === 'moveUp' && handleLoaderPosition(size),
				className
		  	)}
		>
			<span
				className={cn(
					'bg-current rounded-full',
					handleVariantClasses(variant, size),
					sizes[size]
				)}
			/>
			<span
				className={cn(
					'animation-delay-200 bg-current rounded-full',
					handleVariantClasses(variant, size),
					sizes[size]
				)}
			/>
			<span
				className={cn(
					'animation-delay-500 bg-current rounded-full',
					handleVariantClasses(variant, size),
					sizes[size]
				)}
			/>
			{variant === 'moveUp' && !showOnlyThreeDots ? (
				<span
					className={cn(
						'animation-delay-700 bg-current rounded-full',
						handleVariantClasses(variant, size),
						sizes[size]
					)}
				/>
			) : null}
		</Component>
	);
}

export default LoaderView;
