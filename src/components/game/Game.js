import { useState, useEffect } from 'react';
import { GameLayout } from './GameLayout';
import { Information } from '../information/Information';
import { Field } from '../field/Field';
// import { Field, Information, GameLayout } from '../../components';
import { setFieldValue } from '../../utils';
import { winPaterns, initialFields } from '../../constants';
import { store } from '../../store';
import { updateField, setDraw, setGameOver, changeCurrentPlayer } from '../../actions';

export const Game = () => {
	const { field, currentPlayer, isDraw, isGameEnded } = store.getState();
	const [arrayFieldValues, setArrayFieldValues] = useState([]);

	useEffect(() => {
		setArrayFieldValues(store.getState().field.filter((item) => item != ''));

		const unsubscribe = store.subscribe(() => {
			setArrayFieldValues(store.getState().field.filter((item) => item != ''));
		});

		return unsubscribe;
	}, []);

	const fieldValue = currentPlayer ? 'X' : 'O';

	const checkIsDraw = (arr) => {
		return arr.every((cell) => cell);
	};

	const checkIsThereWinner = (letter, changedField) => {
		let matchedIndexesString = '';
		changedField.forEach((item, i) => {
			if (item === letter) {
				matchedIndexesString += String(i);
			}
		});

		return winPaterns.some((patern) => matchedIndexesString.includes(patern));
	};

	const handleClick = (index) => {
		if (isDraw || isGameEnded) return;

		const changedField = setFieldValue(field, fieldValue, index);

		store.dispatch(updateField(changedField));
		if (checkIsThereWinner(fieldValue, changedField)) {
			store.dispatch(setGameOver());
			return;
		}

		if (checkIsDraw(changedField)) {
			store.dispatch(setDraw());
			return;
		}

		store.dispatch(changeCurrentPlayer());
	};

	const handleReset = () => {
		store.dispatch({ type: 'RESET' });
	};

	const status = isGameEnded
		? `Победил ${fieldValue}`
		: isDraw
			? `Ничья`
			: `Ходит: ${fieldValue}`;

	return (
		<GameLayout handleReset={handleReset}>
			Игра крестики - нолики
			<Information status={status} />
			<Field handleClick={handleClick} />
		</GameLayout>
	);
};
