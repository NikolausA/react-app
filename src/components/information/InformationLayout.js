import React from 'react';
import styles from './Information.module.css';

export const InformationLayout = ({ currentPlayer }) => {
	return (
		<div className={styles.information}>
			Ходит: {currentPlayer ? 'крестик' : 'нолик'}
		</div>
	);
};
