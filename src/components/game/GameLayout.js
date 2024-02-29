import styles from './Game.module.css';
import PropTypes from 'prop-types';
import { store } from '../../store';

export const GameLayout = ({ children, handleReset }) => {
	const { isDraw, isGameEnded } = store.getState();
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
	children: PropTypes.array,
	handleReset: PropTypes.func,
};
