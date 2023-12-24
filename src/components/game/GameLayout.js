import styles from './Game.module.css';

export const GameLayout = ({ children }) => {
	return (
		<div className={styles.main}>
			<h1 className={styles.title}>{children}</h1>
		</div>
	);
};
