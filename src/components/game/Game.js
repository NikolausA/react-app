import { useSelector, useDispatch } from 'react-redux';
import { GameLayout } from './GameLayout';
import { Information } from '../information/Information';
import { Field } from '../field/Field';
// import { Field, Information, GameLayout } from '../../components';
import { setFieldValue, checkIsDraw, checkIsThereWinner } from '../../utils';
import { winPaterns } from '../../constants';
import { store } from '../../store';
import { updateField, setDraw, setGameOver, changeCurrentPlayer } from '../../actions';
import {
	selectCurrentPlayer,
	selectField,
	selectIsDraw,
	selectIsGameEnded,
} from '../../selectors';

export const Game = () => {
	const field = useSelector(selectField);
	const currentPlayer = useSelector(selectCurrentPlayer);
	const isDraw = useSelector(selectIsDraw);
	const isGameEnded = useSelector(selectIsGameEnded);
	const dispatch = useDispatch();

	const fieldValue = currentPlayer ? 'X' : 'O';

	const handleClick = (index) => {
		if (isDraw || isGameEnded) return;

		const changedField = setFieldValue(field, fieldValue, index);

		dispatch(updateField(changedField));
		if (checkIsThereWinner(fieldValue, changedField, winPaterns)) {
			dispatch(setGameOver());
			return;
		}

		if (checkIsDraw(changedField)) {
			dispatch(setDraw());
			return;
		}

		dispatch(changeCurrentPlayer());
	};

	const handleReset = () => {
		dispatch({ type: 'RESET' });
	};

	return (
		<GameLayout handleReset={handleReset}>
			Игра крестики - нолики
			<Information />
			<Field handleClick={handleClick} />
		</GameLayout>
	);
};
