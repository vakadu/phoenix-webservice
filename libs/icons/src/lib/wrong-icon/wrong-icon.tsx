import styles from './wrong-icon.module.css';

/* eslint-disable-next-line */
export interface WrongIconProps {}

export function WrongIcon(props: WrongIconProps) {
	return (
		<div className={styles['container']}>
			<h1>Welcome to WrongIcon!</h1>
		</div>
	);
}

export default WrongIcon;
