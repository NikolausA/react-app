import { useState } from 'react';
import { GameLayout } from './GameLayout';
import { Information } from '../information/Information';
import { Field } from '../field/Field';

export const Game = () => {
	const initialFields = ['', '', '', '', '', '', '', '', ''];
	const winPaterns = ['012', '345', '678', '036', '147', '258', '246', '048'];

	const [currentPlayer, setCurrentPlayer] = useState(true);
	const [isDraw, setIsDraw] = useState(false);
	const [isGameEnded, setIsGameEnded] = useState(false);
	const [field, setField] = useState(initialFields);

	const fieldValue = currentPlayer ? 'X' : 'O';

	const checkIsGameEnded = (letter) => {
		console.log(field);
		const matchedField = field.map((item, i) => {
			if (item === letter) {
				return i;
			}
		});

		const matchedFieldToString = matchedField.join('').replaceAll(' ', '');
		// console.log(matchedFieldToString);

		winPaterns.forEach((item) => {
			if (matchedFieldToString.includes(item)) {
				setIsGameEnded(true);
				console.log(true);
			}
		});
	};

	const handleClick = (index) => {
		const changedField = field.map((f, i) => {
			if (i === index) {
				return (f = fieldValue);
			} else {
				return f;
			}
		});
		setField(changedField);
		setCurrentPlayer(!currentPlayer);
		// console.log(field);
		// console.log(matchedField);
		checkIsGameEnded(fieldValue);
	};

	return (
		<GameLayout>
			Игра крестики - нолики
			<Information
				currentPlayer={currentPlayer}
				isDraw={isDraw}
				isGameEnded={isGameEnded}
			/>
			<Field
				field={field}
				setField={setField}
				currentPlayer={currentPlayer}
				setCurrentPlayer={setCurrentPlayer}
				checkIsGameEnded={checkIsGameEnded}
				handleClick={handleClick}
			/>
		</GameLayout>
	);
};
