import cn from 'classnames';

import Button from '../button/button';

/* eslint-disable-next-line */
export interface StatusProps {
	containerClasses?: string;
	status: string;
	statusClasses?: string;
	buttonText?: string;
	buttonClasses?: string;
	onClick?: () => void;
}

export function Status(props: StatusProps) {
	const { containerClasses, status, statusClasses, buttonText, buttonClasses, onClick } = props;

	return (
		<div className={cn(containerClasses, 'flex flex-col justify-center items-center')}>
			<h1 className={cn(statusClasses, 'text-14 font-semibold')}>{status}</h1>
			{
				buttonText !== '' && 
					<Button
						onClick={onClick}
						className={cn(buttonClasses, 'shadow-2 mt-16 rounded-4 px-16 py-12 text-20 tracking-1 uppercase font-medium')}
					>
						{ buttonText }
					</Button>
			}
		</div>
	);
}

export default Status;
