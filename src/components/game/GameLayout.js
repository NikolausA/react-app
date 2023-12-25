import styles from './Game.module.css';
import PropTypes from 'prop-types';

export const GameLayout = ({ isDraw, isGameEnded, children, handleReset }) => {
	return (
		<div className={styles.main}>
			<h1 className={styles.title}>{children}</h1>
			<button
				className={
					isDraw || isGameEnded ? styles.buttonActive : styles.buttonInactive
				}
				onClick={handleReset}
			>
				New Game
			</button>
		</div>
	);
};

GameLayout.propTypes = {
	isDraw: PropTypes.bool,
	isGameEnded: PropTypes.bool,
	children: PropTypes.string,
	handleReset: PropTypes.func,
};
