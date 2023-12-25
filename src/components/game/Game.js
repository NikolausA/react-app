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

		const changedField = field.map((f, i) => (i === index ? fieldValue : f));
		setField(changedField);
		if (checkIsThereWinner(fieldValue, changedField)) {
			setIsGameEnded(true);
			return;
		}

		if (checkIsDraw(changedField)) {
			setIsDraw(true);
			return;
		}

		setCurrentPlayer(!currentPlayer);
	};

	const handleReset = () => {
		setCurrentPlayer(true);
		setField(initialFields);
		setIsDraw(false);
		setIsGameEnded(false);
	};

	const status = isGameEnded
		? `Победил ${fieldValue}`
		: isDraw
			? `Ничья`
			: `Ходит: ${fieldValue}`;

	return (
		<GameLayout isDraw={isDraw} isGameEnded={isGameEnded} handleReset={handleReset}>
			Игра крестики - нолики
			<Information status={status} />
			<Field field={field} handleClick={handleClick} />
		</GameLayout>
	);
};
