import { InformationLayout } from './InformationLayout';
import { useSelector } from 'react-redux';
import { selectCurrentPlayer, selectIsDraw, selectIsGameEnded } from '../../selectors';

export const Information = () => {
	const currentPlayer = useSelector(selectCurrentPlayer);
	const isDraw = useSelector(selectIsDraw);
	const isGameEnded = useSelector(selectIsGameEnded);

	const fieldValue = currentPlayer ? 'X' : 'O';

	const status = isGameEnded
		? `Победил ${fieldValue}`
		: isDraw
			? `Ничья`
			: `Ходит: ${fieldValue}`;

	return <InformationLayout status={status} />;
};
